import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';



class editYourProfile extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          listData: [],
          requestId: ''
        }
    
      }
    
      componentDidMount() {
    
        this.getData();
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }
    
      getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/search", {
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
    

        render(){
           
          
          if (this.state.isLoading){
            return (
              <View>
                <Text>Loading..</Text>
              </View>
            );
          }else{
            return (
              <View>
              </View>
            );
          }
          
        }
      }

export default editYourProfile;