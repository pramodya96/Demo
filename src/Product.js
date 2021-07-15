/**
 * @author Pramodya
 */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Modal,
    Pressable,
    Alert,
    TextInput,
    Dimensions,
    ActivityIndicator,
    ToastAndroid
} from "react-native";
import { Card } from 'react-native-paper';
import { Icon, SearchBar, Header} from 'react-native-elements'
import { TouchableOpacity } from "react-native";
// import ModalBox from 'react-native-modal';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width;

const data = [
    {label: 'on_delivery', value: '1'},
];

export default class componentName extends Component {

    componentDidMount(){
        const subCrop = { subCrop: this.props.route.params.name };
        axios.post(`https://agrobizz.net/api/agroTrading/farmerDetailsBySubCrop/get`, subCrop)
        .then(res => {
          this.setState({
            dataSource: res.data.data,
            harvestinginfo: res.data.farmerHarvestingDetails,
            location:res.data.farmerHarvestingDetails[0].location_name,
            DSD:res.data.farmerHarvestingDetails[0].farmer.dsd,
            GND:res.data.farmerHarvestingDetails[0].farmer.gnd,
            image:res.data.farmerHarvestingDetails[0].image
           });
           console.log(this.state.harvestinginfo[0].location_name);
        });
      }

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          modalVisible: false,
          dataSource:[],
          harvestinginfo:[],
          location:'',
          DSD:'',
          GND:'',
          image:'',
        };
      }

    // state = {
    //     modalVisible: false,
    //   };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }


    saveData() {
        console.log(this.state.qty +" " + this.state.price+ " " +this.state.delivert_type);
        // this.setModalVisible(false);
        this.setState({isLoading:true});

        const items = { 
            farmer_id: 'FRMR34_AG3',
            harvesting_id: '5',
            user_id: '1',
            address: 'Tissamaharama',
            quantity: this.state.qty,
            requesting_price: this.state.price,
            delivery_type: this.state.delivert_type,
        };

        axios.post(`https://agrobizz.net/api/agroTrading/liveTrading/addNew`, items)
        .then(res => {
            // console.log("message : " + JSON.stringify(res));
            console.log(res.data.message);
            ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            this.setState({isLoading:false});
            this.setModalVisible(false);
            
        });
      }
    // state = {
    //     search: '',
    //   };
    
    //   updateSearch = (search) => {
    //     this.setState({ search });
    //   };

    render() {

        const { modalVisible } = this.state;
        // const { search } = this.state;
      

        return (
            <View style={styles.container}>
                {/* <Header
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                /> */}
               <View style={styles.carddesign2} >
                   <View style={styles.view}>
                        <Image style={{width:30, height:30}}  source={require('../src/images/icon.png')}/> 
                        <Text >AVAILABLE STOCK DETAILS</Text>
                    </View>
                </View>

                <Card style={styles.carddesign}>
                    {/* <Image style={styles.image} resizeMode={'contain'} source={require('../src/images/vegetable.jpg')}/> */}
                    <Image source={{uri: 'https://agrobizz.net/'+this.state.dataSource.main_image}} style={styles.imagedesign}/>
                </Card>

                <Card style={styles.carddesign} >
                   <View style={{margin:10}}>
                        <Text> CATEGORY: {this.state.dataSource.main_crop}</Text>
                        <Text> PRODUCT: {this.state.dataSource.sub_crop}</Text>
                    </View>
                </Card>

                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                    <Card style={styles.carddesign} >
                        <View>
                            {/* <Image style={styles.image} resizeMode={'contain'} source={require('../src/images/download.jpg')}/> */}
                            <Image source={{uri: 'https://agrobizz.net/'+this.state.image}} style={styles.imagedesign}/>
                            <Text style={{marginTop:10, marginStart:10}}> Location: {this.state.location}</Text>
                            <Text style={{marginTop:10, marginStart:10}}> DSD: {this.state.DSD}</Text>
                            <Text style={{marginTop:10, marginStart:10, marginBottom:10}}> GNS: {this.state.GND} </Text>
                        </View>
                    </Card>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                    }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Buyer Order</Text>
                        <Text>Farmer Name : CelaTa Farmer Test</Text>
                        <Text>Main Crop : Mango</Text>
                        <Text styles={{marginBottom:30}}>Sub Crop : Karthakolomban</Text>

                        <TextInput
                            style={styles.inputText}
                            placeholder="Quantity"
                            placeholderTextColor="gray"
                            color="black"
                            keyboardType='numeric'
                            value={this.setState.qty}
                            onChangeText={(qty) => this.setState({ qty })}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder="Requesting Price"
                            placeholderTextColor="gray"
                            color="black"
                            keyboardType='numeric'
                            value={this.setState.price}
                            onChangeText={(price) => this.setState({ price })}
                        />

                        <Dropdown
                            style={styles.dropdown}
                            containerStyle={styles.shadow}
                            data={data}
                            search
                            searchPlaceholder="Search"
                            labelField="label"
                            valueField="value"
                            label="Dropdown"
                            placeholder="Delivery Type"
                            placeholderTextColor="gray"
                            value={this.setState.delivert_type}
                            onChange={item => {
                                this.setState({
                                    delivert_type: item.label
                                })
                            }}
                            renderLeftIcon={() => (
                                <Image style={styles.icon} source={require('../src/images/menuicon2.png')} />
                            )}
                            // renderItem={item => _renderItem(item)}
                            textError="Error"
                />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.saveData()}
                        >
                        <Text style={styles.textStyle}>Order now</Text>
                        </Pressable>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {this.state.isLoading && <ActivityIndicator color='red' size="large"/>}
                    </View>
                </View>
                </Modal>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    carddesign:{
        borderRadius: 0,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        elevation:10,
        marginTop:10,
        // padding:10,
        flexDirection:'row',
      },
      image:{
        alignSelf:'center'

      },
      container2: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      carddesign2:{
        borderRadius: 0,
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
        elevation:5,
        marginTop:10,
        paddingBottom:20,
        paddingTop:20,
        flexDirection:'row',
        width:'100%',
      },
      view:{ 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft:20
        }, 
     //<---------------------popup menu styles-------------------------->
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop:30
    },
    
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingLeft:20,
        paddingRight:20
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold'
    },
    inputText: {
        height: 40,
        marginLeft: 12,
        marginRight:12,
        marginTop:15,
        borderWidth: 1,
        width:300,
        borderRadius:5,
        paddingLeft:10,
        fontSize: 17,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
        width:300,
    },
    //<----------------------popup menu styles end------------------>
    imagedesign:{
        borderTopLeftRadius:2, 
        borderTopRightRadius:2,
        resizeMode: 'cover', 
        width: '100%', 
        height: 150,
        marginRight:10,
        
      },
});