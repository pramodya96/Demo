/**
 * @author Pramodya
 */
import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import {View, Text, StyleSheet, Image, StatusBar, Button} from 'react-native';
import Header from './Header';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ScreenTwo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor = "#0378c5" barStyle="light-content"/>
        {/* <Header navigation={() => this.props.navigation.openDrawer()} /> */}

        <View style={styles.headerdesign}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Image
                 style={{width:50, height:50}}
                 source ={require('../src/images/menuicon2.png')}
                 />
            </TouchableOpacity>
            <Text style ={styles.title}>Header</Text>
        </View>

        {/* <Button title="Open drawer" onPress={() => this.props.navigation.openDrawer()} /> */}
        <Text style={styles.textviewdesign}>SELECT MAIN CATEGORY</Text>

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
  },
  textviewdesign2: {
    marginLeft:10, 
    marginBottom:10, 
    marginTop:10,
    marginRight:10,
    fontWeight:'bold',
    backgroundColor:'#0378c5',
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
    backgroundColor: '#0378c5',
},
  title:{
    flexDirection: 'row',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color:'white'
  }
});
