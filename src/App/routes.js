import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Home from './Home';
import {
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native';
// components
import LoginScreen from '../Screen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import SettingsScreen from '../Screen/SettingScreen';
import HomeScreen from '../Screen/HomeScreen';
import AddRequest from '../Screen/AddRequest';
import ViewRequestUser from '../Screen/ViewRequestUser'
import ViewRequestNGO from '../Screen/ViewRequestNGO'

const window = Dimensions.get("screen");

const AppNavigator = createStackNavigator(
  {
    home: {
      screen: Home, navigationOptions: {
        header: null
      },
    },
    dashboard: {
      screen: HomeScreen, navigationOptions: {
        headerTitle: <View style={{ alignSelf: "center" }}><Text style={{ textAlign: "center", fontSize: 20, fontWeight: '400' }}>{'Home'}</Text></View>,
        headerLeft: <View></View>
      }
    },
    settings: {
      screen: SettingsScreen, navigationOptions: {
        headerTitle: "settings",
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
      }
    },
    register: {
      screen: RegisterScreen, navigationOptions: {
        headerTitle: "Register",
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
      }
    },
    viewRequestUser: {
      screen: ViewRequestUser, navigationOptions: {
        headerTitle: "View Request",
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
      }
    },
    addrequest: {
      screen: AddRequest, navigationOptions: {
        headerTitle: "Add Request",
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
      }
    },
    viewRequestNGO: {
      screen: ViewRequestNGO, navigationOptions: {
        headerTitle: "View Request",
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
      }
    },
    login: {
      screen: LoginScreen, navigationOptions: {
        headerTitle: <View style={{ marginLeft: Platform.OS === 'ios' ? 0 : window.width / 2 - 25, alignSelf: "center" }}><Text style={{ textAlign: "center", fontSize: 20, fontWeight: '400', color: '#FFFFFF' }}>{'Login'}</Text></View>,
        headerLeft: null,
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
      }
    }
  },
);

export default AppNavigator;
