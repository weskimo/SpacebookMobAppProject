import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';






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
          postLikes: 0
         
          
          
        }
      }

      getPosts = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@friendsID');
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
        this.getProfileData();
        this.getPosts();
        
        
    }

    getProfileData = async () => {

        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@friendsID');
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

                this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    addPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@friendsID');
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post" , {
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

    removePost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        const postID = this.state.post_Id;
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/post/" + postID  , {
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
                  this.props.navigation.navigate("Login");
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
      }


    likePost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@friendsID');
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
                  this.props.navigation.navigate("Login");
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
        const id = await AsyncStorage.getItem('@friendsID');
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
                  this.props.navigation.navigate("Login");
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
                <View><Text>Loading... 
                    </Text></View>
            )
        }else{
            
            return (

 
                
                
                <View>
                    <Text>Login id: {this.state.userId}</Text>
                    <Text>First Name: {this.state.first_Name}</Text>
                    <Text>Last Name: {this.state.last_Name}</Text>
                    <Button title="Edit Profile" onPress={() => {this.props.navigation.navigate("Edit")}} />
                    <TextInput
                    placeholder="Write you post here.."
                    onChangeText={ value => this.setState({tempPost: value})}
                    value={this.state.tempPost}
                    style={{padding:5, borderWidth:1, margin:5}}
                    />
                    <Button title="Make post" onPress={() => {this.makePost();}}/>
                    <FlatList
                        data={this.state.listData}
                        renderItem={({item}) => (
                            <View>
                                <Text>
                                {item.text}
                                </Text>
                                <Text>Likes: {item.numLikes}</Text> 
                             
                                <Button title="Like" onPress={() => {this.setState({post_Id: item.post_id});this.likePost();}}/>
                                <Button title="Unlike" onPress={() => {this.setState({post_Id: item.post_id});this.unlikePost();}}/>
                                
                                

                                
                                
                            </View>
                        )}
                        keyExtractor={(item,index) => item.post_id.toString()}
                        />

                    
                        
                          
                        
                   
                        
                   
                    
                            
                </View>
                
            )
    } 

}
}
export default FriendsProfile;