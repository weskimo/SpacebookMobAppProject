import React, { Component } from 'react';
import { View, Text, Button, TextInput} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationScreen from './NotificationScreen';
import FriendListScreen from './FriendListScreen';
import ProfileScreen from './ProfileScreen';
import LogOutScreen from './LogOutScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchFriendsScreen from './SearchFriendsScreen';


const Tab = createBottomTabNavigator();

class LoggedInScreen extends Component {
    render(){
      const navigation = this.props.navigation.replace( "LoginScreen" );
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
            } else if (route.name === 'LogOut') {
              iconName = focused ? 'close-circle-outline' : 'close-circle-outline';
            } else if (route.name === 'FindFriends') {
              iconName = focused ? 'person-add-outline' : 'person-add-outline';
            }

            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="MyFriends" component={FriendListScreen} />
          <Tab.Screen name="FindFriends" component={SearchFriendsScreen} />
          <Tab.Screen name="LogOut" component={LogOutScreen} />
        </Tab.Navigator>
        
      );
    } 
}
export default LoggedInScreen;