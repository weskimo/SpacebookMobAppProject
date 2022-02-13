import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class SignUpScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        userEmail: '',
        tempEmail: '',
        firstName: '',
        tempFirstName: '',
        tempLastName: '',
        lastName: '',
        userPass: '',
        tempPass: ''
    };
}

changeFirstName = () => {
    let tempFirstName = this.state.tempFirstName;
    this.setState({
        firstName: tempFirstName   
    })
}

changeLastName = () => {
    let tempLastName = this.state.tempLastName;
    this.setState({
        lastName: tempLastName   
    })
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
    this.getData();
  }

getData = () => {
    console.log("getting data...");
    return fetch("http://localhost:3333/list")
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            isLoading: false,
            
        })
    })
    .catch((error) => {
        console.log(error);
    });
    console.log("data got");
  } 

  submitData = () => {
    this.changeFirstName();
    this.changeLastName();
    this.changeUserEmail();
    this.changeUserPass();
  }


  addUser = () => {

    
    let to_send = {

      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.userEmail,
      password: this.state.userPass
      
    };

    return fetch("http://localhost:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      
      console.log("User Added");
      this.getData();
    })
    .catch((error) => {
      console.log(error);
    })
  }
    render(){
      const navigation = this.props.navigation;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Sign Up</Text>
          <TextInput 
                placeholder="Type your First Name here.."
                onChangeText={ value => this.setState({tempFirstName: value})}
                value={this.state.tempFirstName}
                />
          <TextInput 
                placeholder="Type your Last Name here.."
                onChangeText={ value => this.setState({tempLastName: value})}
                value={this.state.tempLastName}
                />
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
          title="Sign Up"
          
          onPress={() => this.addUser() }
          
          />
        
        </View>
      );
    } 
}

export default SignUpScreen;