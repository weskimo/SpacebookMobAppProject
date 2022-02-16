import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FriendListScreen from './FriendListScreen';


const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
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
          listdata: this.props.children,  
          login_info: {}
          
          
        }
      }

      
      
      componentDidMount(){
        getData((data) => {
            this.setState({
                login_info: data,
                isLoading: false
            });
        });  
    }
     
    render(){
        
        if(this.state.isLoading){
            return (
                <View><Text>Loading...</Text></View>
            )
        }else{
            
            return (
                <View>
                    <Text>Login id: {this.state.login_info.id}</Text>
                    
                </View>
            )
    } 

}
}
export default ProfileScreen;