import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Home';
import ScreenTwo from './src/ScreenTwo';
import ScreenOne from './src/ScreenOne';
import SubCrop from './src/SubCrop';
import Product from './src/Product';
import Register from './src/Register';
import SplshScreen from './src/SplashScreen';
import {View, Text, StyleSheet, TouchableOpacity, Button, StatusBar, Image, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   return (

    
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }
const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
       <View style={{ borderBottomWidth: 1, backgroundColor:'#3ca03c' }}>
          <Image style={styles.imagedesign} source={require('./src/images/useravatar.png')} />
          <Text style={styles.headertext}>Pramodya Amarajeewa</Text>
          <Text style={styles.subheadertext}>pramodamarajeewa@gmail.com</Text>
      </View>
      <DrawerItemList {...props} />
      {/* <Button
        onPress={() => this.props.navigation.navigate('S2')}
        title="Home"
      /> */}

      <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginBottom:20}}/>
      <View style={styles.logoutbtn}>
        <TouchableOpacity onPress={logout.bind(this)}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
)};

const navigationOptions = {
  drawerLockMode: 'locked-open',
}
const logout = async () => {
  try {
    await AsyncStorage.setItem('login_status', 'false');
    RNRestart.Restart();

    // this.props.navigation.navigate('SplashScreen');
  } catch (e) {
    console.log(e);
  }
}



function MyDrawer() {
  return (
    <Drawer.Navigator edgeWidth={0} initialRouteName={'SplashScreen'} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="S2" component={ScreenTwo}/>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="S1" component={ScreenOne} />
      <Drawer.Screen name="SubCrop" component={SubCrop} />
      <Drawer.Screen name="Product" component={Product} />
      <Drawer.Screen name="Register" component={Register} />
      <Drawer.Screen name="SplashScreen" component={SplshScreen} />
    </Drawer.Navigator>


  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  headertext:{
    color: 'white',
    marginLeft:15,
    fontWeight: 'bold',
    fontSize:17,
  },
  imagedesign:{
    flexDirection: "row",
    width:150,
    height:150,
    marginLeft:15,
  },
  subheadertext:{
    color:'white',
    marginLeft:15, 
    fontSize:10,
    marginBottom:10
  },
  logoutbtn: {
    marginLeft:15,
  }
});