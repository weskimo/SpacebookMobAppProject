import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendListScreen from './FriendListScreen';
import FriendsProfile from './FriendsProfile';

const Stack = createNativeStackNavigator();


class FriendsListStack extends Component {

    render() {

    const navigation = this.props.navigation;
    return (
       
        <Stack.Navigator initialRouteName="Profile">  

                    <Stack.Screen 
                        name="FriendList" 
                        component={FriendListScreen} 
                        options={{headerShown: false}}
                    />
                    <Stack.Screen 
                        name="MyFriend's Profile" 
                        component={FriendsProfile} 
                        
                    />
                  
        </Stack.Navigator>             
    )
    }
 }

 export default FriendsListStack