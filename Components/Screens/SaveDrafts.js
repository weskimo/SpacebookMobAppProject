import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




class SaveDrafts extends Component {

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
          errorMsg: '',
          loadedMsg: '',


          timeItem1: "",
          timeItem2: 0,
          timeItem3: 0,
          timeItem4: 0,
          timeNow: 0,
          tempTime1: "",
          timeTillPost: 0

          
        }
    }

    getDateTimeNow = () => {
        const postTime = new Date().getTime();
        this.setState({timeNow: postTime});
        return postTime;
    }

    scheduleTime = () => {
        //Format July 20, 69 20:17:40 GMT+00:00
        let tempTime = this.state.tempTime;
        const postTime = new Date().getTime();
        this.setState({timeNow: postTime});

        this.setState({
            tempTime: tempTime
        })

        const date = new Date({tempTime})
        const milliseconds = date.getTime();

        const timeTillPost = postTime - milliseconds;

        this.setState({timeTillPost: timeTillPost});
    }

    setPostMessage = () => {
        let tempPost = this.state.tempPost;
        this.setState({
            text: tempPost
        })
    }

    saveDraft = async () => {
        await AsyncStorage.setItem('@savedPost1', this.state.text);
    }    

    makePost = async () => {
        
        // between 1-320 characters
        if (this.state.text.length < 1 || this.state.text.length > 320) {
              this.setState({errorMsg: "The length of the post must be between 1 and 320 characters."})
        } else {
        const savedPost = await AsyncStorage.getItem('@savedPost1');
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        this.setState({loadedMsg: savedPost})
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post" , {
           method: 'post',
           headers: {
                'X-Authorization':  value ,
                'Content-Type': 'application/json' 

              },
              body: JSON.stringify({
                text: this.state.loadedMsg
            })
            
                
            
            })
            .then((response) => {
                if(response.status === 201){
                    
                    this.setState({errorMsg: ""});
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
      




    render() {
        const navigation = this.props.navigation; 
        return (


            <SafeAreaView>
                <Text> Save Drafts Here:</Text>
                <TextInput
                        placeholder="Write you post here.."
                        onChangeText={ value => this.setState({tempPost: value})}
                        value={this.state.tempPost}
                        style={{padding:5, borderWidth:1, margin:5}}
                        maxLength={200}
                      />

                <TextInput
                        placeholder="Write time to post at like: 'July 20, 69 20:17:40 GMT+00:00' "
                        onChangeText={ value => this.setState({tempTime1: value})}
                        value={this.state.tempTime1}
                        style={{padding:5, borderWidth:1, margin:5}}
                        maxLength={200}
                      />
                      <Text>{}</Text>
                      <Button 
                        title="Confirm" 
                        onPress={() => {this.setPostMessage();}} 
                        color="#ef8354"
                        accessibilityRole="button"
                      />
                      
                      <Button 
                        title="Save Draft Post" 
                        onPress={() => { this.saveDraft();}} 
                        color="#ef8354"
                        accessibilityRole="button"
                      />

                    <Button 
                        title="Make post" 
                        onPress={() => {this.makePost();}} 
                        color="#ef8354"
                        accessibilityRole="button"
                      />
                      <Text>{this.state.text}</Text>
            </SafeAreaView>

        );
    }

}


export default SaveDrafts;