import React, { Component } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



// lets have some radio buttons to replace the double buttons

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
    
    this.unsubscribe = this.props.navigation.addListener('focus', () => {  
    this.getData();
    });
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

  clickOnProfile = async () => {
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
            }}
          >
            <Text>Loading..</Text>
          </View>
        );
      }else{
        return (
          <View>
            <FlatList
                  data={this.state.listData}
                  renderItem={({item}) => 
                      (
                      <View style= {styles.postContainer}>
                        <SafeAreaView style={styles.infoContainer}>
                          <Image 
                                style={styles.tinyLogo}
                                source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                          <SafeAreaView style={styles.infoContainer}>
                          <Text style={styles.profileInfo}>
                            {item.user_givenname} {item.user_familyname} {item.user_id.toString()}
                            </Text>
                          </SafeAreaView>
                        </SafeAreaView>
                          <Button 
                            title="Select User" 
                            onPress={() => {this.setState({friendsID: item.user_id}); }} 
                            color='#9075D8'
                          />
                          <Button 
                            title="Go to profile" 
                            onPress={() => {this.clickOnProfile(); 
                            this.props.navigation.navigate("MyFriend's Profile");}} 
                            color='#9075D8'
                          />
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
});  



