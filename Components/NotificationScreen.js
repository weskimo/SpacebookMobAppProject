import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FriendListScreen from './FriendListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Tab = createBottomTabNavigator();

class NotificationScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      requestId: ''
    }

  }

  componentDidMount() {

    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }



  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            listData: responseJson
          })
        })
        .catch((error) => {
            console.log(error);
        })
  }


  acceptFriend = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + this.state.requestId  , {
       method: 'post',
       headers: {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  declineFriend = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + this.state.requestId  , {
       method: 'delete',
       headers: {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  render(){
       
      
    if (this.state.isLoading){
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading..</Text>
        </View>
      );
    }else{
      return (
        <View>
          
          <FlatList
                data={this.state.listData}
                renderItem={({item}) => (
                    <View>
                      <Text>
                        {item.first_name} {item.last_name} {item.user_id.toString()}
                        </Text>
                        <Button title='Accept' onPress={() => {this.setState({requestId: item.user_id.toString()}); this.acceptFriend(); }}/>
                        <Button title='Decline' onPress={() => {this.setState({requestId: item.user_id.toString()}); this.declineFriend(); }}/>
                        
                    </View>
                )}
                keyExtractor={(item,index) => item.user_id.toString()}
              />
        </View>
      );
    }
}
}
export default NotificationScreen;