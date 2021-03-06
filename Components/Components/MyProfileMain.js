import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/MainProfileComponentStyles.js';


// not using this, just doing it in the screen.


class MyProfileMain extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          userId: '',
          first_Name: '',
          last_Name: '',
          text: '',
          tempPost: '',
          listData: [],
          post_Id: 0, 
          postLikes: 0,
          photo: null,
          errorMsg: ""
         
          
          
        }
      }

      get_profile_image = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        fetch("http://localhost:3333/api/1.0.0/user/" + id +"/photo", {
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

      
      
    componentDidMount(){
      
        this.getProfileData();
        
        this.get_profile_image();

   
    }

    componentWillUnmount() {
        this.unsubscribe();
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
                    userId: id,
                    isLoading: false,
                    first_Name: responseJson.first_name,
                    last_Name: responseJson.last_name
    
                })

                this.props.navigation.navigate("SpaceBook");
        })
        .catch((error) => {
            console.log(error);
        })
    }

      setPostId = async () => {
        const postID = this.state.post_Id;
        await AsyncStorage.setItem('@post_Id', postID);
      }

      get_profile_image_posts = async (user) => {
        const token = await AsyncStorage.getItem('@session_token');
        const id = user;
        fetch("http://localhost:3333/api/1.0.0/user/" + id +"/photo", {
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
          return data;
        })
        .catch((err) => {
          console.log("error", err)
        });
      }
      render() {
          return (



                    <SafeAreaView style={styles.profileSectionContainer}>
                    <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                    <SafeAreaView style={styles.mainProfileContainer}>
                    <SafeAreaView style={styles.picAndInfoContainer}>
                      <SafeAreaView style={styles.profPicAndButtonContainer}>
                        <SafeAreaView style={styles.pictureSpace}>
                          <Image
                            source={{
                              uri: this.state.photo,
                            }}
                            style={styles.profileLogo}
                          />
                        </SafeAreaView>
                      
                      </SafeAreaView>
                    
                      <SafeAreaView style={styles.profileTextInfo}>
                        <Text>
                          Login id: {this.state.userId}
                        </Text>
                        <Text style={styles.profileInfo}>
                          {this.state.first_Name}
                        </Text>
                        <Text style={styles.profileInfo}>
                          {this.state.last_Name}
                        </Text>
                        </SafeAreaView>
                      </SafeAreaView>
                      <SafeAreaView style={styles.editButton}>
                      <Button 
                          title="Edit Profile" 
                          onPress={() => {this.props.navigation.navigate("Edit")}}  
                          color="#ef8354"
                          style={styles.editButton}
                          />
                          <Button 
                        title="Change Photo" 
                        onPress={() => {this.props.navigation.navigate("Take picture")}} 
                        color="#ef8354"
                      />
                      <Button 
                                  title="Edit Posts" 
                                  onPress={() => {
                                    this.props.navigation.navigate("Edit Posts")}} 
                                    color="#ef8354"
                                />
                      </SafeAreaView>
                      </SafeAreaView>
                      
                    
                      </SafeAreaView>
                      )
                    }
                      }
export default MyProfileMain;