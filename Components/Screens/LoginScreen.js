import React, { Component } from 'react';
import {  Text  } from 'react-native';
import { ScrollView, TextInput, StyleSheet, SafeAreaView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../Components/loginForm';
import { View } from 'react-native-web';
import styles from '../StyleSheets/LoginScreenStyles.js';
import ValidationComponent from 'react-simple-form-validator';
import { Button } from 'react-native-elements';

class LoginScreen extends ValidationComponent{
    constructor(props){
        super(props);

        this.fieldRules = {
            email: {
                     email: true, 
                     required: true,
                     maxlength: 320,
                     minlength: 5   
                    },
            password: { required: true,
                minlength: 5
                  }
          };

        this.state = {
            email: "",
            password: "",
            errorMsg: ""
        }
    }
    
    login = async () => {

        if(this.state.password.length < 1 || this.state.email.length < 1){
            this.setState({errorMsg: "The Email and Password must be between 1 and 320 characters"});
        } else if(this.state.password.length > 320 || this.state.email.length > 320) {
            this.setState({errorMsg: "The Email and Password must be between 1 and 320 characters"});
        } else {

        return fetch("http://localhost:3333/api/1.0.0/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 200){
                
                return response.json()
               
            }else if(response.status === 400){
                this.setState({errorMsg: "Invalid email or password"});
                throw 'Invalid email or password';
            }else if(response.status === 500){
                this.setState({errorMsg: "Server Error! Please reload or try again later!"});
                throw "Server Error! Please reload or try again later!";
            }else{
                throw 'Something went wrong';
            }
        })
        .then(async (responseJson) => {
                console.log(responseJson);
                await AsyncStorage.setItem('@session_token', responseJson.token);
                await AsyncStorage.setItem('@user_id', responseJson.id);

                this.props.navigation.navigate("SpaceBook");
        })
        .catch((error) => {
            console.log(error);
        })
    }
    }



    render(){
        return (
                <View accessible={true} accessibilityLabel="Login Screen and Form">
                    
                <SafeAreaView style={styles.loginForm} accessible={true}>
                <View >
                    <Image 
                    style={styles.tinyLogo}
                    source={{uri: require('../pics/spacebooklogo.png')}} />
                </View>    
                    <Text style={styles.text}>
                        Please Login here:
                    </Text>
                    <View accessible={true}>
             
                <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                <SafeAreaView style={styles.loginForm}>
                <form>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => this.validate({ email: e.target.value, fieldRules: this.fieldRules })}
                        value={this.state.email}
                        placeholder="Enter your email..."
                    />
                </form>
                </SafeAreaView>
                <SafeAreaView style={styles.loginForm}>
                <form>
                <input
                        id="password"
                        type="password"
                        onChange={(p) => this.validate({ password: p.target.value, fieldRules: this.fieldRules })}
                        value={this.state.password}
                        placeholder="Enter your password..."
                    />
                </form>
                </SafeAreaView>
                <View style={styles.buttonsContainer}>
                        <Button
                            title="LOG IN"
                            onPress={() => this.login()}
                            buttonStyle={{
                            backgroundColor: 'black',
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 30,
                            
                            }
                        }
                            containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                            
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                        />
                </View>
              
                
                <View style={styles.buttonContainer}>
                    <Button
                        title="Don't have an account?"
                        color='#ef8354'
                        onPress={() => this.props.navigation.navigate("Signup")}
                        accessibilityRole="button"
                    />
                </View>
             
            </View> 
                </SafeAreaView>
                </View>
           
        )
    }
}

export default LoginScreen;