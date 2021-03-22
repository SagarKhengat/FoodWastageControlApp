import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('userObject').then((value) =>
        this.props.navigation.replace(value === null ? 'login' : 'dashboard'),
      );
    }, 1500);

  }




  render() {
    return (
      <View style={{ backgroundColor: '#FFF' }}>
        <Image
          source={require('../Image/Reducingfood.jpg')}
          style={{ width: '90%', height: '100%', alignSelf: 'center' }}
        />
      </View>
    );
  }
}

export default Home;
