import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../StyleSheets/MyProfileStyles.js'
import { Divider } from 'react-native-elements';

class ProfileScreen extends Component {

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
          errorMsg: ''
 
        }
      }
      getPosts = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        return fetch('http://localhost:3333/api/1.0.0/user/' + id  +'/post', {
              'headers': {
                'X-Authorization':  value
              }
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                  }else if(response.status === 401){
                    this.setState({errorMsg: 'Unauthorized'})
                    this.props.navigation.navigate('Login');
                    throw '401 Unauthorized';
                  }else if (response.status === 403){  
                    this.setState({errorMsg: 'You can only view the posts of yourself or your friends!'})
                    throw '403 in get posts data'
                  }else if (response.status === 404){  
                    this.setState({errorMsg: 'User not found?!'})
                    throw '404 in get posts data'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
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

      get_profile_image = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        fetch('http://localhost:3333/api/1.0.0/user/' + id +'/photo', {
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
          console.log('error', err)
        });
      }

      
      
    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getProfileData();
        this.getPosts(); 
        this.get_profile_image();
      }); 
    }

    componentWillUnmount() {
        this.unsubscribe();
      }

    getProfileData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        return fetch('http://localhost:3333/api/1.0.0/user/' + id, {
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
                this.setState({errorMsg: 'Unauthorized'})
                this.props.navigation.navigate('Login');
                throw '401 Unauthorized';
              }else if (response.status === 404){  
                this.setState({errorMsg: 'User not found?!'})
                throw '404 in get profile data'
              }else if (response.status === 500){  
                this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
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

                this.props.navigation.navigate('SpaceBook');
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
        fetch('http://localhost:3333/api/1.0.0/user/' + id +'/photo', {
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
          console.log('error', err)
        });
      }

      likePost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        const postID = this.state.post_Id;
        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/post/' + postID + '/like' , {
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
                    this.setState({errorMsg: 'Unauthorized'})
                    this.props.navigation.navigate('Login');
                    throw '401 Unauthorized in like post';
                  }else if (response.status === 404){  
                    this.setState({errorMsg: 'User not found?!'})
                    throw '404 in like post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
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
        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/post/' + postID + '/like' , {
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
                    this.setState({errorMsg: 'Unauthorized'})
                    this.props.navigation.navigate('Login');
                    throw '401 Unauthorized in unlike post';
                  }else if (response.status === 404){  
                    this.setState({errorMsg: 'User not found?!'})
                    throw '404 in unlike post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
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
        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/post/' + postID  , {
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
                    this.setState({errorMsg: 'Unauthorized'})
                    this.props.navigation.navigate('Login');
                    throw '401 Unauthorized in remove post';
                  }else if (response.status === 403){  
                    this.setState({errorMsg: 'Forbidden - You can only delete your own posts!'})
                    throw '403 in remove post'
                  }else if (response.status === 404){  
                    this.setState({errorMsg: 'User not found?!'})
                    throw '404 in remove post'
                  }else if (response.status === 500){  
                    this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
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
        const getState = this.state.text;
        if (getState.length < 1 || getState.length > 320) {
          this.setState({errorMsg: 'The length of the post must be between 1 and 320 characters.'})
        }else {
        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/post' , {
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
                <ScrollView style={styles.pageContainer} accessible={true} accessibilityLabel="Your Profile">
                  <SafeAreaView style={styles.profileSectionContainer} accessible={true}>
                    <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                    <SafeAreaView style={styles.mainProfileContainer} accessible={true}>
                      <SafeAreaView style={styles.picAndInfoContainer} accessible={true}>
                        <SafeAreaView style={styles.profPicAndButtonContainer} accessible={true}>
                          <SafeAreaView style={styles.pictureSpace} accessible={true}>
                            <Image
                              source={{
                                uri: this.state.photo,
                              }}
                              style={styles.profileLogo}
                              alt="The users profile picture"
                            />
                          </SafeAreaView>
                        </SafeAreaView>
                        <SafeAreaView style={styles.profileTextInfo} accessible={true}>
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
                      <SafeAreaView style={styles.editButton} accessible={true}>
                        <Button 
                          title="Edit Profile" 
                          onPress={() => {this.props.navigation.navigate("Edit Profile")}}  
                          color="#ef8354"
                          style={styles.editButton}
                          accessibilityRole="button"
                        />
                        <Button 
                          title="Change Photo" 
                          onPress={() => {this.props.navigation.navigate("Take picture")}} 
                          color="#ef8354"
                          accessibilityRole="button"
                        />
                        <Button 
                          title="Manage Posts" 
                          onPress={() => {
                          this.props.navigation.navigate("Manage Posts")}} 
                          color="#ef8354"
                          accessibilityRole="button"
                        />
                      </SafeAreaView>
                    </SafeAreaView>
                  </SafeAreaView>
                      
                  <SafeAreaView accessible={true}>
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
                        accessibilityRole="button"
                      />
                      <Button 
                        title="Save Draft Posts" 
                        onPress={() => {this.props.navigation.navigate("SaveDrafts")}} 
                        color="#ef8354"
                        accessibilityRole="button"
                      />
                      </View>
                    <FlatList
                        data={this.state.listData}
                        renderItem={({item}) => (
                            <View style={styles.postContainer} accessible={true} accessibilityLabel="Your Wall posts">
                              <SafeAreaView style={styles.postAuthorContainer}>
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
                                  accessibilityRole="button"
                                />
                                <Button 
                                  title="Unlike" 
                                  onPress={() => {this.setState({post_Id: item.post_id});this.unlikePost();}} 
                                  color="#ef8354"
                                  accessibilityRole="button"
                                />
                                <Button 
                                  title="Delete post" 
                                  onPress={() => {this.setState({post_Id: item.post_id}); this.removePost();}} 
                                  color="#ef8354"
                                  accessibilityRole="button"
                                />
                              </View> 
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
export default ProfileScreen;


