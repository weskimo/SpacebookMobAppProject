import React, { Component } from 'react';
import { Button,  Text  } from 'react-native';
import { ScrollView, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../Components/loginForm';
import { View } from 'react-native-web';

class LoginScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMsg: ""
        }
    }



    render(){
        return (
                <View>
                    
                <SafeAreaView style={styles.loginForm}>
                    <Text style={styles.text}>
                        Please Login here:
                    </Text>
                    <LoginForm />  
                </SafeAreaView>
                </View>
           
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    loginForm: {
        
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 100
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    }
    
})