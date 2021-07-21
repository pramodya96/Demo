/**
 * @author Pramodya
 */
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar
} from "react-native";
import { Card } from 'react-native-paper';

export default class componentName extends Component {

    componentDidMount(){
        // console.log(this.props.route.params.farmer_id);
        // console.log(this.props.route.params.itemdetails.id);
        // const farmer_id = this.props.route.params.itemdetails.id;
        // const farmer_name = this.props.route.params.itemdetails.farmer.name;
        // const farmer_address = this.props.route.params.itemdetails.farmer.address;
        // const main_crop = this.props.route.params.itemdetails.main_crop;
        // const sub_crop = this.props.route.params.itemdetails.sub_crop;
        // const quantity = this.props.route.params.itemdetails.quantity;
        // const req_price = this.props.route.params.itemdetails.requesting_price;
        // const original_price = this.props.route.params.itemdetails.original_price;
        // const farmer_status = this.props.route.params.itemdetails.farmer_accepted;
        // const delivery_type = this.props.route.params.itemdetails.delivery_type;

        this.setState({
            farmer_id: this.props.route.params.itemdetails.farmer_id,
            farmer_name: this.props.route.params.itemdetails.farmer.name,
            farmer_address: this.props.route.params.itemdetails.farmer.address,
            main_crop: this.props.route.params.itemdetails.main_crop,
            sub_crop: this.props.route.params.itemdetails.sub_crop,
            quantity: this.props.route.params.itemdetails.quantity,
            req_price: this.props.route.params.itemdetails.requesting_price,
            original_price: this.props.route.params.itemdetails.original_price,
            farmer_status: this.props.route.params.itemdetails.farmer_accepted,
            delivery_type: this.props.route.params.itemdetails.delivery_type,
        })
    }

    constructor(props) {
        super(props);
        this.state = {
          farmer_id:'',
          farmer_name:'',
          farmer_address:'',
          main_crop:'',
          sub_crop:'',
          quantity:'',
          req_price:'',
          original_price:'',
          farmer_status:'',
          delivery_type:'',
        };
      }

    render() {
        return (
            <View style={styles.container}>
                
                <Card style={{ marginBottom:10,marginTop:10,marginLeft:10,marginRight:10, }}>
                    <Image source={require('../src/images/fruit.jpg')} style={{width:'100%',height:170, justifyContent:'center',borderRadius:5}}/>
                </Card>
                <Card style={styles.view}>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Farmer ID : {this.state.farmer_id}
                    </Text>

                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Farmer Name : {this.state.farmer_name}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Farmer Address : {this.state.farmer_address}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Main Crop : {this.state.main_crop}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Sub Crop : {this.state.sub_crop}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Req Quantity : {this.state.quantity}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Req Price : {this.state.req_price}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Acctual Price : {this.state.original_price}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Farmer Status : {this.state.farmer_status}
                    </Text>
                    <Text style={styles.text}>
                        <Image
                        source={require('../src/images/assets/details.png')} 
                        style={styles.icon}
                        />
                        Delivery Type : {this.state.delivery_type}
                    </Text>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginLeft:3,
    },
    text :{
        paddingTop:5,
        paddingBottom:5,
        // fontWeight: "bold",
        fontSize: 16,
        paddingLeft:10,
    },
    icon: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    view: {
        borderWidth: 0,
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        paddingBottom:15,
        borderColor: 'gray',
    },
});