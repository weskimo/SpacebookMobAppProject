import React, {Component} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from './NotificationScreen';
import FriendListScreen from './FriendListScreen';
import SearchFriendsScreen from './SearchFriendsScreen';
import ProfileStack from './ProfileStack';
import editYourProfile from './editYourProfile';
import FriendsListStack from './FriendListStack';
import { Camera } from 'expo-camera';


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
  
    this.setState({
      isLoading: false,
    })
    
  }

  componentWillUnmount() {
    this.unsubscribe();
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
          <Tab.Screen name="MyProfile" component={ProfileStack}  />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="MyFriends" component={FriendsListStack} />
          <Tab.Screen name="FindFriends" component={SearchFriendsScreen} />
          
          
        </Tab.Navigator>
        
        
        
      );
    }
    
  }
}



export default HomeScreen;