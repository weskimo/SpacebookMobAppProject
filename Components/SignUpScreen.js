import React, { Component } from 'react';
import { Button, ScrollView, TextInput, Text } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import ValidationComponent from 'react-simple-form-validator';

class SignupScreen extends ValidationComponent{
    constructor(props){
        super(props);


        this.fieldRules = {
            email: {
                     email: true, 
                     required: true 
                    },
            password: { required: true,
                
                  },
            firstName: {
                required: true,
            },
            lastName: {
                required: true,
            }
          };

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            errorMsg: ""
        }
    }

    signup = () => {
        //Validation here...

        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 201){
                return response.json()
            }else if(response.status === 400){
                this.setState({errorMsg: "Invalid Signup details. Please enter a valid email"})
                throw 'Failed validation';
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
               console.log("User created with ID: ", responseJson);
               this.props.navigation.navigate("Login");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        return (
            <ScrollView stlye={{flexDirection: 'column'}}>
                <form>
                    <input
                    id="firstname"
                    type="text"
                    onChange={(fn) => this.validate({ first_name: fn.target.value, fieldRules: this.fieldRules })}
                    value={this.state.first_name}
                    placeholder="Enter your first name..."
                    />
                    <input
                    id="name"
                    type="text"
                    onChange={(ln) => this.validate({ last_name: ln.target.value, fieldRules: this.fieldRules })}
                    value={this.state.last_name}
                    placeholder="Enter your last name..."
                    />
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
                    placeholder="Create a Password..."
                    />
                
                </form>
                <Text style={{color: "red"}}>{this.state.errorMsg}</Text>

                <Button
                    title="Sign Up"
                    color='#9075D8'
                    onPress={() => this.signup()}
                />
            </ScrollView>
        )
    }
}

export default SignupScreen;