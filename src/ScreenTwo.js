/**
 * @author Pramodya
 */
import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import {View, Text, StyleSheet, Image, StatusBar, Button} from 'react-native';
import { Card } from 'react-native-paper';
import Header from './Header';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ScreenTwo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor = "#3ca03c" barStyle="light-content"/>
        {/* <Header navigation={() => this.props.navigation.openDrawer()} /> */}

        <View style={{padding: 10, margin: 10}}>
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

        {/* <Button title="Open drawer" onPress={() => this.props.navigation.openDrawer()} /> */}
        <Card style={styles.carddesign}>
          <Text>SELECT MAIN CATEGORY</Text>
        </Card>

        <TouchableOpacity onPress ={() => this.props.navigation.navigate('Home')}>
          <View style={styles.borderdesign} >
            <Image style={styles.imagedesign} source={require('../src/images/fruit.jpg')}  />
            <Text style={styles.textviewdesign2} >Fruits</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress ={() => this.props.navigation.navigate('Home')}>
        <View style={styles.borderdesign} >
          <Image style={styles.imagedesign} source={require('../src/images/vegetable.jpg')}/>
          <Text style={styles.textviewdesign2} >Vegetables</Text>
        </View>
        </TouchableOpacity>
      </View>
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
    width: SCREEN_WIDTH/10*9,
    marginLeft:10,
    marginRight:10,
    paddingRight:10,
    height:200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
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
    // borderWidth: 1,
    // borderColor: "black",
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
  }
});
