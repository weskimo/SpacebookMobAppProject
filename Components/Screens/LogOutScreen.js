import React, { Component } from 'react';
import { Text, ScrollView, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleSheets/SignOut';
import { SafeAreaView } from 'react-native-safe-area-context';

class HomeScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: '',
            errorMsg: ''
        }
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });        
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if(value !== null) {
          this.setState({token:value});
        }else{
            this.props.navigation.navigate('Login');
        }
    }

    logout = async () => {
        let token = await AsyncStorage.getItem('@session_token');
        await AsyncStorage.removeItem('@session_token');
        return fetch('http://localhost:3333/api/1.0.0/logout', {
            method: 'post',
            headers: {
                "X-Authorization": token
            }
        })
        .then((response) => {
            if(response.status === 200){
                this.props.navigation.navigate('Login');
            }else if(response.status === 401){
                this.props.navigation.navigate('Login');
                throw '401! Unauthorized!';
            }else if(response.status === 500){
                this.setState({errorMsg: 'Server Error! Please reload or try again later!'});
                throw 'Server Error! Please reload or try again later!';
            }else{
                throw 'Something went wrong';
            }
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    }

    render(){
        return (
            <ScrollView accessible={true} accessibilityLabel="Logout Screen">
                <SafeAreaView style={styles.loginForm}>
                    <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                        <Image 
                            style={styles.tinyLogo}
                            source={{uri: require("../pics/spacebooklogo.png")}} 
                        />
                    <Text 
                        style={{
                                fontSize:18, 
                                fontWeight:'bold', 
                                padding:5, 
                                margin:5
                                }}
                    >
                        Are you sure you want to Log out?
                    </Text>
                    <SafeAreaView style={styles.buttons}>           
                        <Button
                            title="Yes, Log me out"
                            onPress={() => this.logout()}
                            color="#ef8354"
                            accessibilityRole="button"
                        />
                        <Button
                            title="Back to your profile"
                            color="#ef8354"
                            onPress={() => this.props.navigation.navigate("SpaceBook")}
                            accessibilityRole="button"
                        />
                    </SafeAreaView> 
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default HomeScreen;