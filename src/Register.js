/**
 * @author Pramodya
 */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    Dimensions,
    Image,
    Icon,
    TouchableOpacity,
    Button,
    TouchableWithoutFeedback,
    Platform,
    PermissionsAndroid,
    Alert,
    ToastAndroid,
    ActivityIndicator
} from "react-native";
// import { RadioButton } from 'react-native-paper';
import RadioButton from 'react-native-customizable-radio-button';
import Geolocation from '@react-native-community/geolocation';
import RNLocation from 'react-native-location';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const SCREEN_WIDTH = Dimensions.get('window').width;

const options = [
    {
      id: 1, // required
      text: 'male', //required
    },
    {
      id: 2,
      text: 'female',
    },
  ];

export default class Register extends Component {

    // async componentDidMount(){
    //     requestLocationPermission()
    //     Geolocation.getCurrentPosition(info => 
    //         this.setState({
    //             lat:info.coords.latitude
    //         })
    //         );
    //     Geolocation.getCurrentPosition(info => 
    //         // console.log(info.coords.longitude)
    //         this.setState({
    //             lng:info.coords.longitude
    //         })
    //         );
    // }

    ///geo start
    // async  requestLocationPermission(){
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //             'title': 'Agrobizz',
    //             'message': 'Agrobizz access to your location '
    //         }
    //       )
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         alert('This app needs the Location permission');
    //       } else {
    //         alert('Location permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err)
    //     }
    //   }
      
    //    async componentDidMount() {
    //      await this.requestLocationPermission()
    //      Geolocation.getCurrentPosition(info => 
    //         this.setState({
    //             lat:info.coords.latitude
    //         })
    //         );
    //      Geolocation.getCurrentPosition(info => 
    //         // console.log(info.coords.longitude)
    //         this.setState({
    //             lng:info.coords.longitude
    //         })
    //      );
    //     }
    //geo end

    componentDidMount(){
        if (Platform.OS === 'android') {
            this.getPermissions();
        } else {
            this.findCoordinates();
        }
    }

    //validate
    validateData() {

        if (this.state.CustomerName !== '' && this.state.Email !== '' && this.state.NIC !== '' && this.state.Mobile_no !== '' && this.state.Address !== '') {
            // this.setState({ buttonStatus: false })
            console.log("Valid")
        }
        else {
            // this.setState({ buttonStatus: true })
            console.log("invalid")
        }
    }
    //end
    onValueChange = item => {
        this.setState({
            gender:item.text
        })
      };

    constructor(props) {
        super(props);
        this.state = {
          CustomerName:'',
          Email:'',
          NIC:'',
          Mobile_no:'',
          Address:'',
          Location:'',
          Google_address:'',
          gender:'',
          lat: null,
          lng:null,
          isLoading: false,
          validation: true,
        };

        // if (Platform.OS === 'android') {
        //     this.getPermissions()
        // } else {
        //     this.findCoordinates()
        // }
      }

