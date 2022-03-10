import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/SearchFriendsScreenStyles.js';


class SearchFriendsScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      requestId: '',
      errorMsg: '',
      nameToSearch: '',
      tempName: ''
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
    return fetch('http://localhost:3333/api/1.0.0/search', {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({errorMsg: ''})
                return response.json()
            }else if(response.status === 400){
                this.setState({errorMsg: 'Bad Request, Please reload or try again later.'})
                throw '500 server error'
            }else if(response.status === 401){
              this.props.navigation.navigate('Login');
            }else if(response.status === 500){
              this.setState({errorMsg: 'Server Error, Please reload or try again later.'})
              throw '500 server error'
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

  addFriend = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch('http://localhost:3333/api/1.0.0/user/' + this.state.requestId  +'/friends', {
       method: 'post',
       headers: {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({errorMsg: ''})
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate('Login');
            }else if(response.status === 403){
              this.setState({errorMsg: 'You have already added this user!'})
              throw '403 add friend'
          }else if(response.status === 404){
              this.setState({errorMsg: 'Not found! Please reload'})
              throw '404 in add friend'
          }else if(response.status === 500){
            this.setState({errorMsg: 'Server Error, Please reload or try again later.'})
            throw '500 server error in add friend'
            }else{
                throw 'Something went wrong';
            }
        })
        .catch((error) => {
            console.log(error);
        })
  }

  searchForName = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const nameToSearchFor = this.state.nameToSearch;
    return fetch('http://localhost:3333/api/1.0.0/search?q=' + nameToSearchFor, {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                this.setState({errorMsg: ''})
                return response.json()
            }else if(response.status === 400){
                this.setState({errorMsg: 'Bad Request, Please reload or try again later.'})
                throw '500 server error'
            }else if(response.status === 401){
              this.props.navigation.navigate('Login');
            }else if(response.status === 500){
              this.setState({errorMsg: 'Server Error, Please reload or try again later.'})
              throw '500 server error'
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

  searchName = async () => {
    let tempName = this.state.tempName;
    this.setState({
        nameToSearch: tempName
    })
    this.searchForName();
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
          <ScrollView styles={styles.pageContainer} accessible={true} accessibilityLabel="Find new Friends"> 
            <Text style={{color: "red"}}>{this.state.errorMsg}</Text>
            <SafeAreaView style={styles.profileContainer}>
              <TextInput
                placeholder="Search for friend with name..."
                onChangeText={ value => this.setState({tempName: value})}
                value={this.state.tempName}
                style={{padding:5, borderWidth:1, margin:5}}
                maxLength={200}
              />
              <Button 
                title="Search" 
                onPress={() => {
                  this.searchName();
                }}
                color="#ef8354"
                accessibilityRole="button"
              />
            </SafeAreaView>
            <FlatList
                  data={this.state.listData}
                  renderItem={({item}) => (
                    <View style= {styles.profileContainer} accessible={true} accessibilityLabel="Possible Friend">
                       <SafeAreaView style={styles.friendContainer}>                     
                          <SafeAreaView>
                          <Text style={styles.profileInfo}>
                            User ID: {item.user_id.toString()}
                            </Text>
                          <Text style={styles.profileInfo}>
                            Name: {item.user_givenname} {item.user_familyname}
                            </Text>
                          </SafeAreaView>
                          <Button 
                              title="Add" 
                              onPress={() => {this.setState({requestId: item.user_id.toString()}); this.addFriend(); }} 
                              color="#ef8354"
                              accessibilityRole="button"
                          />
                      </SafeAreaView>
                    </View> 
                  )}
                  keyExtractor={(item,index) => item.user_id.toString()}
                />
          </ScrollView>
        );
      } 
    }
  }
export default SearchFriendsScreen;