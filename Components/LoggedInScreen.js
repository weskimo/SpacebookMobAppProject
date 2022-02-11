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


const Tab = createBottomTabNavigator();

class LoggedInScreen extends Component {
    render(){
      const navigation = this.props.navigation.replace( "LoginScreen" );
      return (
        
        <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Notifications" component={NotificationScreen} />
          <Tab.Screen name="MyFriends" component={FriendListScreen} />
          <Tab.Screen name="Log Out" component={LogOutScreen} />
        </Tab.Navigator>
        
      );
    } 
}
export default LoggedInScreen;