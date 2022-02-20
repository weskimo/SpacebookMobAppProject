import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';
import editYourProfile from './editYourProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';





const Stack = createNativeStackNavigator();

class ProfileStack extends Component {

    render() {
    return (
        <Stack.Navigator>
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Edit" component={editYourProfile} />
                    </Stack.Navigator>
    )
    }
 }

 export default ProfileStack
