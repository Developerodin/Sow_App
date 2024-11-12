import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput,Share } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';
import house from "../../../assets/AtHousehold.png";
import office from "../../../assets/AtOffice.png";
import Shopkeeper from "../../../assets/ATShopKeeper.png";

export const AccountType = () => {
  const navigation = useNavigation();
  const [selectedCard, setSelectedCard] = useState(null);

  // Function to handle card selection
  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };
  
 
const handelBack = ()=>{
  navigation.goBack()
}


  return (
    <View style={styles.container}>
    {/* <Header/> */}
    
    <ScrollView >
     <Block style={{marginTop:0,padding:20}}>
    
      
      <Block style={[styles.Space_Between,{marginTop:60}]}>
      <Block style={{flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
      <AntDesign onPress={handelBack} name="left" size={28} color="black" />

      <Text style={{fontSize:30,fontWeight:500,marginLeft:20}}>Account type</Text>
      </Block>

     
      </Block>
      <Block style={{marginTop:10,flexDirection:'row'}}>
        <Text style={{fontSize:20}}>Select your</Text>

        <Text style={{fontSize:20,fontWeight:'bold',marginLeft:5,color:"#14B57C"}}>preferable account type</Text>
      </Block>
      
     

     <Block style={{marginTop:30}}>
     <TouchableOpacity
     activeOpacity={0.8}
        style={[
          styles.card,
          selectedCard === 'Household' && styles.selectedCard,
        ]}
        onPress={() => handleCardSelect('Household')}
      >
        <Block style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Image source={house}  />
        <Text style={styles.cardText}>Household</Text>
        </Block>

        <Block>
            {
                selectedCard === 'Household' ? <AntDesign name="checkcircle" size={28} color="#14B57C" />
            :
            <AntDesign name="checkcircleo" size={28} color="#CDCDCD" />
            }
        
        
        </Block>
        
      </TouchableOpacity>

      <TouchableOpacity
      activeOpacity={0.8}
        style={[
          styles.card,
          selectedCard === 'Office' && styles.selectedCard,
        ]}
        onPress={() => handleCardSelect('Office')}
      >
        <Block style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={office}  />
        <Text style={styles.cardText}>Office</Text>
        </Block>

        <Block>
            {
                selectedCard === 'Office' ? <AntDesign name="checkcircle" size={28} color="#14B57C" />
            :
            <AntDesign name="checkcircleo" size={28} color="#CDCDCD" />
            }
        
        
        </Block>
      </TouchableOpacity>

      <TouchableOpacity
      activeOpacity={0.8}
        style={[
          styles.card,
          selectedCard === 'Shopkeeper' && styles.selectedCard,
        ]}
        onPress={() => handleCardSelect('Shopkeeper')}
      >
        <Block style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Image source={Shopkeeper}  />
        <Text style={styles.cardText}>Shopkeeper</Text>
        </Block>

        <Block>
            {
                selectedCard === 'Shopkeeper' ? <AntDesign name="checkcircle" size={28} color="#14B57C" />
            :
            <AntDesign name="checkcircleo" size={28} color="#CDCDCD" />
            }
        
        
        </Block>
      </TouchableOpacity>
     </Block>



     
       
     </Block>
     </ScrollView >

  </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
   backgroundColor:"#fff"

  },
  card: {
    width:'100%',
    height: 90,
    padding:20,
    backgroundColor: '#fff',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth:1,
    borderColor: 'transparent', // Default border color
    marginTop:20,
    borderColor:'#B7B7B7'
  },
  selectedCard: {
    borderColor: '#14B57C', // Green border for selected card
  },
  cardText: {
    fontSize: 18,
    fontWeight:500,
    marginLeft:10
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