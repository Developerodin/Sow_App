import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


import { AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export const Quotations = () => {
    const navigation = useNavigation();

    const handelBack = () => {
        navigation.goBack();
        };

    const handelAccept = () => {
        navigation.navigate("QuotationAccepted");
    };    
  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

   
    <Block style={{padding:15,backgroundColor:"#fff", marginTop:0,borderRadius:10}}>
    <Block >
      <Block style={{ flexDirection: 'row', alignItems: 'center', marginTop: 55 }}>
        <Block style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 150, marginLeft: 0 }}>
          <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={24} style={{ marginLeft: 5 }} color="black" />
        </Block>
        <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '500', flex: 1 }}>Quotations Details</Text>
       
      </Block>
    </Block>
    
             <Block style={{ marginTop: 10 }}>
             <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="people" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 18, marginLeft: 8 ,fontWeight : 600 }}>
              Mr. Xyz
            </Text>
          </Block>

         
          
          <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="document" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 18, marginLeft: 8 ,fontWeight : 600 }}>
              XYZ Metals
            </Text>
          </Block>

          <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/Rupee.png')} style={{height:20,width:20}} />
            <Text style={{ fontSize: 18, marginLeft: 8 ,fontWeight : 700 }}>
                Rate :

             ₹ 33/KG
            </Text>
          </Block>  

          <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="calendar" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 16, marginLeft: 8 ,fontWeight : 500}}>
              11 Nov 2024
            </Text>
          </Block>
          <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="location" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 16, marginLeft: 8 ,fontWeight : 500}}>
              Pickup Location :   Near Dmart, Mahavir Nagar, 302033,Jaipur
            </Text>
          </Block>
         

         <View style={{marginTop: 20 ,paddingHorizontal : 15}}>
          <View style={styles.cardActions}>
              <TouchableOpacity onPress={handelAccept} >
                <View style={styles.acceptButton}>
                <Text style={styles.acceptText}>Accept Offer</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity >
                <View style={styles.declineButton}>
                <Text style={styles.declineText}>Decline</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
          
           
          </Block>

       
         



    




     
    </Block>

    


    

    
    </ScrollView>
   </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#fff",
    padding:10

  },
  text1:{
   fontSize:14,
   color:"#9B9B9B"
  },
  text2:{
      fontSize:16,
      color:"#040404"
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
    padding:10,
    
  },
  modalContainer: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop:10
    
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
      borderColor: "pink",
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
    tableContainer: {
      marginTop : 15,
      paddingRight : 30,
      paddingLeft : 30,
      
    },
  
    tableHeader: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderTopColor: '#000',
      borderTopWidth: 1,
      
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    headerText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#000',
      textAlign: 'center',
    },
    cellText: {
      fontSize: 16,
      color: '#000',
      textAlign: 'center',
      fontWeight : 500
    },
    tableCell: {
      flex: 1,
      paddingVertical: 5,
      borderRightWidth: 0.5,
      borderRightColor: '#000',
      borderLeftWidth: 0.5,
      borderLeftColor: '#000',
    },
    boxContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 10,
    },
    box: {
      width: '25%', // Adjusts the width of each box in the row
      aspectRatio: 1, // Ensures boxes are square
      backgroundColor: '#D3D3D3', // Light grey color
      borderRadius: 8,
    },
    cardActions: {
        flexDirection: "row",
        justifyContent: "space-between",

      },
      acceptButton: {
        flex: 1,
        backgroundColor: "#14B57C",
        paddingVertical: 12,
        borderRadius: 7,
        marginRight: 8,
        alignItems: "center",
        width: width * 0.5,
      },
      acceptText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
      },
      declineButton: {
        flex: 1,
        backgroundColor: "#FF2020",
        paddingVertical: 12,
        borderRadius: 7,
        alignItems: "center",
        width: width * 0.3,
      },
      declineText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
      },
  
    });