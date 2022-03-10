import React, { Component } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, ScrollView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/NotificationScreenStyles.js'



const Tab = createBottomTabNavigator();

class NotificationScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      requestId: '',
      errorMsg: ''
    }

  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {  
    this.getData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch('http://localhost:3333/api/1.0.0/friendrequests', {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate('Login');
              throw '401! Unauthorized!';
            }else if(response.status === 500){
              this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
              throw '500! Server error!';
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
    return fetch('http://localhost:3333/api/1.0.0/friendrequests/' + this.state.requestId  , {
       method: 'post',
       headers: {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                this.getData();
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate('Login');
              throw '401! Unauthorized!';
            }else if(response.status === 404){
              this.props.navigation.navigate('Login');
              this.setState({errorMsg: '404 Not found Error!'})
              throw '404! Not found!';
            }else if(response.status === 500){
              this.props.navigation.navigate('Login');
              this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
              throw '500! Server error!';
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
    return fetch('http://localhost:3333/api/1.0.0/friendrequests/' + this.state.requestId  , {
       method: 'delete',
       headers: {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                this.getData();
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate('Login');
            }else if(response.status === 404){
              this.props.navigation.navigate('Login');
              this.setState({errorMsg: '404 Not found Error!'})
              throw '404! Not found!';
            }else if(response.status === 500){
              this.props.navigation.navigate('Login');
              this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
              throw '500! Server error!';
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text>Loading..</Text>
        </View>
      );
    }else{
      return (
        <ScrollView  style={styles.pageContainer} accessible={true} accessibilityLabel="Notificatons appear here when you get them">
          <Text style={{color: "red"}}>{this.state.errorMsg}</Text>
          <FlatList
              data={this.state.listData}
              renderItem={({item}) => (
              <SafeAreaView style={styles.postContainer}>
                <Text style={styles.title}>
                  Friend Request:
                </Text>
                <Text style={styles.userInfo}>
                  UserID: {item.user_id.toString()}
                </Text>
                <Text style={styles.userInfo}>
                  Firstname: {item.first_name}
                </Text>
                <Text style={styles.userInfo}>
                  Familyname: {item.last_name}
                </Text>
                <SafeAreaView style={styles.buttonContainer}>
                  <Button 
                    title="Accept" 
                    onPress={() => {this.setState({requestId: item.user_id.toString()}); 
                      this.acceptFriend(); }} 
                    color="#ef8354"
                    accessibilityRole="button"
                  />
                    
                  <Button 
                    title="Decline" 
                    onPress={() => {this.setState({requestId: item.user_id.toString()}); 
                      this.declineFriend(); }} 
                    color='#ef8354'
                    accessibilityRole="button"
                  />
                </SafeAreaView>
              </SafeAreaView>
                )}
                keyExtractor={(item,index) => item.user_id.toString()}
              />
        </ScrollView>
      );
    }
}
}
export default NotificationScreen;