/**
 * @author Pramodya
 */
 import React, {Component} from 'react';
 import {View, Text, StyleSheet, TouchableOpacity, Button, StatusBar, Image, FlatList, Dimensions} from 'react-native';
 import axios from 'axios';
import { Card } from 'react-native-paper';
 
 const data = [
   {id:0, name:'Test 1'},
   {id:1, name:'Test 2'},
   {id:3, name:'Test 3'},
   {id:4, name:'Test 4'},
 ]

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
    // let word = this.props.route.params.name;
    // let formatter = word.slice(1, word.length - 1);
    // console.log(formatter);

    // const majorCategory = { majorCategory: this.props.route.params.name };
    const majorCategory = { majorCategory: 'Fruits' };

    axios.post(`https://agrobizz.net/api/agroTrading/mainCrop/get`, majorCategory)
    .then(res => {
      this.setState({
        dataSource: res.data.data
        // console.log(res.data)
       });
       console.log(this.state.dataSource);

      //  let data = [];

      //  for (var i = 0; i < this.state.dataSource.length; i++){
      //    Object.keys(this.state.dataSource[i]).reduce((result, key) => {
      //          data.push(
      //               {
      //                  id: i,
      //                  name: result.concat(this.state.dataSource[i][key].English)
      //              }
      //          );
      //    // console.log(data[i].name);
      //            },[]);
      //    }
      //    this.setState({
      //      arrayData:data
      //    })

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
            <Text style ={styles.title}>Header</Text>
            <TouchableOpacity>
              <Image
                 style={styles.headericon}
                 source ={require('../src/images/ic_notification.png')}
                 />
            </TouchableOpacity>
          </View>

        <FlatList
        style={{alignSelf:'center'}}
           showsVerticalScrollIndicator={false}
           data={this.state.dataSource}
           renderItem={({ item, index }) => {
               return (
                <TouchableOpacity onPress ={() => this.props.navigation.navigate('SubCrop', {name: item.sub_crop})}>
                 <Card style={{margin:10}}>
                  <View >
                    <Image style={styles.imagedesign} resizeMode={'contain'} source={require('../src/images/download.jpg')}/>
                    <Text style= {styles.textdescription}>{item.main_crop}</Text>
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
    //  alignItems: 'center',
     justifyContent: 'center',
   },
   boader: {
     borderWidth: 0.7,
     borderColor: "black",
     marginTop: 10,
    //  borderBottomRightRadius:20,
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
    borderTopRightRadius:2
  },
  headericon:{
    // flexDirection: "row",
    justifyContent: "flex-end",
    width:40, 
    height:40,
  }
 });
 