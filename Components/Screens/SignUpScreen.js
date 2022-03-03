import React, { Component } from 'react';
import { Button, ScrollView, TextInput, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import SignupForm from '../Components/SignUpForm';
import styles from '../StyleSheets/SignUpScreenStyles.js'


class SignupScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            errorMsg: ""
        }
    }


    render(){
        return (
            <View style={styles.loginForm}>
                    
            <View style={styles.loginForm}>
                <Text style={styles.text}>
                    Sign-Up here:
                </Text>
                <SignupForm />  
            </View>
            </View>
        )
    }
}

export default SignupScreen;