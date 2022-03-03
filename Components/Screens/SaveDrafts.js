import React, { Component } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




class SaveDrafts extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          userId: '',
          first_Name: '',
          last_Name: '',
          text: '',
          tempPost1: '',
          listData: [],
          post_Id: 0, 
          postLikes: 0,
          photo: null,
          errorMsg: "",
          timeItem1: "",
          timeItem2: 0,
          timeItem3: 0,
          timeItem4: 0,
          timeNow: 0,
          tempTime1: "",
          timeTillPost: 0

          
        }
    }

    getDateTimeNow = () => {
        const postTime = new Date().getTime();
        this.setState({timeNow: postTime});
        return postTime;
    }

    scheduleTime = () => {
        //Format July 20, 69 20:17:40 GMT+00:00
        let tempTime1 = this.state.tempTime1;
        const postTime = new Date().getTime();
        this.setState({timeNow: postTime});

        this.setState({
            tempTime1: tempTime1
        })

        const date = new Date({tempTime1})
        const milliseconds = date.getTime();

        const timeTillPost = postTime - milliseconds;

        this.setState({timeTillPost: timeTillPost});
    }

   

    saveDraft = async () => {
        await AsyncStorage.setItem('@savedPost1', this.state.text);
    }
    setPostMessage = () => {
        let tempPost1 = this.state.tempPost1;
        this.setState({
            text: tempPost1
        })
    }

    render() {
        const navigation = this.props.navigation; 
        return (


            <SafeAreaView>
                <Text> Save Drafts Here:</Text>
                <TextInput
                        placeholder="Write you post here.."
                        onChangeText={ value => this.setState({tempPost1: value})}
                        value={this.state.tempPost1}
                        style={{padding:5, borderWidth:1, margin:5}}
                        maxLength={200}
                      />

                <TextInput
                        placeholder="Write time to post at like: 'July 20, 69 20:17:40 GMT+00:00' "
                        onChangeText={ value => this.setState({tempTime1: value})}
                        value={this.state.tempTime1}
                        style={{padding:5, borderWidth:1, margin:5}}
                        maxLength={200}
                      />
                      <Text>{}</Text>
                      <Button 
                        title="Make post" 
                        onPress={() => {this.makePost();}} 
                        color="#ef8354"
                        accessibilityRole="button"
                      />
                      <Button 
                        title="Save Draft Post" 
                        onPress={() => {this.setPostMessage(); this.saveDraft();this.getDateTimeNow();this.scheduleTime();}} 
                        color="#ef8354"
                        accessibilityRole="button"
                      />
                      <Text>{this.state.timeTillPost}</Text>
            </SafeAreaView>

        );
    }

}


export default SaveDrafts;