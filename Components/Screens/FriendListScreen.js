import React, { Component } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/FriendListScreenStyles.js';

class FriendListScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      requestId: '',
      friendsID: '',
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
    const id = await AsyncStorage.getItem('@user_id');
    return fetch('http://localhost:3333/api/1.0.0/user/' + id  +'/friends', {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate('Login');
            }else if (response.status === 403){  
              this.setState({errorMsg: 'You can only view the friends of yourself and your friends!'})
            }else if (response.status === 404){  
              this.setState({errorMsg: 'User not found?!'})
            }else if (response.status === 500){  
              this.setState({errorMsg: 'Server Error on!'})
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
  searchForName = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const nameToSearchFor = this.state.nameToSearch;
    return fetch('http://localhost:3333/api/1.0.0/search?q=' + nameToSearchFor + '&search_in=friends', {
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


  setFriendsId = async () => {
          
    await AsyncStorage.setItem('@friendsID', this.state.friendsID);
          
  }

  clickOnProfile = async () => {
    this.props.navigation.navigate("MyFriend's Profile", {friendID: this.state.friendsID});
    

  }

  searchName = async () => {
    let tempName = this.state.tempName;
    this.setState({
        nameToSearch: tempName
    })
    this.searchForName();
}


    render(){
      const navigation = this.props.navigation; 
      if (this.state.isLoading){
        return (
          <View
            style={styles.loading}
          >
            <Text>Loading..</Text>
          </View>
        );
      }else{
        return (
          <View accessible={true} accessibilityLabel="Friend List">
            <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
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
                            color='#ef8354'
                            accessibilityRole="button"
                          />
            <FlatList
                  data={this.state.listData}
                  renderItem={({item}) => 
                      (
                      <View style= {styles.profileContainer} accessibilityLabel="Friend">
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
                        <SafeAreaView style={styles.buttonsContainer} accessible={true}>
                          
                          <Button 
                            title="Go to Friend's profile" 
                            onPress={() => this.props.navigation.navigate("MyFriend's Profile", {friendID: item.user_id})} 
                            color='#ef8354'
                            accessibilityRole="button"
                          />
                          <Text> {this.state.friendsID}</Text>
                          
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