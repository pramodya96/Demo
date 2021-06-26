/**
 * @author Pramodya
 */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,TextInput,Image,Button,Dimensions,NetInfo,Alert,TouchableOpacity,Icon,ToastAndroid
} from "react-native";
import { color } from "react-native-elements/dist/helpers";
import Strings from '../src/essentials/Strings';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class componentName extends Component {

      Login() {
        // console.log(this.state.email);
        // NetInfo.isConnected.fetch().then(isConnected => {
        //     if (isConnected === true) {
                fetch(Strings.BaseUrl+'api/user/login?email=' + this.state.email + '&password=' + this.state.password, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })

                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson != null) {
                            this.setState({
                                clientData: responseJson
                            });
                            console.log("Login : " + JSON.stringify(responseJson.message));
                            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);

                            if(responseJson.message == 'login_successful'){
                                this.props.navigation.navigate('S2');
                            }
                            
                        } else {
                            Alert.alert("Login Failed", "Username and Password is Incorrect !");
                        }
                    })

                    .catch((error) => {
                        Alert.alert("Login Failed", "Username and Password is Incorrect !");
                    });
            // } else {
            //     //this.connectionError();
            //     Alert.alert("Connection Failed", "Please check your Network Connection !");
            // }
        };

    render() {
        return (
        <View style = {{alignItems:'center', margin:20}}>
            <Image source={require('../src/images/useravatar.png')} style={{width:150, height:170, marginBottom:70,}}/>

            <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            color="black"
            value={this.setState.email}
            onChangeText={(email) => this.setState({ email })}
            keyboardType='email-address'
            />

            <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
            color="black"
            value={this.setState.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            />

            {/* <View style={{marginTop:20}}>
                <Button
                style = {styles.btndesign}
                title="signin"
                onPress={this.Login.bind(this)}
                />
            </View> */}

            <TouchableOpacity style={{marginTop:10, }} onPress={this.Login.bind(this)}>{/* this.Login.bind(this) */}
             <View style={styles.btndesign}>
             <Image
                   style={{width:40, height:40,}}
                   source ={require('../src/images/ic_login.png')}
                   />
                <Text style={{color:'white',}}>SIGN IN</Text>
             </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:10}} >
             <View style={styles.btndesign}>
             <Image
                   style={{width:40, height:40,}}
                   source ={require('../src/images/ic_register.png')}
                   />
                <Text style={{color:'white'}}>REGISTER ME</Text>
             </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:10}} >
             <View style={styles.btndesign}>
             <Image
                   style={{width:40, height:40,}}
                   source ={require('../src/images/ic_home.png')}
                   />
                <Text style={{color:'white'}}>HOME</Text>
             </View>
            </TouchableOpacity>

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
    input: {
        height: 50,
        marginLeft: 12,
        marginRight:12,
        marginTop:10,
        borderWidth: 1,
        width:SCREEN_WIDTH*0.9,
        borderRadius:5,
        paddingLeft:10,
        fontSize: 17,
    },
    btndesign:{
        backgroundColor:'#3ca03c',
        paddingBottom:0,
        paddingTop:0,
        alignItems: 'center',
        width:SCREEN_WIDTH*0.9,
        paddingLeft:30,
        paddingRight:30,
        borderRadius:5,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});