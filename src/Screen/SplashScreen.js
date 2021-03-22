// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('userObject').then((value) =>
        navigation.replace(value === null ? 'LoginScreen' : 'HomeScreen'),
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/Reducingfood.png')}
        style={{ width: '90%', margin: 30, }}
        resizeMode={'contain'}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
