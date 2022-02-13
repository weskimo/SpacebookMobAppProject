import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class LoginForm extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userEmail: '',
            tempEmail: '',
            userPass: '',
            tempPass: ''
        };
    }

    changeUserEmail = () => {
        let tempEmail = this.state.tempEmail;
        this.setState({
            userEmail: tempEmail
        })
    }
    
    
    changeUserPass = () => {
        let tempPass = this.state.tempPass;
        this.setState({
            userPass: tempPass
        })
    }

    componentDidMount(){
        console.log("mounted");
        
      }
    
    
    
      submitData = () => {
        this.changeUserEmail();
        this.changeUserPass();
      }
    
    
      logInUser = () => {
    
        
        let to_send = {

          email: this.state.userEmail,
          password: this.state.userPass
          
        };
    
        return fetch("http://localhost:3333/api/1.0.0/login", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(to_send)
        })
        .then((response) => {
          
          console.log("User Added");
          
        })
        .catch((error) => {
          console.log(error);
        })
      }



    render() {
        return (
            <View >
                <Text>Login:</Text>
                <Text>Email:</Text>
                <TextInput 
                placeholder="Type your Email here.."
                onChangeText={ value => this.setState({tempEmail: value})}
                value={this.state.tempEmail}
                />

                <TextInput 
                    placeholder="Type your Password here.."
                    onChangeText={ value => this.setState({tempPass: value})}
                    value={this.state.tempPass}
                /> 

                <Button 
                    title="Confirm data"
                    onPress={() => this.submitData() }

                />

                <Button 
                        title="Login"
                        
                        onPress={() => this.loginInUser() }
                        
                />

            </View>
        );
    }
}

export default LoginForm;