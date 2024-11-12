import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../Images/Logo_1.png";
import Img from "../Images/Onbording.png"
import idCard from "../../assets/idCard.png"

import user from "../../assets/userVector.png"
import file from "../../assets/fileVector.png"
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import {AntDesign} from '@expo/vector-icons';

export const KycEnterGstDeatils = () => {
    const navigation = useNavigation();

    const handelContinue=()=>{
        navigation.navigate("KYCPending")
    }

    const handelBack = () => {
        navigation.navigate("KYC Verification2")
      };

      const customStyle ={
        Card1: {
        
          borderRadius:5,
          padding:10,
          backgroundColor:"#fff",
      
        },
        Card2: {
        
          borderRadius:5,
          padding:10,
          backgroundColor:"#fff",
        
        },
        Card3: {
        
          borderRadius:5,
          padding:10,
          backgroundColor:"#fff",
         
        },
      }

  return (
    <ScrollView style={styles.container}>
    <StatusBar style="dark" />
    <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:55}}>
              
              <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:150,marginLeft:20}}>
             
              <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={24} style={{marginLeft:5}} color="black" />
              </Block>
              

              <Text style={{marginLeft:15,fontSize:25,fontWeight:500}}>Enter your Details</Text>
            
          </Block>
        <View>
      
        <View style={{alignItems:"center",marginTop:150}}>
         <Image
           source={idCard}
           
         />
         </View>

       </View>


       <Block  style={{marginTop:80,padding:20}}>
          <Block >
            <Text style={{fontSize:35,fontWeight:700}}>
                Enter your GST 
            </Text>
            <Text style={{fontSize:35,fontWeight:700}}>
                Number
            </Text>
          </Block>

          <Block style={{marginTop:10}}>
        <Block >
        <Text style={{fontSize:16,marginBottom:20}}>Company info will auto filled using your GST No.</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your GST No."
        //   value={formData.email}
        // onChangeText={(text) => handleInputChange("email", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
        </Block>

           <Block style={{marginTop:30}}>
           <TouchableOpacity
           onPress={handelContinue}
    activeOpacity={0.8}
    style={[
      styles.btn,
      {
        flexDirection:"row",
        backgroundColor: '#14B57C',
        textAlign:"center",
        alignItems:"center"
      },
    ]}
  
    >
    <Text
      style={{
        fontWeight:500,
        fontSize: 20,
        color:"#fff",
      }}>
      Verify
    </Text>
    
  </TouchableOpacity>
           </Block>

           <Block center style={{marginTop:40}}>
        <Text style={{fontSize:16,fontWeight:500,marginLeft:30}}>Need help ?</Text>
       </Block>
       </Block>
       

       
       </ScrollView>
  )
}


const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
    },
    inputContainer: {
      width: '100%',
      // height: 66,
      borderBottomWidth: 1, // Add a bottom border for the input
      borderColor: 'transparent', // Make the border color transparent
    },
    input: {
      // flex: 1,
      // textAlign: "left",
      padding:15,
      fontSize:16,
      borderWidth:1,
      borderRadius:8,
      borderColor:"#A6A6A6",
      width:'100%',
      marginTop:4,
     
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
     width:'100%',
      height: 60,
      borderRadius: 8,
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