import React, { Component } from 'react';
import { StatusBar, View, Text, } from 'react-native';
import MainTabNavigator from './routes';
export default class App extends Component<{}>  {
    constructor() {
        super();
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
        console.reportErrorsAsExceptions = false;
    }
    static configureScene(route) {
        return route.animationType || Navigator.SceneConfigs.FloatFromRight;
    }
    static renderScene(route, navigator) {
        return (
            <View>
                <StatusBar backgroundColor='#02687a' barStyle="light-content" />
                <View style={{ backgroundColor: '#1e9a92', height: 24 }} />
                <route.Page
                    route={route}
                    navigator={navigator}
                />
            </View>
        );
    }
    componentDidMount() {

        console.log('App.js is called', '-----------------------------')
    }







    render() {
        return (
            <MainTabNavigator ref={(nav) => { this.navigator = nav; }} />
        );
    }
}


