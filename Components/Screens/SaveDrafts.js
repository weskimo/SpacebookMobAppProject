import React, { Component } from 'react';
import { View, Text, Button, TextInput, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/SaveDrafts';

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
          savedMsg: '',

          timeItem1: '',
          timeItem2: 0,
          timeItem3: 0,
          timeItem4: 0,
          timeNow: 0,
          tempTime1: '',
          timeTillPost: 0

          
        }
    }

    componentDidMount(){
      
        this.setSavedMessage(); 
    }

    setSavedMessage = async () => {
      const savedMsg = await AsyncStorage.getItem('savedPost1');
      this.setState({savedMsg: savedMsg});
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
        let tempPost = this.state.text;
        this.setState({
            text: tempPost
        })
    }

    saveDraft = async () => {
        await AsyncStorage.setItem('@savedPost1', this.state.text);
        this.setState({savedMsg: this.state.text})
    }
    
    deleteDraft = async () => {
      await AsyncStorage.setItem('savedPost1','');
    }

    makePost = async () => {    
        
        const savedPost = await AsyncStorage.getItem('@savedPost1');
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        this.setState({loadedMsg: savedPost})
        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/post' , {
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
                    
                    this.setState({errorMsg: ''});
                  }else if(response.status === 401){
                    this.setState({errorMsg: 'Unauthorized'})
                    this.props.navigation.navigate('Login');
                    throw '401 Unauthorized in addpost';
                  }else if (response.status === 404){  
                    this.setState({errorMsg: 'User not found?!'})
                    throw '404 in add post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
                    throw '500 in add post'
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            }) 
      }

    render() {
        const navigation = this.props.navigation; 
        return (

            <SafeAreaView style={styles.pageContainer}>
              <SafeAreaView style={styles.postContainer}>
                <Text> Save Drafts Here:</Text>
                <TextInput
                  placeholder="Write your post here.."
                  onChangeText={ value => this.setState({text: value})}
                  value={this.state.text}
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
                <SafeAreaView style={styles.buttonsContainer}>          
                  <Button 
                    title="Save Draft Post" 
                    onPress={() => { this.saveDraft();}} 
                    color="#ef8354"
                    accessibilityRole="button"
                  />
                  <Button 
                  title="Edit Saved Post" 
                  onPress={() => {this.saveDraft()}} 
                  color="#ef8354"
                  accessibilityRole="button"
                  />
                  <Button 
                    title="Post saved draft" 
                    onPress={() => {this.makePost();}} 
                    color="#ef8354"
                    accessibilityRole="button"
                  />
                </SafeAreaView>   
                
              </SafeAreaView>
            </SafeAreaView>
        );
    }
}

export default SaveDrafts;