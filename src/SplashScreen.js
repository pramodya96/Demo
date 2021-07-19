/**
 * @author Pramodya
 */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashScreen extends Component {

    async componentDidMount(){
        const login_status = await AsyncStorage.getItem('login_status')
        setTimeout(() => {
            if(login_status !== null && login_status === 'true') {
                this.props.navigation.navigate('S2');
            }else{
                this.props.navigation.navigate('S1');
            }
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <View >
                    <Image source={require('../src/images/agrobizz.png')} style={{width:150, height:170, marginBottom:70,}}/>
                </View>

                <View style={styles.bottomview}>
                    <View style={ styles.horizontal}>
                        <ActivityIndicator size="large" color="#3ca03c" />
                    </View>
                    <Text style={{color:'black'}}>Powered By </Text>
                    <Image
                        style={{width:90, height:30, resizeMode: 'contain'}}
                        source ={require('../src/images/celata_logo.png')}
                    />
             </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomview: {
        bottom: 0,
        alignItems: 'center',
        paddingLeft:30,
        paddingRight:30,
        justifyContent: 'center',
        marginTop:40,
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
});