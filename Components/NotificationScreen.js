import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FriendListScreen from './FriendListScreen';


const Tab = createBottomTabNavigator();

class NotificationScreen extends Component {
    render(){
      
      return (
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text>Notifications:</Text>
          </View>
    );
      
    } 
}
export default NotificationScreen;