import React, { Component } from 'react';
import { Button,  Text  } from 'react-native';
import { ScrollView, TextInput, StyleSheet, SafeAreaView, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidationComponent from 'react-simple-form-validator';





const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user_id', jsonValue)
    } catch (e) {
        console.error(error);
    }
}

class LoginForm extends ValidationComponent{
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

    render(){
        return (
            <View>
             
                <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                <form>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => this.validate({ email: e.target.value, fieldRules: this.fieldRules })}
                        value={this.state.email}
                        placeholder="Enter your email..."
                    />
                    <input
                        id="password"
                        type="password"
                        onChange={(p) => this.validate({ password: p.target.value, fieldRules: this.fieldRules })}
                        value={this.state.password}
                        placeholder="Enter your password..."
                    />
                </form>
              
                <Text style={{color: 'red'}}>
                    {this.state.errorMsg}
                </Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        
                        onPress={() => this.login()}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Don't have an account?"
                        color='#ef8354'
                        onPress={() => this.props.navigation.navigate("Signup")}
                    />
                </View>
             
            </View>
        )
    }
}

export default LoginForm;

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 10
    }
    
})