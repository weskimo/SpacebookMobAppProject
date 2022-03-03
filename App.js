import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoggedInScreen from './Components/Screens/LoggedInScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import SignupScreen from './Components/Screens/SignUpScreen';
import LogoutScreen from './Components/Screens/LogOutScreen';
import { Camera } from 'expo-camera';

const Drawer = createDrawerNavigator();

class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="SpaceBook">
                    <Drawer.Screen name="SpaceBook" component={LoggedInScreen} />
                    <Drawer.Screen name="Login" component={LoginScreen} />
                    <Drawer.Screen name="Signup" component={SignupScreen} />
                    <Drawer.Screen name="Logout" component={LogoutScreen} />
                </Drawer.Navigator>
                
            </NavigationContainer>
        );
    }
}

export default App;