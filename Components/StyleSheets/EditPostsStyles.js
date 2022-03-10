import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    postContainer: {
      backgroundColor: `#ffffff` , 
      borderWidth: 5,
      borderColor: '#001d3d'
    },
  
    postLikes: {
      fontSize: 15,
      fontWeight: "bold",
      marginHorizontal: 10,
      marginVertical: 5,
    },
  
    postText: {
      fontSize: 15,
      marginHorizontal: 10,
      marginVertical: 5,
      
    },

    postTextBorder: {
        borderWidth: 5,
        borderColor: '#001d3d',
    },
    
    infoContainer: {
      flexDirection: 'row',
      alignContent: 'space-around',
      marginVertical: 10,
      marginHorizontal: 10
    },

    postAuthorContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10,
      alignItems: 'center'
    },

    profilePageContainer: {
      backgroundColor: `#001d3d` , 
      borderWidth: 5,
      borderColor: '#001d3d',
    },

    profileLayout: {
      marginHorizontal: 10
    },

    editProfileButton: {
      alignContent: 'space-between'
    },
  
    buttonContainerEdit: {
      flexDirection:'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginHorizontal: 5
    },

    likeAndPostIDContainerEdit: {
      flexDirection:'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginHorizontal: 5
    },
  });  