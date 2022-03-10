import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/cameraComponentStyles.js';


class CameraComponent extends Component {
    constructor(props) {
        super(props);


        this.state = {
            hasPermission: null,
            type: Camera.Constants.Type.back,
            errorMsg: ''
        }
    }

    async componentDidMount(){
        const status = await Camera.requestCameraPermissionsAsync();
        this.setState({hasPermission: status});
      }

    sendToServer = async (data) => {
        // Get these from AsyncStorage
        const token = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
  
        let res = await fetch(data.base64);
        let blob = await res.blob();
        
        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/png',
                'X-Authorization': token
            },
            body: blob
        }).then((response) => {
          if(response.status === 200){
              this.setState({errorMsg: 'Your Picture Has Been Successfully Changed!'})
          }else if (response.status === 400){  
          this.setState({errorMsg: 'Bad request Error, Please Try again!'})
          }else if(response.status === 401){
            this.props.navigation.navigate('Login');
          }else if (response.status === 404){  
            this.setState({errorMsg: 'Post Not found?!'})
          }else if (response.status === 500){  
            this.setState({errorMsg: 'Server Error! Please relaod or try again later!'})
          }else{
              throw 'Something went wrong';
          }
      })
        .then((response) => {
            console.log('Picture added', response);
        })
        .catch((err) => {
            console.log(err);
        })
    }
  
      takePicture = async () => {
          if(this.camera){
              const options = {
                  quality: 0.5, 
                  base64: true,
                  onPictureSaved: (data) => this.sendToServer(data)
              };
              await this.camera.takePictureAsync(options); 
          } 
      }


      render(){
        if(this.state.hasPermission){
          return(
            <View 
              style={styles.container}
              accessible={true}
              accessibilityLabel="Camera Screen"
            >
              <View><Text style={{color: "red"}}>{this.state.errorMsg}</Text></View>
              
              <Camera 
                style={styles.camera} 
                type={this.state.type}
                ref={ref => this.camera = ref}
              >
                <View 
                  style={styles.buttonContainer}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.takePicture();
                    }}
                    accessible={true}
                    accessibilityLabel="Take Picture"
                    accessibilityRole="button"
                  >
                    <Text
                       style={styles.text}
                    >
                       Take Photo 
                    </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          );
        }else{
          return(
            <Text>
              No access to camera
            </Text>
          );
        }
      }
    }
export default CameraComponent;