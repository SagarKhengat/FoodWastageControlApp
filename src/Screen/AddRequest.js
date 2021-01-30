import React, { Component, PureComponent } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    StyleSheet,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    Modal
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Dropdown } from 'react-native-material-dropdown';
import { ModalBox } from '../components'
const RNFS = require('react-native-fs');
const moment = require('moment');

const window = Dimensions.get("screen");
const height = window.height;
//Provided options while capturing or selecting images

const dirHome = Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/FoodWastageControl`,
    android: `${RNFS.ExternalStorageDirectoryPath}/FoodWastageControl`
});

const dirPicutures = `${dirHome}/Pictures`;

//move the attachment to app folder
const moveAttachment = async (filePath, newFilepath) => {
    return new Promise((resolve, reject) => {
        RNFS.mkdir(dirPicutures)
            .then(() => {
                RNFS.moveFile(filePath, newFilepath)
                    .then(() => {
                        console.log('FILE MOVED', filePath, newFilepath);
                        resolve(newFilepath);
                    })
                    .catch(error => {
                        console.log('moveFile error', error);
                        reject(error);
                    });
            })
            .catch(err => {
                console.log('mkdir error', err);
                reject(err);
            });
    });
};
const imagePickerOptions = {
    width: window.width,
    height: 420,
    cropping: false,
    multiple: false,
    includeExif: false,
    avoidEmptySpaceAroundImage: true,
    mediaType: 'png',
    freeStyleCropEnabled: false,
    cropperCircleOverlay: false,
    hideBottomControls: true,
    enableRotationGesture: false,
    compressImageQuality: 0.8,
}
export default class AddRequest extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            selectedEventType: '',
            image: null,
            showChooseImageModal: false,
            userObject: null,
            ngoEmail: '',
            ngoContact: '',
            ngoAdd: '',
            selectedNgo: '',
            ngoArr: [],
            originalNgoArr: [],
            foodname: '',
            foodamount: '',
            success: false,
            selectedNgoObj: {}
        };
    }



    componentDidMount() {
        var arr = [];
        var arr1 = [];
        AsyncStorage.getItem('userObject')
            .then(userObject => {
                this.setState({
                    userObject: JSON.parse(userObject)
                })
                AsyncStorage.getItem('allUsers')
                    .then(userArr => {
                        if (userArr) {
                            var users = JSON.parse(userArr);
                            for (let index = 0; index < users.length; index++) {
                                const element = users[index];
                                if (element.user_type === 'NGO') {
                                    arr.push(element);
                                    arr1.push({ value: element.user_name })

                                }

                            }
                            this.setState({
                                originalNgoArr: arr,
                                ngoArr: arr1
                            })
                        }

                    });

            });

    }

    handleSubmitButton = () => {
        if (this.state.foodname === '') {
            alert('Please fill food name');
            return;
        }
        if (this.state.foodamount === '') {
            alert('Please fill amount of food to be donated');
            return;
        }
        if (this.state.selectedEventType === '') {
            alert('Please select event type');
            return;
        }
        if (this.state.image === '') {
            alert('Please add image');
            return;
        }
        if (this.state.selectedNgo === '') {
            alert('Please select NGO');
            return;
        }
        var dataToSend = {
            NGOEmail: this.state.selectedNgoObj.user_email,
            userEmail: this.state.userObject.user_email,
            userName: this.state.userObject.user_name,
            ngoName: this.state.selectedNgoObj.user_name,
            userImagePath: this.state.image,
            NGOImagePath: '',
            requestState: 'Pending',
            eventType: this.state.selectedEventType,
            foodName: this.state.foodname,
            foodAmount: this.state.foodamount,
            dateTime: new Date(),
        };
        var arr = [];

        AsyncStorage.getItem('allRequests')
            .then(allRequests => {
                if (allRequests) {
                    var requests = JSON.parse(allRequests);
                    arr = requests;
                    arr.push(dataToSend);
                    AsyncStorage.setItem('allRequests', JSON.stringify(arr)).then(() => {
                        this.setState({
                            success: true
                        })
                    });
                }
                else {
                    arr.push(dataToSend);
                    AsyncStorage.setItem('allRequests', JSON.stringify(arr)).then(() => {
                        this.setState({
                            success: true
                        })
                    });
                }
            });
    }

    saveImage = async filePath => {
        try {
            // set new image name and filepath
            const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
            const newFilepath = `${dirPicutures}/${newImageName}`;
            // move and save image to new filepath
            const imageMoved = await moveAttachment(filePath, newFilepath);
            this.setState({
                image: 'file://' + imageMoved
            })
            console.log('image moved', imageMoved);
        } catch (error) {
            console.log(error);
        }
    };

    /*
    * Capture image to upload
    */

    openCamera = () => {
        ImageCropPicker.openCamera(imagePickerOptions)
            .then(response => {
                if (response.didCancel) {
                    console.warn("User cancelled image picker");
                } else if (response.error) {
                    console.warn("ImagePicker Error: ", response.error);
                } else if (response.customButton) {
                    console.warn("User tapped custom button: ", response.customButton);
                } else {
                    this.setState({ showChooseImageModal: false }, () => {

                        this.saveImage(response.path);

                    })

                }
            })
            .catch(error => {
                console.warn("cropper error");
                console.warn(error);
            });
    }
    /*
     * Select image from gallery to upload
     */

    openGallery = () => {
        ImageCropPicker.openPicker(imagePickerOptions)
            .then(response => {
                if (response.didCancel) {
                    console.warn("User cancelled image picker");
                } else if (response.error) {
                    console.warn("ImagePicker Error: ", response.error);
                } else if (response.customButton) {
                    console.warn("User tapped custom button: ", response.customButton);
                } else {
                    this.setState({ showChooseImageModal: false }, () => {

                        this.saveImage(response.path);

                    })
                }
            })
            .catch(error => {
                console.warn("cropper error");
                console.warn(error);
            });
    }


    render = () => {

        return (

            !this.state.success ? <ScrollView style={{ flex: 1, backgroundColor: '#efece8' }}>

                <View style={[{
                    alignSelf: 'center',
                    marginTop: 1,
                    marginBottom: 10,
                    marginLeft: 35,
                    marginRight: 35,
                    flexDirection: 'row',
                }]}>
                    <Dropdown
                        style={{}}
                        containerStyle={{ height: 60, width: '80%' }}
                        labelFontSize={14}
                        labelTextStyle={{ color: '#333' }}
                        fontSize={14}
                        baseColor={'#333'}
                        label='Select Event Type'
                        value={this.state.selectedEventType}
                        onChangeText={(selectedEventType) => {
                            this.setState({
                                selectedEventType: selectedEventType
                            })
                        }}
                        data={[
                            {
                                value: 'NORMAL PARTY',
                            }, {
                                value: 'BIRTHDAY PARTY',
                            },
                            {
                                value: 'CULTURAL EVENT',
                            }, {
                                value: 'WEDDING CEREMONY',
                            },
                            {
                                value: 'INOGORATION',
                            }
                        ]}
                    />
                </View>
                <View style={styles.SectionStyle}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodname) => this.setState({ foodname: foodname })}
                        underlineColorAndroid="#f000"
                        placeholder="Enter food to be denoted"
                        placeholderTextColor="#8b9cb5"
                    />
                </View>
                <View style={styles.SectionStyle}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodamount) => this.setState({ foodamount: foodamount })}
                        underlineColorAndroid="#f000"
                        placeholder="Enter amount of food"
                        placeholderTextColor="#8b9cb5"
                    />
                </View>
                <View style={[{
                    alignSelf: 'center',
                    marginTop: 7,
                    marginBottom: 10,
                    marginLeft: 35,
                    marginRight: 35,
                    flexDirection: 'row',
                }]}>
                    <Dropdown
                        style={{}}
                        containerStyle={{ height: 60, width: '80%' }}
                        labelFontSize={14}
                        labelTextStyle={{ color: '#333' }}
                        fontSize={14}
                        baseColor={'#333'}
                        label='Select NGO'
                        value={this.state.selectedNgo}
                        onChangeText={(selectedNgo) => {
                            this.setState({
                                selectedNgo: selectedNgo
                            }, () => {
                                for (let index = 0; index < this.state.originalNgoArr.length; index++) {
                                    const element = this.state.originalNgoArr[index];
                                    if (element.user_name === this.state.selectedNgo) {
                                        this.setState({
                                            ngoEmail: element.user_email,
                                            ngoContact: element.user_mob,
                                            ngoAdd: element.user_address,
                                            selectedNgoObj: element
                                        })
                                    }

                                }
                            })
                        }}
                        data={this.state.ngoArr}
                    />
                </View>
                {this.state.selectedNgo === '' ? null : <View style={styles.SectionStyle}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(ngoEmail) => this.setState({ ngoEmail: ngoEmail })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}

                    >{this.state.ngoEmail}</TextInput>
                </View>}
                {this.state.selectedNgo === '' ? null : <View style={styles.SectionStyle}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(ngoContact) => this.setState({ ngoContact: ngoContact })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}

                    >{this.state.ngoContact}</TextInput>
                </View>}
                {this.state.selectedNgo === '' ? null : <View style={[styles.SectionStyle, { height: null }]}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(ngoAdd) => this.setState({ ngoAdd: ngoAdd })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                        multiline
                        numberOfLines={5}
                    >{this.state.ngoAdd}</TextInput>
                </View>}

                <View>
                    {this.state.image ? (
                        <Image
                            source={{ uri: this.state.image }}
                            style={{
                                width: '90%',
                                height: height / 1.7,
                                alignSelf: 'center'
                            }}
                            resizeMode={'stretch'}
                        />
                    ) : null}
                </View>

                {this.state.image ?
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
                        <TouchableOpacity
                            style={{
                                width: '45%',
                                padding: 6,
                                alignSelf: 'center',
                                backgroundColor: '#307ecc',
                                borderRadius: 6,
                                marginVertical: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#307ecc',
                                borderColor: '#307ecc',
                                borderWidth: 1,
                                shadowColor: '#ccc',
                                shadowOffset: {
                                    width: 6,
                                    height: 6,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 3,
                                elevation: 3,
                            }}
                            onPress={() => { this.setState({ showChooseImageModal: true }) }}
                        >
                            <Text style={{
                                fontSize: 15,
                                color: '#FFF'
                            }}>{"Change Image"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '45%',
                                padding: 6,
                                alignSelf: 'center',
                                backgroundColor: '#307ecc',
                                borderRadius: 6,
                                marginVertical: 8,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#307ecc',
                                borderColor: '#307ecc',
                                borderWidth: 1,
                                shadowColor: '#ccc',
                                shadowOffset: {
                                    width: 6,
                                    height: 6,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 3,
                                elevation: 3,
                            }}
                            onPress={() => { this.handleSubmitButton() }}
                        >
                            <Text style={{
                                fontSize: 15,
                                color: '#FFF'
                            }}>{"Submit Request"}</Text>
                        </TouchableOpacity>
                    </View>
                    :

                    <TouchableOpacity
                        style={{
                            width: '60%',
                            padding: 6,
                            alignSelf: 'center',
                            backgroundColor: '#307ecc',
                            borderRadius: 6,
                            marginVertical: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#307ecc',
                            borderColor: '#307ecc',
                            borderWidth: 1,
                            shadowColor: '#ccc',
                            shadowOffset: {
                                width: 6,
                                height: 6,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 3,
                            elevation: 3,
                        }}
                        onPress={() => { this.setState({ showChooseImageModal: true }) }}
                    >
                        <Text style={{
                            fontSize: 15,
                            color: '#FFF'
                        }}>{"Add Image of food"}</Text>
                    </TouchableOpacity>
                }
                <Modal
                    animationType="none"
                    transparent={true}
                    style={{ flex: 1, margin: 0 }}
                    visible={this.state.showChooseImageModal}
                    onRequestClose={() => { this.setState({ showChooseImageModal: false }) }}
                >
                    <ModalBox
                        position={'center'}
                        isOpen={this.state.showChooseImageModal}
                        style={styles.postImageModal}
                        ref={'modal1'}
                        swipeToClose={this.state.swipeToClose}
                        onClosed={() => { this.setState({ showChooseImageModal: false }) }}
                        onOpened={this.onOpen}
                        onClosingState={() => { this.setState({ showChooseImageModal: false }) }}>

                        <Text style={styles.postImageModalTitleText}>{'Choose Image'}</Text>

                        <TouchableOpacity
                            onPress={() => this.openCamera()}
                            style={styles.postImageModalItemContainer}>
                            {/* <Image
                                style={styles.image25}
                                source={require('../image/cameraIcon.png')}
                                resizeMode={"contain"}
                            /> */}
                            <Text style={styles.postImageItemText}>Camera</Text>

                        </TouchableOpacity>


                        <View style={styles.postImageItemSeparator}>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.openGallery()}
                            style={styles.postImageModalItemContainer}>
                            {/* <Image
                                style={styles.image25}
                                source={require('../image/galleryIcon.png')}
                                resizeMode={"contain"}
                            /> */}
                            <Text style={styles.postImageItemText}>Pickup from gallery</Text>

                        </TouchableOpacity>
                        <View>
                            <Text onPress={() => this.setState({ showChooseImageModal: false })} style={styles.postImageModalCancelText}>Cancel</Text>
                        </View>
                    </ModalBox>
                </Modal>
            </ScrollView> :
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#efece8',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={require('../Image/success.png')}
                        style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
                    />
                    <Text style={styles.successTextStyle}>Request submitted successfully.</Text>
                    <TouchableOpacity
                        style={{
                            width: '60%',
                            padding: 6,
                            alignSelf: 'center',
                            backgroundColor: '#307ecc',
                            borderRadius: 6,
                            marginVertical: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#307ecc',
                            borderColor: '#307ecc',
                            borderWidth: 1,
                            shadowColor: '#ccc',
                            shadowOffset: {
                                width: 6,
                                height: 6,
                            },
                            shadowOpacity: 1,
                            shadowRadius: 3,
                            elevation: 3,
                        }}
                        activeOpacity={0.5}
                        onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.buttonTextStyle}>Okay</Text>
                    </TouchableOpacity>
                </View>


        );
    }
}


const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#333',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    inputStyle: {
        flex: 1,
        color: '#333',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: '#333',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    postImageContainer: {
        flex: 1,
        marginTop: 20
    },
    postImageImage: {
        width: '100%',
        height: height / 1.7
    },
    postImageDetailsContainer: {
        marginTop: 25,
        alignItems: 'center'
    },
    postImageBoldText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#307ecc',
        alignSelf: 'center'
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#307ecc',
        borderWidth: 1,
        paddingHorizontal: 6,
        color: '#307ecc',
    },
    postImageButton: {
        width: '60%',
        padding: 12,
        alignSelf: 'center',
        backgroundColor: '#307ecc',
        borderRadius: 6,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#307ecc',
        borderColor: '#307ecc',
        borderWidth: 1,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
    },
    postImageButtonText: {
        fontSize: 18,
        color: '#307ecc'
    },
    postImageModal: {
        height: 220,
        width: '80%',
        borderRadius: 8,
    },
    postImageModalTitleText: {
        fontSize: 20,
        color: '#307ecc',
        margin: 16,
        fontWeight: 'bold',
    },
    postImageModalItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    postImageItemText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#307ecc'
    },
    postImageItemSeparator: {
        borderColor: '#ccc',
        borderWidth: 0.5,
        marginHorizontal: 16
    },
    postImageModalCancelText: {
        margin: 16,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
        color: '#307ecc'
    },

});