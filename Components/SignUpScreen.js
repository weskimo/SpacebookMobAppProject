import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class SignUpScreen extends Component {
    render(){
      const navigation = this.props.navigation;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Sign Up</Text>
          <TextInput placeholder="Email..." />
          <TextInput placeholder="Password..." />
        
        </View>
      );
    } 
}

export default SignUpScreen;