import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoggedInScreen from './Components/LoggedInScreen';
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignUpScreen';
import LogoutScreen from './Components/LogOutScreen';

const Drawer = createDrawerNavigator();

class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={LoggedInScreen} />
                    <Drawer.Screen name="Login" component={LoginScreen} />
                    <Drawer.Screen name="Signup" component={SignupScreen} />
                    <Drawer.Screen name="Logout" component={LogoutScreen} />
                </Drawer.Navigator>
                
            </NavigationContainer>
        );
    }
}

export default App;