      getPermissions = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => {
          if (data === "already-enabled") {
            this.findCoordinates();
          } else {
            setTimeout(() => {
              this.findCoordinates();
            }, 1000)
          }
        })
      };
    
      findCoordinates = () => {
        Geolocation.getCurrentPosition(
          info => {
            console.log(info);
            this.setState({
                lat:info.coords.latitude
            });
            this.setState({
                lng:info.coords.longitude
            });
          },
          error => {
            console.log(error)
          });
      }

      Register(){
        this.setState({isLoading:true});
        // console.log(this.state.lng +' ' +this.state.lat);
        const CustomerInfo = { 
            customer_Name: this.state.CustomerName,
            address: this.state.Address,
            gender: this.state.gender,
            nic: this.state.NIC,
            mobile: this.state.Mobile_no,
            email: this.state.Email,
            agent_email: 'rasikak73@gmail.com',
            lat: this.state.lat,
            lng: this.state.lng,
        };

        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                    axios.post(`https://www.agrobizz.net/api/customer/create`, CustomerInfo)
                     .then(res => {
                       ToastAndroid.show(res.message, ToastAndroid.SHORT);
                       this.setState({isLoading:false});
                });
            } else {
                Alert.alert('Connection Failed', 'Please check your Network Connection !');
            }
        });
      }

    render() {
        return (
            <SafeAreaView style={styles.centerVerticle}>
                {/* <View style={styles.container}> */}
                <ScrollView>
                    {/* Customer name */}
                    <View style={styles.SectionStyle}>
                        <Image
                         source={require('../src/images/assets/name.png')} 
                         style={styles.ImageStyle}
                        />
                        <TextInput
                         style={{ flex: 1 }}
                         placeholder="Customer Name"
                         underlineColorAndroid="transparent"
                         placeholderTextColor="gray"
                         color="black"
                         value={this.setState.CustomerName}
                         onChangeText={(CustomerName) => this.setState({ CustomerName })}
                         onEndEditing={() => {
                            this.validateData()
                         }}
                        />
                    </View>
                    {/* email */}
                    <View style={styles.SectionStyle}>
                        <Image
                         source={require('../src/images/assets/mail.png')} 
                         style={styles.ImageStyle}
                        />
                        <TextInput
                         style={{ flex: 1 }}
                         placeholder="Email"
                         underlineColorAndroid="transparent"
                         placeholderTextColor="gray"
                         color="black"
                         value={this.setState.Email}
                         onChangeText={(Email) => this.setState({ Email })}
                         onEndEditing={() => {
                            this.validateData()
                         }}
                        />
                    </View>
                    {/* NIC */}
                    <View style={styles.SectionStyle}>
                        <Image
                         source={require('../src/images/assets/nic.png')} 
                         style={styles.ImageStyle}
                        />
                        <TextInput
                         style={{ flex: 1 }}
                         placeholder="NIC number"
                         underlineColorAndroid="transparent"
                         placeholderTextColor="gray"
                         color="black"
                         value={this.setState.NIC}
                         onChangeText={(NIC) => this.setState({ NIC })}
                         onEndEditing={() => {
                            this.validateData()
                         }}
                        />
                    </View>
                    {/* mobile number */}
                    <View style={styles.SectionStyle}>
                        <Image
                         source={require('../src/images/assets/contact.png')} 
                         style={styles.ImageStyle}
                        />
                        <TextInput
                         style={{ flex: 1 }}
                         placeholder="Mobile no"
                         underlineColorAndroid="transparent"
                         placeholderTextColor="gray"
                         color="black"
                         keyboardType='numeric'
                         value={this.setState.Mobile_no}
                         onChangeText={(Mobile_no) => this.setState({ Mobile_no })}
                         onEndEditing={() => {
                            this.validateData()
                         }}
                        />
                    </View>
                    {/* Address */}
                    <View style={styles.SectionStyle}>
                        <Image
                         source={require('../src/images/assets/address.png')} 
                         style={styles.ImageStyle}
                        />
                        <TextInput
                         style={{ flex: 1 }}
                         placeholder="Address"
                         underlineColorAndroid="transparent"
                         placeholderTextColor="gray"
                         color="black"
                         value={this.setState.Address}
                         onChangeText={(Address) => this.setState({ Address })}
                         onEndEditing={() => {
                            this.validateData()
                         }}
                        />
                    </View>

                    {/* location */}
                    {/* Google address */}
                    {/* Gender */}
                    <View style={{borderWidth: 1,borderColor: '#999',borderRadius: 5,margin: 10,}}>
                    <Text style={{position: 'absolute', fontSize: 12, marginLeft:20,}}>Gender</Text>
                        <RadioButton
                         data={options} //required
                         onValueChange={this.onValueChange.bind(this)} //required
                         formStyle ={styles.buttonContainer}
                         circleContainerStyle={styles.circle}
                         labelStyle={{marginRight:30}}
                        />
                        </View>
                    {/*Submit button */}
                    <TouchableOpacity style={{marginTop:10, alignItems: 'center' }} onPress={this.Register.bind(this)} disabled={this.state.validation}>
                        <View style={styles.btndesign}>
                            <Image
                                style={{width:40, height:40,}}
                                source ={require('../src/images/ic_login.png')}
                            />
                            <Text style={{color:'white',}}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                    {/* ResetButton */}
                    
                    {/* progress */}
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {this.state.isLoading && <ActivityIndicator color='red' size="large"/>}
                    </View>
                </ScrollView>
                {/* </View> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 30,
        paddingTop:20
      },
    circle: {
        height: 20,
        width: 20,
        marginRight: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
      },
    centerVerticle: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
});

// export async function requestLocationPermission() 
// {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         'title': 'Agrobizz',
//         'message': 'Agrobizz access to your location '
//       }
//     )
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       alert("This app needs the Location permission");
//     } else {
//       alert("Location permission denied");
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }