import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';



class editYourProfile extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        }
      }
    
   
        // await AsyncStorage.setItem('@first_name', responseJson.first_name);
        // await AsyncStorage.setItem('@last_name', responseJson.last_name);

        saveData = async () => {
                    await AsyncStorage.setItem('@first_name', this.state.first_name);
                    await AsyncStorage.setItem('@last_name', this.state.last_name);
                    await AsyncStorage.setItem('@email', this.state.email);
                    await AsyncStorage.setItem('@password', this.state.password);
        }
    
        componentDidMount(){
            
            this.getProfileData();
        }

        getProfileData = async () => {

          const value = await AsyncStorage.getItem('@session_token');
          const id = await AsyncStorage.getItem('@user_id');
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
                      first_name: responseJson.first_name,
                      last_name: responseJson.last_name
      
                  })
  
                  this.props.navigation.navigate("Home");
          })
          .catch((error) => {
              console.log(error);
          })
      }
 
    
      patchData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID, {
            method: 'PATCH',
              headers: {
                'X-Authorization':  value,
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            })
            })
            
      }
    

        render(){
            const navigation = this.props.navigation; 
           
          if (this.state.isLoading){
            return (
              <View>
                <Text>Loading..</Text>
                
              </View>
            );
          }else{
            return (
              <View>
                    <Text>First Name: {this.state.first_name}</Text>
                    <Text>Last Name: {this.state.last_name}</Text>
                   <TextInput
                    placeholder="Enter your first name..."
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button title="Change First Name" onPress={() => { this.saveData();this.patchData();}}/>
                 <TextInput
                    placeholder="Enter your last name..."
                    onChangeText={(last_name) => this.setState({last_name})}
                    value={this.state.last_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button title="Change Last Name"onPress={() => { this.saveData();this.patchData();this.getProfileData();}}/>
                 <TextInput
                    placeholder="Enter your email..."
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button title="Change Email"onPress={() => { this.saveData();this.patchData();}}/>
                 <TextInput
                    placeholder="Enter your password..."
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                  <Button title="Change password"onPress={() => { this.saveData();this.patchData();}}/>
              </View>
            );
          }
          
        }
      }

export default editYourProfile;