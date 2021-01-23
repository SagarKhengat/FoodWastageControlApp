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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import { Dropdown } from 'react-native-material-dropdown';
export default class AddRequest extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            selectedEventType: '',
        };
    }



    componentDidMount() {

        AsyncStorage.getItem('userObject')
            .then(userObject => {

                console.log(">>>>>>>>>>>>>>>>>", userObject);
            });
    }



    render = () => {

        return (

            <ScrollView style={{ flex: 1, backgroundColor: '#efece8' }}>

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
                        onChangeText={(foodamount) => this.setState({ foodamount: foodamount })}
                        underlineColorAndroid="#f000"
                        placeholder="Enter amount of food"
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
                <View style={styles.SectionStyle}>

                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(foodamount) => this.setState({ foodamount: foodamount })}
                        underlineColorAndroid="#f000"
                        placeholder="Enter amount of food"
                        placeholderTextColor="#8b9cb5"
                    />
                </View>
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
            </ScrollView>


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
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});