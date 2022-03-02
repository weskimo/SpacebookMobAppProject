import { SafeAreaView } from "react-native-safe-area-context";
import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider, useTheme } from 'react-native-elements';




class ProfilePostsList extends Component {

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
                    this.setState({errorMsg: "Unauthorized"})
                    this.props.navigation.navigate("Login");
                    throw '401 Unauthorized';
                  }else if (response.status === 403){  
                    this.setState({errorMsg: "You can only view the posts of yourself or your friends!"})
                    throw '403 in get posts data'
                  }else if (response.status === 404){  
                    this.setState({errorMsg: "User not found?!"})
                    throw '404 in get posts data'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
                    throw '500 in get posts data'
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

      likePost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
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
        const id = await AsyncStorage.getItem('@user_id');
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
                    this.setState({errorMsg: "Unauthorized"})
                    this.props.navigation.navigate("Login");
                    throw '401 Unauthorized in remove post';
                  }else if (response.status === 403){  
                    this.setState({errorMsg: "Forbidden - You can only delete your own posts!"})
                    throw '403 in remove post'
                  }else if (response.status === 404){  
                    this.setState({errorMsg: "User not found?!"})
                    throw '404 in remove post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: "Server Error! Please relaod or try again later!"})
                    throw '500 in remove post'
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
      }
      addPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
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

  get_profile_image = async (userID) => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = userID
    fetch("http://localhost:3333/api/1.0.0/user/" + id +"/photo", {
      method: 'GET',
      headers: {
        'X-Authorization': token
      }
    })
    .then((res) => {
      return res.blob();
    }).then((resBlob) => {
        let data = URL.createObjectURL(resBlob);
        return data;
      })
   
    .catch((err) => {
      console.log("error", err)
    });
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
                <SafeAreaView>
                    <View style={styles.postContainer}>
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
                      />
                      </View>
                    <FlatList
                        data={this.state.listData}
                        renderItem={({item}) => (
                            <View style={styles.postContainer}>
                              <SafeAreaView style={styles.postAuthorContainer}>
                                  <Image source={{
                              uri: this.get_profile_image(item.author.user_id)
                            }} />
                                
                                <Text style={styles.profileInfo}>
                                  {item.author.first_name + " " + item.author.last_name + " says:"}
                                </Text>
                              </SafeAreaView>
                              <Divider />
                              <View>
                                <Text style={styles.postText}>
                                    {item.text}
                                </Text>
                              </View>
                              
                              <Text style={styles.postLikes}>
                                Likes: {item.numLikes}
                              </Text> 
                              <Divider />
                              <View style={styles.buttonsContainer}>
                                <Button 
                                  title="Like" 
                                  onPress={() => {this.setState({post_Id: item.post_id}); this.likePost();}} 
                                  color="#ef8354"
                                />
                                <Button 
                                  title="Unlike" 
                                  onPress={() => {this.setState({post_Id: item.post_id});this.unlikePost();}} 
                                  color="#ef8354"
                                />
                                <Button 
                                  title="Delete post" 
                                  onPress={() => {this.setState({post_Id: item.post_id}); this.removePost();}} 
                                  color="#ef8354"/>
                                  
                               
                              </View> 
                            </View>
                        )}
                        keyExtractor={(item,index) => item.post_id.toString()}
                    />  
                    </SafeAreaView>
        
            )}   
}
}
                    
export default ProfilePostsList;

const styles = StyleSheet.create({
    contentView: {
      flex: 1,
    },
    pageContainer: {
      backgroundColor: `#001d3d` , 
      borderWidth: 5,
      borderColor: '#001d3d',
    },
    profileSectionContainer: {
      backgroundColor: `#ffffff` , 
      borderWidth: 5,
      borderColor: '#001d3d',
    },
    mainProfileContainer: {
      backgroundColor: `#ffffff` , 
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10,
      justifyContent: 'space-between'
    },
    picAndInfoContainer: {
      flexDirection: 'row',
    },
    profPicAndButtonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between'
      
      
    },
    profileTextInfo: {
      flexDirection: 'column',
      marginVertical: 10,
      marginHorizontal: 10,
    },
    editButton: {
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },
    pictureSpace: {
      marginVertical: 10,
    },
  
  
  
    buttonsContainer: {
      flexDirection: 'row',
      borderColor: '#001d3d',
      justifyContent: 'space-between',
  
      marginVertical: 10,
      marginHorizontal: 10
    },
    postContainer: {
      backgroundColor: `#ffffff` , 
      borderWidth: 5,
      borderColor: '#001d3d'
    },
  
    profileContainer: {
      backgroundColor: `#ffffff` , 
      borderWidth: 5,
      borderColor: '#001d3d',
      
    },
  
    profileInfo: {
      fontSize: 15,
      fontWeight: "bold",
    },

    postLikes: {
      fontSize: 15,
      fontWeight: "bold",
      marginHorizontal: 10,
      marginVertical: 5,
    },
  
    postText: {
      fontSize: 15,
      marginHorizontal: 15,
      marginVertical: 5,
      
    },
    postTextBorder: {
        borderWidth: 5,
        borderColor: '#001d3d',
    },
    profileLogo: {
      width: 100,
      height: 100,
    },
    infoContainer: {
      flexDirection: 'row',
      alignContent: 'space-around',
      marginVertical: 10,
      marginHorizontal: 10
    },
    postAuthorContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10,
      alignItems: 'center'
    },
    profilePageContainer: {
      backgroundColor: `#001d3d` , 
      borderWidth: 5,
      borderColor: '#001d3d',
    },
    profileLayout: {
      marginHorizontal: 10
    },
    editProfileButton: {
      alignContent: 'space-between'
    }
  });  