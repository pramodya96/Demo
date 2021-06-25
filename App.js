import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Home';
import ScreenTwo from './src/ScreenTwo';
import {View, Text, StyleSheet, TouchableOpacity, Button, StatusBar, Image, SafeAreaView} from 'react-native';

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
       {/* <DrawerContentScrollView {...props}></DrawerContentScrollView> */}
       <View style={{ borderBottomWidth: 1, backgroundColor:'#0378c5' }}>
          <Image style={styles.imagedesign} source={require('./src/images/useravatar.png')} />
          <Text style={styles.headertext}>Pramodya Amarajeewa</Text>
          <Text style={styles.subheadertext}>pramodamarajeewa@gmail.com</Text>
      </View>
     
      <DrawerItemList {...props} />
    {/* </DrawerContentScrollView> */}
    </SafeAreaView>
)};

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName={'S2'} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="S2" component={ScreenTwo}/>
      <Drawer.Screen name="Home" component={Home} />
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
});