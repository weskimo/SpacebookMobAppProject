import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    contentView: {
        flex: 1,
      },
      buttonsContainer: {
        flexDirection: 'row',
        borderColor: '#001d3d',
        justifyContent: 'space-around',
        
        width: '100%',
        marginVertical: 10,
        marginHorizontal: 10
      },
      postContainer: {
        backgroundColor: `#FFFFFF` , 
        borderWidth: 5,
        borderColor: '#001d3d'
      },
    
      profileContainer: {
        backgroundColor: `#FFFFFF` , 
        borderWidth: 5,
        borderColor: '#001d3d'
        
      },
    
      buttonColor: {
        color: '#9075D8'
      },
    
      profileInfo: {
        fontSize: 15,
        fontWeight: "bold",
        
      },
    
      postText: {
        fontSize: 15,
        marginHorizontal: 10,
        marginVertical: 20
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
    likesText: {
      fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 10
    }
    });  