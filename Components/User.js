import React, {Component} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import {TextInput} from 'react-native';

class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            tempName: "",

            email: "",
            tempEmail: ""
        }
    }

    changeUserName = () => {
        let tempName = this.state.tempName;
        this.setState({
            name: tempName
        })
    }
    changeUserEmail = () => {
        let tempEmail = this.state.tempEmail;
        this.setState({
            email: tempEmail
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Please enter your name below:</Text>
                <TextInput 
                placeholder="Type your Name here.."
                onChangeText={ value => this.setState({tempName: value})}
                value={this.state.tempName}
                />
                <Button
                    title="Confirm" onPress={() => {this.changeUserName();}}
                />
                
                <Text>Please enter your Email below:</Text>
                <TextInput 
                placeholder="Type your Email here.."
                onChangeText={ value => this.setState({tempEmail: value})}
                value={this.state.tempEmail}
                />
                <Button
                    title="Confirm" onPress={() => {this.changeUserEmail();}}
                />
                <Text style={styles.title}>Your Details: </Text>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text>UserName: {this.state.name}</Text>
                    <Text>User Email: {this.state.email}</Text>

                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#eaeaea"
    },
    title: {
      marginTop: 8,
      paddingVertical: 2,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 2,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    }
  });

export default User;