import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';
import editYourProfile from './editYourProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';






class editPost extends Component {

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
          postLikes: 0
         
          
          
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
       
        this.getPosts();
        
        
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
                if(response.status === 201){
                    this.getPosts();
                }else if(response.status === 401){
                  this.props.navigation.navigate("Login");
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
          this.addPost();
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
                <View><Text>Loading... 
                    </Text></View>
            )
        }else{
            
            return (

 
                
                
                <View>

                    <FlatList
                        data={this.state.listData}
                        renderItem={({item}) => (
                            <View>
                                <Text>
                                {item.text}
                                </Text>
                                <Text>Likes: {item.numLikes}</Text> 
                                <TextInput placeholder='Change post to...' 
                                onChangeText={ value => this.setState({tempPost: value})}
                                />
                                <Button title='Change Post' onPress={() => {this.setState({post_Id: item.post_id});this.changePost() ;} }/>

                                <Button title='Patch Post' onPress={() => {this.patchPost(); this.getPosts();} }/>
                             

                                
                                
                            </View>
                        )}
                        keyExtractor={(item,index) => item.post_id.toString()}
                        />

                    
                        
                          
                        
                   
                        
                   
                    
                            
                </View>
                
            )
    } 

}
}
export default editPost;