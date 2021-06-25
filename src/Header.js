import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Header = ({navigation}) => {
        return (

            <View style ={styles.container}>
               <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                   <Image
                   style={{width:50, height:50}}
                   source ={require('../src/images/menuicon.png')}
                   />
               </TouchableOpacity>
            <Text style ={styles.title}>Header</Text>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderTopWidth:0,
        borderColor: "black",
        paddingTop:1,
        paddingBottom:1,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'gray',
        elevation:5,
        shadowRadius:10,
        backgroundColor: '#0378c5',
    },
    title:{
        flexDirection: 'row',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        color:'white'
    }
  });
  
export default Header;
