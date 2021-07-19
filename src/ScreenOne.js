/**
 * @author Pramodya
 */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,TextInput,Image,Button,Dimensions,Alert,TouchableOpacity,Icon,ToastAndroid
} from "react-native";
import Strings from '../src/essentials/Strings';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class componentName extends Component {

    componentDidMount(){
        this.CheckLoginInfo();
    }

    async Login() {
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
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

                            const id = responseJson.user.id.toString();
                            const useremail = responseJson.user.email;
                            const name = responseJson.user.name;
                            const role = responseJson.user.role;
                            // const status = true;


                            if (responseJson.message === 'login_successful'){
                                this.saveUserLoginInfo(id, useremail, name, role);  //save user info
                                this.props.navigation.navigate('S2');
                            } else {
                                // Alert.alert('Login Failed', responseJson.message);
                                this.AlertMessage('Login Failed', responseJson.message);
                            }
                        } else {
                            // Alert.alert('Login Failed', 'Username and Password is Incorrect !');
                            this.AlertMessage('Login Failed', 'Username and Password is Incorrect !');
                        }
                    })
                    .catch((error) => {
                        // Alert.alert('Login Failed', 'Username and Password is Incorrect !');
                        this.AlertMessage('Login Failed', 'Username and Password is Incorrect !');
                    });
            } else {
                    // Alert.alert('Connection Failed', 'Please check your Network Connection !');
                    this.AlertMessage('Connection Failed', 'Please check your Network Connection !');
            }
        });
    }

    AlertMessage = (title,message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    async saveUserLoginInfo(id, mail, name, role){
        try {
            await AsyncStorage.setItem('mail', mail);
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('id', id);
            await AsyncStorage.setItem('role', role);
            await AsyncStorage.setItem('login_status', 'true');
        }
        catch (e){
            console.error(e);
        }
    }

    //  async storage data testing//////////////////////////
    async CheckLoginInfo(){
        try {
            const value = await AsyncStorage.getItem('mail')
            const name = await AsyncStorage.getItem('name')
            const id = await AsyncStorage.getItem('id')
            const login_status = await AsyncStorage.getItem('login_status')
            if(login_status !== null && login_status === 'true') {
                console.log(login_status);
                this.props.navigation.navigate('S2');
            }
        }  catch (e){
            console.error(e);
        }
    }
    //  async storage data testing end//////////////////////////

    render() {
        return (
        <View style = {{alignItems:'center', margin:20}}>
            <Image source={require('../src/images/agrobizz.png')} style={{width:150, height:170, marginBottom:70,}}/>

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

            <TouchableOpacity style={{marginTop:10}} onPress ={() => this.props.navigation.navigate('Register')}>
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

            <View style={styles.bottomview}>
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
    },
    bottomview: {
        bottom: 0,
        alignItems: 'center',
        width:SCREEN_WIDTH*0.9,
        paddingLeft:30,
        paddingRight:30,
        justifyContent: 'center',
        marginTop:40,
    }
});