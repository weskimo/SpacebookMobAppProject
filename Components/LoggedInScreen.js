import React, {Component} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from './NotificationScreen';
import FriendListScreen from './FriendListScreen';
import SearchFriendsScreen from './SearchFriendsScreen';


const Tab = createBottomTabNavigator();




class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
      login_info: {}
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  
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
            login_info: responseJson
          })
        })
        .catch((error) => {
            console.log(error);
        })
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };

  render() {

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
        
        
          
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Profile') {
                iconName = focused
                  ? "person-circle-outline"
                  : "person-circle-outline";
              } else if (route.name === 'MyFriends') {
                iconName = focused ? 'people-circle-outline' : 'people-circle-outline';
              } else if (route.name === 'Notifications') {
                iconName = focused ? 'notifications-circle-outline' : 'notifications-circle-outline';
              
              } else if (route.name === 'FindFriends') {
                iconName = focused ? 'person-add-outline' : 'person-add-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Profile" component={ProfileScreen}  />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="MyFriends" component={FriendListScreen} />
          <Tab.Screen name="FindFriends" component={SearchFriendsScreen} />
          
        </Tab.Navigator>
        
        
        
      );
    }
    
  }
}



export default HomeScreen;