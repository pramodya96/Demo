
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { Card } from 'react-native-paper';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dataSource:[],
         };
       }

    componentDidMount(){
       this.getData();
    }

    async getData(){
        const user_id = { user_id: await AsyncStorage.getItem('id') };

        NetInfo.fetch().then(state => {
          if (state.isConnected === true) {
            axios.post(`https://agrobizz.net/api/agroTrading/liveTrading/getInvoiceByUserId`,user_id)
            .then(res => {
              this.setState({
                dataSource: res.data.data
              });
            //   console.log(this.state.dataSource)
          });
          } else {
            Alert.alert('Connection Failed', 'Please check your Network Connection !');
          }
        });
    }
    render() {
        return (
            <View style={styles.container}>
               <FlatList
                // style={{alignSelf:'center'}}
                showsVerticalScrollIndicator={false}
                data={this.state.dataSource}
                renderItem={({ item, index }) => {
                return (
                <TouchableOpacity onPress ={() => this.props.navigation.navigate('Order', {itemdetails: item})}>
                 <Card style={styles.container}>
                  <View >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.image} source={require('../src/images/agrobizz.png')} />
                        <View>
                            <Text>
                                <Image
                                source={require('../src/images/assets/details.png')} 
                                style={styles.icon}
                                />
                                {item.invoice_no}
                            </Text>
                            <Text style={{color:'black', marginTop:10}}>
                                <Image
                                source={require('../src/images/assets/details.png')} 
                                style={styles.icon}
                                />
                                Products : {item.quantity}
                            </Text>
                        </View>
                    </View>
                    {/* <Text style= {styles.textdescription}>{item.invoice_no}</Text> */}
                  </View>
                </Card>
                </TouchableOpacity>
               );
           }}
           keyExtractor={item => `${item.id}`}
         />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:5,
    },
    image:{ 
        width: 80, 
        height: 80,
        marginLeft:10, 
    },
    icon: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
});