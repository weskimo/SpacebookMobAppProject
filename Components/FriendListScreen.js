import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, SafeAreaView, View, Text, TextInput } from 'react-native';
import SearchFriendsScreen from './SearchFriendsScreen';





class FriendListScreen extends Component {
    render(){
        
      return (
      
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
            <Text>Your friends:</Text>
            
        </View>
      
      );
    } 
}
export default FriendListScreen;



