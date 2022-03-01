import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




class SearchFriendsScreen extends Component {

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
    return fetch("http://localhost:3333/api/1.0.0/search", {
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
              this.props.navigation.navigate("Login");
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
    return fetch("http://localhost:3333/api/1.0.0/user/" + this.state.requestId  +"/friends", {
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
              this.props.navigation.navigate("Login");
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
          <ScrollView styles={styles.profileContainer}>
            <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
            <FlatList
                  data={this.state.listData}
                  renderItem={({item}) => (
                    <SafeAreaView styles={styles.profileContainer}>
                      <SafeAreaView styles={styles.profileContainer}>
                      <Image 
                          style={styles.tinyLogo}
                          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
                      <Text style={styles.profileInfo}>
                        {item.user_givenname} {item.user_familyname} {item.user_id.toString()} 
                      </Text>
                      </SafeAreaView>
                      <Button 
                        title='Add' 
                        onPress={() => {this.setState({requestId: item.user_id.toString()}); this.addFriend(); }} 
                        color='#9075D8'/>
                    </SafeAreaView>
                  )}
                  keyExtractor={(item,index) => item.user_id.toString()}
                />
          </ScrollView>
        );
      }
      
    }
  }
export default SearchFriendsScreen;


const styles = StyleSheet.create({
  contentView: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
   
    borderColor: '#674AB3',
    justifyContent: 'space-between',

    marginVertical: 10,
    marginHorizontal: 10
  },
  postContainer: {
    backgroundColor: `#FFFFFF` , 
    borderWidth: 5,
    borderColor: '#674AB3'
  },

  profileContainer: {
    backgroundColor: `#FFFFFF` , 
    borderWidth: 5,
    borderColor: '#674AB3',
    marginHorizontal: 10,
    flexDirection: 'row',
    
  },

  buttonColor: {
    color: '#9075D8'
  },

  profileInfo: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10
  },

  postText: {
    fontSize: 15,
    marginHorizontal: 10
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10
  },
  postAuthorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center'
  },
});  