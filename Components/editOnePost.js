import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';
import editYourProfile from './editYourProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';






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
          post_Id: 0, 
          postLikes: 0,
          errorMsg: ''
         
          
          
        }
      }

     

      getPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        const postId = await AsyncStorage.getItem('@post_id');
        
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
                <View>
                  <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                <Text>{this.state.first_Name} {this.state.last_name} says: </Text>
                <Text> {this.state.text}</Text>
                <Text>{this.state.postLikes}</Text>
                <Text>{this.state.post_Id}</Text>
                <TextInput 
                                  placeholder='Change post to...' 
                                  onChangeText={ value => this.setState({tempPost: value})}
                                />
                                <Button 
                                  title='Change Post' 
                                  onPress={() => {this.setState({post_Id: this.state.post_Id});this.changePost() ;}} 
                                  color='#ef8354'
                                />

                                <Button 
                                  title='Patch Post' 
                                  onPress={() => {this.patchPost();}} 
                                  color='#ef8354'
                                /> 
                                
                </View>
            )
    } 
}
}
export default editOnePost;