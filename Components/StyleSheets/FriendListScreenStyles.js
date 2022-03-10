import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      borderColor: '#674AB3',
      width: '100%',
      marginVertical: 10,
    },

    postContainer: {
      backgroundColor: `#FFFFFF` , 
      borderWidth: 5,
      borderColor: '#674AB3'
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

    tinyLogo: {
      width: 50,
      height: 50,
    },

    infoContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 10
    },
    
    loading: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }
  });  
  