import { StyleSheet } from "react-native";

export default StyleSheet.create({
   
        pageContainer: {
            backgroundColor: `#001d3d` , 
            borderWidth: 5,
            borderColor: '#001d3d',
          },

          postContainer: {
            backgroundColor: `#ffffff` , 
            borderWidth: 5,
            borderColor: '#001d3d',
          },

          nameInfo: {
            fontSize: 15,
            fontWeight: "bold",
            marginHorizontal: 5
          },

          textPost: {
            fontSize: 15,
            marginHorizontal: 10,
            marginVertical: 5 
          },

          likeAndPostId: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5
          },

          textInputBox: {
            borderWidth: 2,
            borderColor: '#001d3d'
          },

          textInput: {
              marginHorizontal: 5,
              marginVertical: 10,
          }
    
    });