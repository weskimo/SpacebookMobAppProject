import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import CameraComponent from './CameraComponent';
import EditOnePost from './EditOnePost';
import EditPosts from './EditPosts';
import SaveDrafts from './SaveDrafts';
import EditYourProfile from './EditYourProfile';





const Stack = createNativeStackNavigator();


class ProfileStack extends Component {

    render() {

    const navigation = this.props.navigation;
    return (
       
        <Stack.Navigator initialRouteName="Profile">   
            <Stack.Screen  
                name="Edit Profile" 
                component={EditYourProfile} 
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name="Manage Posts" 
                component={EditPosts} 
            />
            <Stack.Screen
                name="Edit Post"
                component={EditOnePost}
            />
            
            <Stack.Screen 
                name="Take picture" 
                component={CameraComponent} 
            />
            <Stack.Screen
                name="SaveDrafts"
                component={SaveDrafts}
            />
        </Stack.Navigator>           
    )
    }
 }

 export default ProfileStack
