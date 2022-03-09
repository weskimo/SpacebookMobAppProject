import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';
import editYourProfile from './editYourProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import styles from '../StyleSheets/editOnePost.js';





class editOnePost extends Component {

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
          post_Id: '', 
          postLikes: 0,
          errorMsg: ''
         
          
          
        }
      }

     

      getPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        const postId = this.state.post_Id;
        
        return fetch("http://localhost:3333/api/1.0.0/user/" + id  +"/post/" + postId, {
              'headers': {
                'X-Authorization':  value
              }
            })
            .then((response) => {
                if(response.status === 200){
                    this.setState({post_Id: postId})
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
                
                text: responseJson.text,
                first_Name: responseJson.author.first_name,
                last_name: responseJson.author.last_name


              })
            })
            .catch((error) => {
                console.log(error);
            })
      }

      
    componentDidMount = async () => {
        this.setState({post_Id: JSON.stringify(this.props.route.params.postID)})
        this.getPost();
        
        
    }


    patchPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + this.state.post_Id , {
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
                    this.getPost();
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



      makePost = () => {
          this.changePost();
          
      }

      changePost = () => {
        let tempPost = this.state.tempPost;
        this.setState({
            text: tempPost
        })
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
                <ScrollView style={styles.pageContainer} accessible={true}>
                    <SafeAreaView style={styles.postContainer} accessible={true} accessibilityLabel="Post Element">
                        <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                        <View>
                            <Text style={styles.nameInfo}>{this.state.first_Name} {this.state.last_name} says: </Text>
                        </View>
                        <Divider />
                        <View style={styles.textPost}>
                            <Text> {this.state.text}</Text>
                        </View>
                        <View style={styles.likeAndPostId}>
                            <Text style={styles.nameInfo}>Likes: {this.state.postLikes}</Text>
                            <Text style={styles.nameInfo}>Post ID: {this.state.post_Id}</Text>
                        </View>
                        <Divider/>
                       
                        <SafeAreaView style={styles.textInput}>
                        <TextInput 
                            placeholder='Change post to...' 
                            onChangeText={ value => this.setState({tempPost: value})}
                        />
                        </SafeAreaView>
                       
                        <View accessible={true}>
                            <Button 
                                title='Change Post' 
                                onPress={() => {this.setState({post_Id: this.state.post_Id});this.changePost() ;}} 
                                color='#ef8354'
                                accessibilityRole="button"
                            />

                            <Button 
                                title='Patch Post' 
                                onPress={() => {this.patchPost();}} 
                                color='#ef8354'
                                accessibilityRole="button"
                            /> 
                         </View>
                         
                   </SafeAreaView>             
                </ScrollView>
            )
    } 
}
}
export default editOnePost;

