import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image,SafeAreaView, ScrollView} from 'react-native';
import { NavigationContainer, TabRouter } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import styles from '../StyleSheets/FriendsProfileStyles.js';
import FriendListScreen from './FriendListScreen.js';


// function that takes a param of a list, then for each list element stores the profile id into an array. 
// then loop that array and for each id, pass it to a function that gets the profile pictures which accepts a param of the user id.


class FriendsProfile extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          userId: '',
          first_Name: '',
          last_name: '',
          text: '',
          tempPost: '',
          listData: [],
          post_Id: 0, 
          postLikes: 0,
          photo: null,
          errorMsg: ""
         
          
          
        }
      }

      

      get_profile_image_Posts = async (userID) => {
        const token = await AsyncStorage.getItem('@session_token');
        const friendsID = userID;
          
        fetch("http://localhost:3333/api/1.0.0/user/" + friendsID +"/photo", {
          method: 'GET',
          headers: {
            'X-Authorization': token
          }
        })
        .then((res) => {
          return res.blob();
        })
        .then((resBlob) => {
          let data = URL.createObjectURL(resBlob);
          this.setState({
            photo: data,
            isLoading: false
          });
        })
        .catch((err) => {
          console.log("error", err)
        });
      }
      

      get_profile_image = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const friendsID = this.state.userId;
          
        fetch("http://localhost:3333/api/1.0.0/user/" + friendsID +"/photo", {
          method: 'GET',
          headers: {
            'X-Authorization': token
          }
        })
        .then((res) => {
          return res.blob();
        })
        .then((resBlob) => {
          let data = URL.createObjectURL(resBlob);
          this.setState({
            photo: data,
            isLoading: false
          });
        })
        .catch((err) => {
          console.log("error", err)
        });
      }

      getPosts = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const friendsID = this.state.userId;
        return fetch("http://localhost:3333/api/1.0.0/user/" + friendsID  +"/post", {
              'headers': {
                'X-Authorization':  value
              }
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }else if(response.status === 401){
                  this.props.navigation.navigate("Login");
                  throw '401 in getposts'
                }else if (response.status === 403){  
                  this.setState({errorMsg: "You can only see the posts of yourself and your friends!"})
                  throw '403 in getposts'
                }else if (response.status === 404){  
                  this.setState({errorMsg: "404 Not found?!"})
                  throw '404 in getposts'
                }else if (response.status === 500){  
                  this.setState({errorMsg: "Server Error?!"})
                  throw '500 in getposts'
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

 
    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {  
        this.setState({userId: JSON.stringify(this.props.route.params.friendID)})
        this.getProfileData();
        this.getPosts();
        this.get_profile_image();
      });
        
    }

    getProfileData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const friendsID = this.state.userId;
        return fetch("http://localhost:3333/api/1.0.0/user/" + friendsID, {
              'headers': {
                'X-Authorization':  value
              },  
        })
        .then((response) => {
          if(response.status === 200){
                  
            return response.json()
           
          }else if(response.status === 401){
            this.setState({errorMsg: "Unauthorized"})
            this.props.navigation.navigate("Login");
            throw '401 Unauthorized';
          }else if (response.status === 404){  
            this.setState({errorMsg: "User not found?!"})
            throw '404 in get profile data'
          }else if (response.status === 500){  
            this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
            throw '500 in get profile data'
          }else{
            throw 'Something went wrong';
        }
        })
        .then(async (responseJson) => {
                console.log(responseJson);
                await AsyncStorage.setItem('@first_name', responseJson.first_name);
                await AsyncStorage.setItem('@last_name', responseJson.last_name);
                await AsyncStorage.setItem('@email', responseJson.email);
                await AsyncStorage.setItem('@password', responseJson.password);
                this.setState({
                    
                    isLoading: false,
                    first_Name: responseJson.first_name,
                    last_Name: responseJson.last_name
                })
                this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    addPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const friendsID = this.state.userId;
        const getState = this.state.text;
        if (getState.length < 1 || getState.length > 320) {
          this.setState({errorMsg: "The length of the post must be between 1 and 320 characters."})
    } else {
        return fetch("http://localhost:3333/api/1.0.0/user/" + friendsID + "/post" , {
           method: 'post',
           headers: {
                'X-Authorization':  value ,
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify({
                text: this.state.text
            })
                
            
            })
            .then((response) => {
                if(response.status === 201){
                    this.getPosts();
                  }else if(response.status === 401){
                    this.setState({errorMsg: "Unauthorized"})
                    this.props.navigation.navigate("Login");
                    throw '401 Unauthorized in addpost';
                  }else if (response.status === 404){  
                    this.setState({errorMsg: "User not found?!"})
                    throw '404 in add post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
                    throw '500 in add post'
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
          }
      }

      

      makePost = () => {
          this.changePost();
          this.addPost();
      }

      changePost = () => {
        let tempPost = this.state.tempPost;
        this.setState({
            text: tempPost
        })
    }




    likePost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = this.state.userId
        const postID = this.state.post_Id;
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + postID + "/like" , {
           method: 'post',
           headers: {
                'X-Authorization':  value ,
                'Content-Type': 'application/json' 

              },
            })
            .then((response) => {
                if(response.status === 200){
                    this.getPosts();
                    
                  }else if(response.status === 401){
                    this.setState({errorMsg: "Unauthorized"})
                    this.props.navigation.navigate("Login");
                    throw '401 Unauthorized in like post';
                  }else if (response.status === 404){  
                    this.setState({errorMsg: "User not found?!"})
                    throw '404 in like post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
                    throw '500 in like post'
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
      }

      unlikePost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = this.state.userId
        const postID = this.state.post_Id;
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + postID + "/like" , {
           method: 'delete',
           headers: {
                'X-Authorization':  value ,
                'Content-Type': 'application/json' 

              },
            })
            .then((response) => {
                if(response.status === 200){
                    this.getPosts();
                    
                  }else if(response.status === 401){
                    this.setState({errorMsg: "Unauthorized"})
                    this.props.navigation.navigate("Login");
                    throw '401 Unauthorized in unlike post';
                  }else if (response.status === 404){  
                    this.setState({errorMsg: "User not found?!"})
                    throw '404 in unlike post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
                    throw '500 in unlike post'
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
      }

    render(){
        const navigation = this.props.navigation; 
        
        
        if(this.state.isLoading){
            return (
                <View>
                  <Text>Loading...</Text>
                </View>
            )
        }else{
            return (
                <ScrollView style={styles.profileContainer} accessible={true} accessibilityLabel="Friends Profile">
                  <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                  <SafeAreaView style={styles.infoContainer} accessible={true}>
                    <Image
                        source={{uri: this.state.photo}}
                        style={styles.profPic}
                    />
                    <SafeAreaView accessible={true}>
                      <Text style={styles.postText}>
                        Login id: {this.state.userId}
                      </Text>
                      <Text style={styles.profileInfo}>
                        First Name: {this.state.first_Name}
                      </Text>
                      <Text style={styles.profileInfo}>
                        Last Name: {this.state.last_Name}
                      </Text>
                    </SafeAreaView>
                  </SafeAreaView>
                  <TextInput
                    placeholder="Write you post here.."
                    onChangeText={ value => this.setState({tempPost: value})}
                    value={this.state.tempPost}
                    style={{padding:5, borderWidth:1, margin:5}}
                    maxLength={200}
                  />
                  <Button 
                    title="Make post" 
                    onPress={() => {this.makePost();}} 
                    color="#ef8354"
                    accessibilityRole="button"
                  />
                  <FlatList
                    data={this.state.listData}
                    renderItem={({item}) => ( 
                      <View style={styles.profileContainer} accessible={true} accessibilityLabel="Friends Wall Post">
                        <SafeAreaView style={styles.postAuthorContainer}>
                          
                          <Text style={styles.profileInfo}>
                            {item.author.first_name + " " + item.author.last_name + " says:"}
                          </Text>
                          
                        </SafeAreaView>
                        <Divider />
                          <Text style={styles.postText}>
                            {item.text}
                          </Text>
                          <Text style={styles.likesText}>
                            Likes: {item.numLikes}
                          </Text> 
                          <Divider />
                          <View style={styles.buttonsContainer}>
                            <Button 
                              title="Like" 
                              onPress={() => {this.setState({post_Id: item.post_id});
                              this.likePost();}} color="#ef8354"
                              accessibilityRole="button"
                            />
                            <Button 
                              title="Unlike" 
                              onPress={() => {this.setState({post_Id: item.post_id});
                              this.unlikePost();}} 
                              color="#ef8354"
                              accessibilityRole="button"
                            />
                          </View>     
                     </View>
                        )}
                        keyExtractor={(item,index) => item.post_id.toString()}
                        />          
                </ScrollView>  
            )
    } 
}
}
export default FriendsProfile;