import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';
import editYourProfile from './editYourProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import LoggedInScreen from './LoggedInScreen';
import editPost from './editPost';
import cameraComponent from './cameraComponent';





const Stack = createNativeStackNavigator();


class ProfileStack extends Component {

    render() {

    const navigation = this.props.navigation;
    return (
       
        <Stack.Navigator initialRouteName='Profile'>   
            <Stack.Screen  
                 name="Edit" 
                component={editYourProfile} 
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name="Edit Posts" 
                component={editPost} 
            />
            <Stack.Screen 
                name="Take picture" 
                component={cameraComponent} 
            />
        </Stack.Navigator>           
    )
    }
 }

 export default ProfileStack
