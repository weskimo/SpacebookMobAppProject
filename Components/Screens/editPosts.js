import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';
import editYourProfile from './editYourProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { Divider, useTheme } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../StyleSheets/EditPostsStyles.js';






class editPosts extends Component {

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
          errorMsg: ''
         
          
          
        }
      }

      getPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        const postId = await AsyncStorage.getItem('@post_Id')
        return fetch("http://localhost:3333/api/1.0.0/user/" + id  +"/post/" + postId, {
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
                  this.setState({errorMsg: "You can only view the posts of your friends!"})
                }else if (response.status === 404){  
                  this.setState({errorMsg: "Posts not found?!"})
                }else if (response.status === 500){  
                  this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
                }else{
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                post_Id: responseJson.post_id,
                text: responseJson.text

              })
            })
            .catch((error) => {
                console.log(error);
            })
      }

      getPosts = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + id  +"/post", {
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
                  this.setState({errorMsg: "You can only view the posts of your friends!"})
                }else if (response.status === 404){  
                  this.setState({errorMsg: "Posts not found?!"})
                }else if (response.status === 500){  
                  this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
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

      retrieveData = async () => {
        try {
            const id = await AsyncStorage.getItem('@user_id');
            const firstName = await AsyncStorage.getItem('@first_name');
            const lastName = await AsyncStorage.getItem('@last_name');
            // const data = JSON.stringify(jsonValue);
         
            this.setState({
                userId: id,
                isLoading: false,
                first_Name: firstName,
                last_Name: lastName

            })
            
          
        } catch (error) {
          // Error retrieving data
        }
      };

      
      
    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getPosts();
      });
        
    }


    patchPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        const post_id = this.state.post_Id;
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + post_id , {
           method: 'PATCH',
           headers: {
                'X-Authorization':  value ,
                'Content-Type': 'application/json' 

              },
              body: JSON.stringify({
                text: this.state.text
            })

            })
            .then((response) => {
                if(response.status === 200){
                    return response
                }else if(response.status === 401){
                  this.props.navigation.navigate("Login");
                }else if (response.status === 403){  
                  this.setState({errorMsg: "You can only update your own posts!"})
                }else if (response.status === 404){  
                  this.setState({errorMsg: "Post Not found?!"})
                }else if (response.status === 500){  
                  this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
      }



      makePost = async () => {
          this.changePost();
          this.addPost();
      }

      changePost = () => {
        let tempPost = this.state.tempPost;
        this.setState({
            text: tempPost
        })
    }


    setPostId = async () => {

      await AsyncStorage.setItem('@post_id', this.state.post_Id);
    }

     
    render(){
        const navigation = this.props.navigation; 
        
        
        if(this.state.isLoading){
            return (
                <View>
                  <Text>
                    Loading... 
                  </Text>
                </View>
            )
        }else{
            return (
              <ScrollView>
                <SafeAreaView>
                  
                    <FlatList
                        data={this.state.listData}
                        renderItem={({item}) => (
                            <View style={styles.postContainer}>
                              <SafeAreaView style={styles.postAuthorContainer}>
                              <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                                <Text style={styles.profileInfo}>
                                  {item.author.first_name} {item.author.last_name} says: </Text>
                              </SafeAreaView>
                                <Divider />
                                <Text style={styles.postText}>
                                {item.text}
                                </Text>
                                
                                <View style={styles.likeAndPostIDContainerEdit}>
                                <Text style={styles.postText}>
                                  Likes: {item.numLikes}
                                </Text> 
                                <Text style={styles.postText}>
                                  Post Id: {item.post_id}
                                </Text>
                                </View>
                                <Divider />
                                
                               
                                <SafeAreaView style={styles.buttonContainerEdit}>
                                
                                <Button 
                                  title='Select Post' 
                                  onPress={ () => {this.setState({post_Id: item.post_id}); this.setPostId()}}
                                  color='#ef8354'
                                /> 
                                
                                
                              
                                <Button 
                                  title='View Post' 
                                  onPress={() => {this.props.navigation.navigate("Edit Post")}}
                                  color='#ef8354'
                                /> 
                                </SafeAreaView>
                            </View>
                        )}
                        keyExtractor={(item,index) => item.post_id.toString()}
                        />        
                </SafeAreaView>
                </ScrollView>
            )
    } 
}
}
export default editPosts;

