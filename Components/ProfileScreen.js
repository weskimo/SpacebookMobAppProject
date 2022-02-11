import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class ProfileScreen extends Component {
    render(){
      const navigation = this.props.navigation.replace( "LoginScreen" );
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Sign Up</Text>
          
        
        </View>
      );
    } 
}
export default ProfileScreen;