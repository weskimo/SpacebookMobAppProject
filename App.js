import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, SafeAreaView, View, Text, TextInput } from 'react-native';

import SignUpScreen from './Components/SignUpScreen';
import LoginScreen from './Components/LoginScreen';
import ProfileScreen from './Components/ProfileScreen';


const Stack = createNativeStackNavigator();


class App extends Component {
  
  render(){

  
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerLeft: (props) => null}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;
