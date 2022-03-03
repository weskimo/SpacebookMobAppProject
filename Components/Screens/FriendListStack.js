import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';

import FriendListScreen from './FriendListScreen';
import FriendsProfile from './FriendsProfile';





const Stack = createNativeStackNavigator();


class FriendsListStack extends Component {

    render() {

    const navigation = this.props.navigation;
    return (
       
        <Stack.Navigator initialRouteName='Profile'>
                    
                    <Stack.Screen 
                        name="FriendList" 
                        component={FriendListScreen} 
                        options={{headerShown: false}}
                    />
                    <Stack.Screen 
                        name="MyFriend's Profile" 
                        component={FriendsProfile} 
                        options={{headerShown: false}}
                    />
        </Stack.Navigator>
                   
    )
    }
 }

 export default FriendsListStack