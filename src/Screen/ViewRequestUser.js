
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

export default class ViewRequestUser extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            request: this.props.navigation.state.params.request,
            NGO: null
        };
    }



    componentDidMount() {

        AsyncStorage.getItem('userObject')
            .then(userObject => {
                this.setState({
                    userObject: userObject
                })
                AsyncStorage.getItem('allUsers')
                    .then(userArr => {
                        if (userArr) {
                            var users = JSON.parse(userArr);
                            for (let index = 0; index < users.length; index++) {
                                const element = users[index];
                                if (element.user_type === 'NGO' && element.user_email === this.state.request.NGOEmail) {
                                    console.log(">>>>>>>>>>>>", element)
                                    this.setState({
                                        NGO: element
                                    })

                                }

                            }

                        }

                    });

            });

    }

    render = () => {

        return (

            <ScrollView style={{ flex: 1, backgroundColor: '#efece8' }}>
                <View style={[styles.SectionStyle]}>
                    <Text style={styles.inputTextStyle}>Request Status:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodname) => this.setState({ foodname: foodname })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                    >{this.state.request.requestState}</TextInput>

                </View>

                <View style={styles.SectionStyle}>
                    <Text style={styles.inputTextStyle}>Event Type:</Text>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodname) => this.setState({ foodname: foodname })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                        multiline
                        numberOfLines={2}
                    >{this.state.request.eventType}</TextInput>
                </View>
                <View style={[styles.SectionStyle, { height: null }]}>
                    <Text style={styles.inputTextStyle}>Food Name:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodname) => this.setState({ foodname: foodname })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                        multiline
                        numberOfLines={2}
                    >{this.state.request.foodName}</TextInput>
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.inputTextStyle}>Food Amount:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodamount) => this.setState({ foodamount: foodamount })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                    >{this.state.request.foodAmount}</TextInput>
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.inputTextStyle}>Date:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodname) => this.setState({ foodname: foodname })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                    >{moment(this.state.request.dateTime).format('DD-MMM-YYYY')}</TextInput>
                </View>
                {this.state.NGO ? <View style={[styles.SectionStyle, { height: null }]}>
                    <Text style={styles.inputTextStyle}>NGO Email:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(ngoEmail) => this.setState({ ngoEmail: ngoEmail })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                        multiline
                        numberOfLines={2}

                    >{this.state.NGO.user_email}</TextInput>
                </View> : null}
                {this.state.NGO ? <View style={styles.SectionStyle}>
                    <Text style={styles.inputTextStyle}>NGO Mob No:</Text>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(ngoContact) => this.setState({ ngoContact: ngoContact })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}

                    >{this.state.NGO.user_mob}</TextInput>
                </View> : null}
                {this.state.NGO ? <View style={[styles.SectionStyle, { height: null }]}>
                    <Text style={styles.inputTextStyle}>NGO Addr:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(ngoAdd) => this.setState({ ngoAdd: ngoAdd })}
                        underlineColorAndroid="#f000"
                        placeholderTextColor="#8b9cb5"
                        editable={false}
                        multiline
                        numberOfLines={5}
                    >{this.state.NGO.user_address}</TextInput>
                </View> : null}

                <View>
                    <Text style={styles.inputTextStyle}>Image Uploaded by User</Text>

                    <Image
                        source={{ uri: this.state.request.userImagePath }}
                        style={{
                            width: '90%',
                            height: height / 1.7,
                            alignSelf: 'center'
                        }}
                        resizeMode={'stretch'}
                    />

                </View>

                {this.state.request.requestState === 'Processed' ?
                    <View>
                        <Text style={styles.inputTextStyle}>Image Uploaded by NGO:</Text>

                        <Image
                            source={{ uri: this.state.request.NGOImagePath }}
                            style={{
                                width: '90%',
                                height: height / 1.7,
                                alignSelf: 'center'
                            }}
                            resizeMode={'stretch'}
                        />

                    </View>
                    : null}

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
                    onPress={() => { this.props.navigation.goBack() }}
                >
                    <Text style={{
                        fontSize: 15,
                        color: '#FFF'
                    }}>{'Back'}</Text>
                </TouchableOpacity>

            </ScrollView>


        );
    }
}


const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
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
    inputTextStyle: {
        flex: 1,
        color: '#333',
        alignSelf: 'center',
        marginVertical: 5
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