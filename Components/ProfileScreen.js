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
          userId: ''
         
          
          
        }
      }
      retrieveData = async () => {
        try {
            const id = await AsyncStorage.getItem('@user_id');
            // const data = JSON.stringify(jsonValue);
         
            this.setState({
                userId: id,
                isLoading: false
            })
            console.log(value);
          
        } catch (error) {
          // Error retrieving data
        }
      };

      
      
    componentDidMount(){
        this.retrieveData();
    }
     
    render(){
        
        if(this.state.isLoading){
            return (
                <View><Text>Loading... </Text></View>
            )
        }else{
            
            return (
                <View>
                    <Text>Login id: {this.state.userId}</Text>
                    
                </View>
            )
    } 

}
}
export default ProfileScreen;