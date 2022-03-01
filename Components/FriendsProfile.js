import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image,SafeAreaView} from 'react-native';
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
          postLikes: 0,
          photo: null,
          errorMsg: ""
         
          
          
        }
      }

      get_profile_image = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@friendsID');
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
        this.getProfileData();
        this.getPosts();
        this.get_profile_image();
      });
        
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
                <View style={styles.profileContainer}>
                  <Text>{this.state.errorMsg}</Text>
                  <SafeAreaView style={styles.infoContainer}>
                    <Image
                        source={{uri: this.state.photo}}
                        style={styles.tinyLogo}
                    />
                    <SafeAreaView>
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
                    color='#9075D8'
                  />
                  <FlatList
                    data={this.state.listData}
                    renderItem={({item}) => ( 
                      <View style={styles.profileContainer}>
                        <SafeAreaView style={styles.postAuthorContainer}>
                          <Image 
                            style={styles.tinyLogo}
                            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
                          <Text style={styles.profileInfo}>
                            {item.author.first_name + " " + item.author.last_name + " says:"}
                          </Text>
                        </SafeAreaView>
                          <Text style={styles.postText}>
                            {item.text}
                          </Text>
                          <Text style={styles.postText}>
                            Likes: {item.numLikes}
                          </Text> 
                          <View style={styles.buttonsContainer}>
                            <Button 
                              title="Like" 
                              onPress={() => {this.setState({post_Id: item.post_id});
                              this.likePost();}} color='#9075D8'
                            />
                            <Button 
                              title="Unlike" 
                              onPress={() => {this.setState({post_Id: item.post_id});
                              this.unlikePost();}} 
                              color='#9075D8'
                            />
                          </View>     
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


const styles = StyleSheet.create({
    contentView: {
      flex: 1,
    },
    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor: '#674AB3',
      
      width: '100%',
      marginVertical: 10,
      marginHorizontal: 10
    },
    postContainer: {
      backgroundColor: `#FFFFFF` , 
      borderWidth: 5,
      borderColor: '#674AB3'
    },
  
    profileContainer: {
      backgroundColor: `#FFFFFF` , 
      borderWidth: 5,
      borderColor: '#674AB3',
      
    },
  
    buttonColor: {
      color: '#9075D8'
    },
  
    profileInfo: {
      fontSize: 15,
      fontWeight: "bold",
      marginHorizontal: 10
    },
  
    postText: {
      fontSize: 15,
      marginHorizontal: 10
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    infoContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10
    },
    postAuthorContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10,
      alignItems: 'center'
    },
  });  