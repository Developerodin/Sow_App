import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
import HamburgerMenu from '../../Components/HamburgerMenu/HamburgerMenu ';
const {width, height} = Dimensions.get('window');


export const Home = () => {
  return (
    <View style={styles.container}>

      <Header/>

      <HamburgerMenu />
    <ScrollView >

      <Block style={{backgroundColor:"#F1F1F1",padding:10}}>

     
      <Block style={{marginTop:30}}>
        <Text style={{fontSize:32,fontWeight:500}}>Hey Vinod!!</Text>
        <Text style={{fontSize:20,fontWeight:400,color:"#797979"}}>Glad to see you Back</Text>
      </Block>

      <Block style={{marginTop:20,borderWidth:1,borderColor:"#DCDCDC",padding:10,backgroundColor:"#FFFFFF"}}>

        <Block>
        <Block style={styles.Space_Between}>
          <Text style={{fontSize:20,fontWeight:400,color:"#767676"}}>My Collection</Text>
          <Text style={{fontSize:18,fontWeight:400,color:"#00BC84"}}>+ ₹ 40,000</Text>
        </Block>

        <Block style={[styles.Space_Between,{marginTop:30,marginBottom:20}]}>
          <Block style={{padding:5,backgroundColor:"#F2FFF9",width:160}}>
            <Text style={{fontSize:14,fontWeight:400,color:"#00BC84"}}>In</Text>
            <Text style={{fontSize:24,fontWeight:400,color:"#00BC84"}}>₹ 45,000</Text>
          </Block>
          <Block style={{padding:5,backgroundColor:"#FFF2F2",width:160}}>
            <Text style={{fontSize:14,fontWeight:400,color:"#BC0000"}}>Out</Text>
            <Text style={{fontSize:24,fontWeight:400,color:"#BC0000"}}>₹ 5,000</Text>
          </Block>
        </Block>
        </Block>
       
      </Block>


      <Block style={{marginTop:30}}>
        <Text style={{fontSize:20,fontWeight:400,color:"#767676"}}>Quick Actions</Text>

        <Block style={[styles.Space_Between,{marginTop:10}]}>
          
            <Button color='black'>+Create Invoice</Button>
         

         
            <Button color='white' style={{borderWidth:1}}>
              <Text style={{fontSize:16,fontWeight:400}}>
              Manage Inventory
              </Text>
            
              </Button>
         
        </Block>
      </Block>

         
      <Block style={{marginBottom:60,marginTop:20,borderWidth:1,borderColor:"#DCDCDC",padding:10,backgroundColor:"#FFFFFF"}}>

<Block>
<Block >
  <Text style={{fontSize:20,fontWeight:400,color:"#767676"}}>Pick-ups for Today</Text>
  <Text style={{fontSize:36,fontWeight:500}}>345</Text>
</Block>

<Block style={[styles.Space_Between,{marginTop:30,marginBottom:20}]}>
  <Block >
    <Text style={{fontSize:20,fontWeight:400,color:"#767676"}}><Text style={{color:"#00BC84"}}>0</Text> Completed</Text>
    <Text style={{fontSize:20,fontWeight:400,color:"#767676",marginTop:10}}><Text style={{color:"#FF1010"}}>345</Text> Remaining</Text>
  </Block>
  <Block >
  <Button color='white' style={{borderWidth:1}}>
              <Text style={{fontSize:16,fontWeight:400}}>
              View All
              </Text>
            
              </Button>
  </Block>
</Block>
</Block>

       </Block>

       </Block>


    </ScrollView>
     
        
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF",

  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: 'transparent', // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign:"center",
    padding:0,
    fontSize:22
     // Remove padding to make it look borderless
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
   width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
      borderWidth: 1,
      borderColor: "blue",
    },
    Center: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    Space_Around: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    Space_Between: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    shadow: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.2,
      elevation: 2,
    },
    button: {
      width: width,
    },

  });