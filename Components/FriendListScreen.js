import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, TextInput, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';





class FriendListScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      requestId: '',
      friendsID: null
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
    const id = await AsyncStorage.getItem('@user_id');
    return fetch("http://localhost:3333/api/1.0.0/user/" + id  +"/friends", {
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


  setFriendsId = async () => {
          
          await AsyncStorage.setItem('@friendsID', this.state.friendsID);
          
  }


  
    render(){
      const navigation = this.props.navigation; 
      if (this.state.isLoading){
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Loading..</Text>
          </View>
        );
      }else{
        return (
          <View>
            <FlatList
                  data={this.state.listData}
                  renderItem={({item}) => (
                      <View style= {styles.postContainer}>
                        <Text style={styles.profileInfo}>
                          {item.user_givenname} {item.user_familyname} {item.user_id.toString()}
                          </Text>
                          <Button title="Go to profile" onPress={ async () => {this.setState({friendsID: item.user_id}); 
                          await this.setFriendsId().then( this.props.navigation.navigate("MyFriend's Profile"));}} color='#9075D8'/>
                          
                          <Text>{this.state.friendsID}</Text>
                          
                          
                      </View>
                  )}
                  keyExtractor={(item,index) => item.user_id.toString()}
                />
          </View>
        );
      }
    } 
}
export default FriendListScreen;


const styles = StyleSheet.create({
  contentView: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#674AB3',

    width: '100%',
    marginVertical: 20,
  },
  postContainer: {
    backgroundColor: `#FFFFFF` , 
    borderWidth: 5,
    borderColor: '#674AB3'
  },

  profileContainer: {
    backgroundColor: `#FFFFFF` , 
    borderWidth: 5,
    borderColor: '#674AB3'
  },

  buttonColor: {
    color: '#9075D8'
  },
  profileInfo: {
    fontSize: 15,
    fontWeight: "bold"
  }
});  



