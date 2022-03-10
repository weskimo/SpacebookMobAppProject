import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
    pageContainer: {
      backgroundColor: `#001d3d` , 
      borderWidth: 5,
      borderColor: '#001d3d',
      flex: 1
    },

    profileContainer: {
      backgroundColor: `#ffffff` , 
      borderWidth: 5,
      borderColor: '#001d3d',
    },
  
    buttonColor: {
      color: '#9075D8'
    },
  
    profileInfo: {
      fontSize: 15,
      fontWeight: "bold",
      marginHorizontal: 10
    },
  
    postText: {
      fontSize: 15,
      marginHorizontal: 10
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

    postAuthorContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10,
      alignItems: 'center'
    },

    friendContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginHorizontal: 10,
    }
  });  