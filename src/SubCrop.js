/**
 * @author Pramodya
 */
 import React, {Component} from 'react';
 import {View, Text, StyleSheet, TouchableOpacity, Button, StatusBar, Image, FlatList, Dimensions, TextInput, Alert} from 'react-native';
 import axios from 'axios';
import { Card } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";

 const SCREEN_WIDTH = Dimensions.get('window').width;


 export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      arrayData:[]
     };
   }

  componentDidMount(){
    console.log(this.props.route.params.name);

    const mainCrop = { mainCrop: this.props.route.params.name };

    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        axios.post(`https://agrobizz.net/api/subCrop/getByMainCrop`, mainCrop)
        .then(res => {
          this.setState({
            dataSource: res.data.data
          });
        //    console.log(this.state.dataSource['Avocado'].crop_category_id);

          let data = [];

          for (var i = 0; i < this.state.dataSource.length; i++){
            Object.keys(this.state.dataSource[i]).reduce((result, key) => {
                  data.push(
                        {
                          id: i,
                          name: result.concat(this.state.dataSource[i][key].English),
                          crop: this.state.dataSource[i][key].Image
                      }
                  );
                  
                    },[]);
            }
            this.setState({
              arrayData:data
            })
        });
      }else {
        Alert.alert('Connection Failed', 'Please check your Network Connection !');
      }
    });
  }


   render() {
     return (
       <View style={styles.container}>
          <StatusBar backgroundColor = "#3ca03c" barStyle="light-content"/>
          <View style={styles.headerdesign}>
              <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  style={{width:50, height:50}}
                  source ={require('../src/images/menuicon2.png')}
                  />
              </TouchableOpacity>
            <Text style ={styles.title}>Agrobizz</Text>
            <TouchableOpacity>
              <Image
                 style={styles.headericon}
                 source ={require('../src/images/ic_notification.png')}
                 />
            </TouchableOpacity>
          </View>

          {/* {this.rendergetData()} */}

        <View style ={{padding : 10}}>
        <FlatList
        style={{alignSelf:'center'}}
           showsVerticalScrollIndicator={false}
           data={this.state.arrayData}
           renderItem={({ item, index }) => {
               return (
                <TouchableOpacity onPress ={() => this.props.navigation.navigate('Product', {name: item.name})}>
                 <Card style={{marginTop:10}}>
                  <View >
                    <Image source={{uri: item.crop}} style={styles.imagedesign}/>
                    <Text style= {styles.textdescription}>{item.name}</Text>
                  </View>
                </Card>
                </TouchableOpacity>
               );
           }}
           keyExtractor={item => `${item.id}`}
         />
         </View>
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
   },
   boader: {
     borderWidth: 0.7,
     borderColor: "black",
     marginTop: 10,
     borderRadius:5,
   },
   textdescription: {
     paddingTop:8,
     paddingBottom:5,
     paddingLeft:5,
   },
   headerdesign: {
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
    backgroundColor: '#3ca03c',//#0378c5
    justifyContent: 'space-between'
  },
  title:{
    flexDirection: 'row',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color:'white'
  },
  imagedesign:{
    borderTopLeftRadius:2, 
    borderTopRightRadius:2,
    resizeMode: 'cover', 
    width: SCREEN_WIDTH, 
    height: 150,
    marginRight:10,
  },
  headericon:{
    justifyContent: "flex-end",
    width:40, 
    height:40,
  }
 });
 