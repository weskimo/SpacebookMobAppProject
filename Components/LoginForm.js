import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class LoginForm extends Component {

    render() {
        return (
            <View >
                <Text>Login:</Text>
                <Text>Email:</Text>
                <TextInput placeholder="Type Email Here..."/>
                <Text>Password:</Text>
                <TextInput placeholder="Type Email Here..." secureTextEntry={true}/>

            </View>
        );
    }
}

export default LoginForm;