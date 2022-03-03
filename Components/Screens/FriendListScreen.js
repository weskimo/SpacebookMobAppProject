import React, { Component } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/FriendListScreenStyles.js';



// lets have some radio buttons to replace the double buttons

class FriendListScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      requestId: '',
      friendsID: '',
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
    const id = await AsyncStorage.getItem('@user_id');
    return fetch("http://localhost:3333/api/1.0.0/user/" + id  +"/friends", {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else if (response.status === 403){  
              this.setState({errorMsg: "You can only view the friends of yourself and your friends!"})
            }else if (response.status === 404){  
              this.setState({errorMsg: "User not found?!"})
            }else if (response.status === 500){  
              this.setState({errorMsg: "Server Error on!"})
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


  setFriendsId = async () => {
          
    await AsyncStorage.setItem('@friendsID', this.state.friendsID);
          
  }

  clickOnProfile = async () => {
    await AsyncStorage.setItem('@friendsID', this.state.friendsID);
    

  }


  
    render(){
      const navigation = this.props.navigation; 
      if (this.state.isLoading){
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Loading..</Text>
          </View>
        );
      }else{
        return (
          <View>
            <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
            <FlatList
                  data={this.state.listData}
                  renderItem={({item}) => 
                      (
                      <View style= {styles.profileContainer}>
                        <SafeAreaView >
                          
                          <SafeAreaView>
                          <Text style={styles.profileInfo}>
                            User ID: {item.user_id.toString()}
                            </Text>
                          <Text style={styles.profileInfo}>
                            Name: {item.user_givenname} {item.user_familyname}
                            </Text>
                            
                          </SafeAreaView>
                        </SafeAreaView>
                        <SafeAreaView style={styles.buttonsContainer}>
                          <Button 
                            title="Select User" 
                            onPress={() => {this.setState({friendsID: item.user_id}); }} 
                            color='#ef8354'
                          />
                          <Text> {this.state.friendsID}</Text>
                          <Button 
                            title="Go to profile" 
                            onPress={() => {
                              this.setState({friendsID: item.user_id});
                              this.props.navigation.navigate("MyFriend's Profile", {friendID: this.state.friendsID});}} 
                            color='#ef8354'
                          />
                          </SafeAreaView>
                      </View>
                  )}
                  keyExtractor={(item,index) => item.user_id.toString()}
                />
          </View>
        );
      }
    } 
}
export default FriendListScreen;