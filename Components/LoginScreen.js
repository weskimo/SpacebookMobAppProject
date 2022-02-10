import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './LoginForm.js';


class LoginScreen extends Component {
    render(){

        const navigation = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <LoginForm />
                <View style={{justifyContent: "start"}}>
                <Text>Don't have an account?</Text>
                <Button 
                    title="Sign Up"
                    onPress={() => navigation.navigate('Sign Up')}/>
                </View>
            </View>
           
               
           
                
            
        );
    } 
}

export default LoginScreen;