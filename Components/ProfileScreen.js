import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FriendListScreen from './FriendListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user_id')
        const data = JSON.stringify(jsonValue);
        
        return done(data);
    } catch(e) {
        console.error(e);
    }
}


class ProfileScreen extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          userId: '',
          first_Name: '',
          last_name: ''
         
          
          
        }
      }
      retrieveData = async () => {
        try {
            const id = await AsyncStorage.getItem('@user_id');
            const firstName = await AsyncStorage.getItem('@first_name');
            const lastName = await AsyncStorage.getItem('@last_name');
            // const data = JSON.stringify(jsonValue);
         
            this.setState({
                userId: id,
                isLoading: false,
                first_Name: firstName,
                last_Name: lastName

            })
            console.log(value);
          
        } catch (error) {
          // Error retrieving data
        }
      };

      
      
    componentDidMount(){
        this.getProfileData();
        this.retrieveData();
        
    }

    getProfileData = async () => {

        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + id, {
              'headers': {
                'X-Authorization':  value
              },
            
        })
        .then((response) => {
            if(response.status === 200){
                
                return response.json()
               
            }else if(response.status === 400){
                throw 'Invalid email or password';
            }else{
                throw 'Something went wrong';
            }
        })
        .then(async (responseJson) => {
                console.log(responseJson);
                await AsyncStorage.setItem('@first_name', responseJson.first_name);
                await AsyncStorage.setItem('@last_name', responseJson.last_name);

                this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }
     
    render(){
        
        if(this.state.isLoading){
            return (
                <View><Text>Loading... 
                    </Text></View>
            )
        }else{
            
            return (
                <View>
                    <Text>Login id: {this.state.userId}</Text>
                    <Text>First Name: {this.state.first_Name}</Text>
                    <Text>Last Name: {this.state.last_Name}</Text>
                    
                </View>
            )
    } 

}
}
export default ProfileScreen;