/**
 * @author Pramodya
 */
 import React, {Component} from 'react';
 import {View, Text, StyleSheet, TouchableOpacity, Button, StatusBar, Image, FlatList, Dimensions} from 'react-native';
 
 const data = [
   {id:0, name:'Test 1'},
   {id:1, name:'Test 2'},
   {id:3, name:'Test 3'},
   {id:4, name:'Test 4'},
 ]

 const SCREEN_WIDTH = Dimensions.get('window').width;

 export default class Home extends Component {
   render() {
     return (
       <View style={styles.container}>
          <StatusBar backgroundColor = "#0378c5" barStyle="light-content"/>
    
          <View style={styles.headerdesign}>
               <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                   <Image
                   style={{width:50, height:50}}
                   source ={require('../src/images/menuicon2.png')}
                   />
               </TouchableOpacity>
            <Text style ={styles.title}>Header</Text>
            </View>
            {/* <Button title="Open drawer" onPress={() => this.props.navigation.navigate('S2')} /> */}

        <FlatList
        style={{alignSelf:'center'}}
           showsVerticalScrollIndicator={false}
           data={data}
           renderItem={({ item, index }) => {
               return (
                 <View style= {styles.boader}>
                   <Image style={styles.imagedesign} resizeMode={'contain'} source={require('../src/images/download.jpg')}/>
                  <Text style= {styles.textdescription}>{item.name}</Text>
                  </View>
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
    backgroundColor: '#0378c5',
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
  }
 });
 