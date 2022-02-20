import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';



class editYourProfile extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          
          first_Name: '',
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
            
            
        }
 
    
      patchData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + userID, {
            method: 'patch',
              headers: {
                'X-Authorization':  value
              },
              body: JSON.stringify({
                first_name: this.state.first_Name,
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
                   <TextInput
                    placeholder="Enter your first name..."
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button title="Change First Name" onPress={() => {this.saveData(); this.patchData();}}/>
                 <TextInput
                    placeholder="Enter your last name..."
                    onChangeText={(last_name) => this.setState({last_name})}
                    value={this.state.last_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button title="Change Last Name"onPress={() => {navigation.navigate("Profile")}}/>
                 <TextInput
                    placeholder="Enter your email..."
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button title="Change Email"onPress={() => {navigation.navigate("Profile")}}/>
                 <TextInput
                    placeholder="Enter your password..."
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                  <Button title="Change password"onPress={() => {navigation.navigate("Profile")}}/>
              </View>
            );
          }
          
        }
      }

export default editYourProfile;