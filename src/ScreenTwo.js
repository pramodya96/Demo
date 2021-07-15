/**
 * @author Pramodya
 */
import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import {View, Text, StyleSheet, Image, StatusBar, Button, FlatList} from 'react-native';
import { Card } from 'react-native-paper';
import Header from './Header';
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width;
let data = [];


export default class ScreenTwo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      arrayData:[]
     };
   }

  componentDidMount(){
   this.getData();
  }

  getData(){
    axios.post(`https://agrobizz.net/api/majorCrop/getAll`)
    .then(res => {
      this.setState({
        dataSource: res.data.data
       });
      //  console.log(this.state.dataSource[0].Coconut.English);


      // let data = [];

      for (var i = 0; i < this.state.dataSource.length; i++){
        Object.keys(this.state.dataSource[i]).reduce((result, key) => {
            // console.log(result.concat(this.state.dataSource[i][key].English));
            // let word = result.concat(this.state.dataSource[i][key].English);
            // let formatter = word.slice(1, word.length - 1);

            // console.log(formatter);
            // console.log(result);
            let crop = this.state.dataSource[i][key].Image;
            // let img = this.state.dataSource[i].English.Image;

            console.log(crop);
            
              data.push(
                   {
                      id: i,
                      name: result.concat(this.state.dataSource[i][key].English),
                      crop: this.state.dataSource[i][key].Image
                  }
              );
        // console.log(data[i].name);

                },[]);
        }
        this.setState({
          arrayData:data
        })
        // console.log(this.state.arrayData);
   
    });
  }


  render() {
    // for (var i = 0; i < this.state.dataSource.length; i++){
    //   Object.keys(this.state.dataSource[i]).reduce((result, key) => {
          // console.log(result.concat(this.state.dataSource[i][key].English));
          // return (
          //   <View >
          //   {/* <Text style={{color:'red'}}>{result.concat(this.state.dataSource[i][key].English)}</Text> */}
          //   </View>
          // );
        // }, []);
      // }

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

        <Card style={styles.carddesign}>
           <Text>SELECT MAIN CATEGORY</Text>
         </Card>

      <View style ={{padding : 10}}>
        <FlatList
          style={{alignSelf:'center'}}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item, index }) => {

               return (
                 <TouchableOpacity onPress ={() => this.props.navigation.navigate('Home', {name: item.name})}>
                  <Card style = {{marginTop:5}} >
                    <View >
                      {/* <Image style={styles.imagedesign} resizeMode={'contain'} source={require('https://agrobizz.lk/'+{item.main_image})}/> */}
                      {/* <Image source={{uri: 'https://agrobizz.net/'+item.major_image}} style={styles.imagedesign}/> */}
                      <Image source={{uri: item.crop}} style={styles.imagedesign}/>
                      <Text style = {styles.textdescription}>{item.name}</Text>
                    </View>
                  </Card>
                  </TouchableOpacity>
               );
            }}
            keyExtractor={item => `${item.id}`}
         />
        </View>
      </View>

      // <View>
      // </View>
      // <View style={styles.container}>
      //   <StatusBar backgroundColor = "#3ca03c" barStyle="light-content"/>
      //   {/* <Header navigation={() => this.props.navigation.openDrawer()} /> */}

      //   <View style={styles.headerdesign}>
      //       <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
      //         <Image
      //            style={{width:50, height:50}}
      //            source ={require('../src/images/menuicon2.png')}
      //            />
      //       </TouchableOpacity>
            
      //       <Text style ={styles.title}>Header</Text>

      //       <TouchableOpacity>
      //         <Image
      //            style={styles.headericon}
      //            source ={require('../src/images/ic_notification.png')}
      //            />
      //       </TouchableOpacity>
      //   </View>

      //   {/* <Button title="Open drawer" onPress={() => this.props.navigation.openDrawer()} /> */}
      //   <Card style={styles.carddesign}>
      //     <Text>SELECT MAIN CATEGORY</Text>
      //   </Card>

      //   <TouchableOpacity onPress ={() => this.props.navigation.navigate('Home')}>
      //     <View style={styles.borderdesign} >
      //       <Image style={styles.imagedesign} source={require('../src/images/fruit.jpg')}  />
      //       <Text style={styles.textviewdesign2} >Fruits</Text>
      //     </View>
      //   </TouchableOpacity>

      //   <TouchableOpacity onPress ={() => this.props.navigation.navigate('Home')}>
      //   <View style={styles.borderdesign} >
      //     <Image style={styles.imagedesign} source={require('../src/images/vegetable.jpg')}/>
      //     <Text style={styles.textviewdesign2} >Vegetables</Text>
      //   </View>
      //   </TouchableOpacity>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textviewdesign:{
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding:8,
    shadowRadius: 20,
    shadowOpacity: 0.25,
    shadowColor: 'black',
    margin:10,
  },
  imagedesign:{
    borderTopLeftRadius:2, 
    borderTopRightRadius:2,
    resizeMode: 'cover', 
    width: SCREEN_WIDTH, 
    height: 150,
    marginRight:10,
  },
  borderdesign:{
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    // elevation:3,
  },
  textviewdesign2: {
    marginLeft:10, 
    marginBottom:10, 
    marginTop:10,
    marginRight:10,
    fontWeight:'bold',
    backgroundColor:'#3ca03c',
    color:'white',
    padding:5,
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
    backgroundColor: '#3ca03c',
    justifyContent: 'space-between'
},
  title:{
    flexDirection: 'row',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color:'white'
  },
  carddesign:{
    borderRadius: 0,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    elevation:10,
    marginTop:10,
    padding:10,
  },
  headericon:{
    // flexDirection: "row",
    justifyContent: "flex-end",
    width:40, 
    height:40,
  },
   boader: {
    borderWidth: 0,
    // borderColor: "black",
    marginTop: 10,
   //  borderBottomRightRadius:20,
    borderRadius:5,
  },
  textdescription: {
    paddingTop:8,
    paddingBottom:5,
    paddingLeft:25,
    fontSize: 15
  },
});
