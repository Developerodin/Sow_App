import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView,ActivityIndicator,TextInput, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme } from "galio-framework";
const {width, height} = Dimensions.get('window');

import { MaterialIcons } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native';
import { Button } from "@react-native-material/core";

import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { Base_url } from '../../../Config/BaseUrl';
import { ToastAndroid } from "react-native";

import { CategoryAddModel } from '../../../Components/CategoryAddModel/CategoryAddModel';
import { Checkbox } from 'galio-framework';
import { StateSelectModel } from '../../../Components/Model/StateSelectModel';

// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation()
    const [formData, setFormData] = useState({
      
      email: "",
      firstname:"",
      lastname:"",
      referralCode:"",
    
    });
    const [CategoriesData, setCategoriesData] = useState([]);
    const [isFocused, setIsFocused] = useState({
      ForName:false,
      ForEmail:false,
      ForCity:false
    });
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  
    const [termandCondition,setTermandCondition] = useState(false);
  
 
  
    const [loading,setLoading] = useState(false)
    
     const handleAddress = () => {
      navigation.navigate('AddAddress');
    };

    const customStyle ={
      Card1: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForName ? 4 : 0
      },
      Card2: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForEmail ? 4 : 0
      },
      Card3: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForCity ? 4 : 0
      },
    }



    const savePersonalDetails = async () => {
      try {
        const RegisterAs = await AsyncStorage.getItem('RegisterAs') || null;
        const PhoneNumber = await AsyncStorage.getItem('Mobile') || null;
        // const Category = await AsyncStorage.getItem('selectedCategory') || null;
        const categoryNames = selectedCategories.map(category => {
          return {
            name:category.name,
            sub_category:[
              {
                name:"test",
                price:"100",
                unit:"Kg"
              }
            ] 
          }});
        // console.log("categoryNames",categoryNames)
        const Category = JSON.stringify(categoryNames);
        const UserData = {
          firstName: formData.firstname,
          lastName:formData.lastname,
          email: formData.email ,
          phoneNumber: PhoneNumber,
          referralCode:formData.referralCode,
          profileType: 'customer',
        };
        const UserDetails = JSON.stringify(UserData);
        await AsyncStorage.setItem("UserDetails", UserDetails);
        console.log('Details saved successfully.',UserDetails);
        
      } catch (error) {
        console.error('Error saving Details :', error);
      }
    };
    
    const handelPersonalDetailSubmit=()=>{
      const emptyField = Object.keys(formData).find(key => formData[key] === "");
       
      if(!termandCondition){
        ToastAndroid.show(`Please check term and conditions`, ToastAndroid.SHORT);
        return
      }

      if (emptyField) {
        ToastAndroid.show(`Please provide ${emptyField}`, ToastAndroid.SHORT);
        return ;
      }
      SubmitSigupData()
    }

    const SubmitSigupData = async () => {
      console.log("need to do more");
      const PhoneNumber = await AsyncStorage.getItem('Mobile') || null;
      const UserData = {
        firstName: formData.firstname,
        lastName:formData.lastname,
        email: formData.email ,
        phoneNumber: PhoneNumber,
        referralCode:formData.referralCode,
        
      };

      setLoading(true);
      try {
        const response = await axios.post(`${Base_url}b2cUser`, UserData);
        console.log("Response of user ====>", response.data);
        const data = response.data;
            const userId = data.id;
            console.log("Data after submit  ==>", data,userId);
            await AsyncStorage.setItem('userID', userId);
            const UserDetails = JSON.stringify(data);
        await AsyncStorage.setItem("UserDetails", UserDetails);
        
        setLoading(false);
        navigation.navigate('AddAddress', { userId });
        
      } catch (error) {
        console.error('Error submitting data:', error);
        setLoading(false);
      }
    };

    const handleInputChange = (fieldName, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    };



    const handelBack = () => {
      navigation.navigate("Login")
    };


    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardOpen(true);
      });
  
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardOpen(false);
      });
  
      // Clean up the event listeners when the component unmounts
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);



    
    
  return (
    <View style={styles.container}>
    <StatusBar style="dark" />
  
        <ScrollView>
      
       <View style={{alignItems:"left",marginTop:55,width:width}}>
         
       {!isKeyboardOpen &&
         <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
              
              <Block style={{flexDirection:"row",justifyContent:"center",alignItems:"center",borderRadius:150,marginLeft:20}}>
             
              <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={24} style={{marginLeft:5}} color="black" />
              </Block>
              

              <Text style={{marginLeft:15,fontSize:25,fontWeight:500}}>Your Info</Text>
            
          </Block>
}
   
       </View>

        <Block style={{padding:10}}>
        <Block style={{marginTop:15}}>
<Block style={[ customStyle.Card1]}>
          <Text style={{fontSize:16}}>First Name</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter you name"
          value={formData.firstname}
          onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
            
        </Block>

        <Block style={{marginTop:10}}>
<Block style={[ customStyle.Card1]}>
          <Text style={{fontSize:16}}>Last Name</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter you name"
          value={formData.lastname}
          onChangeText={(text) => handleInputChange("lastname", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
            
        </Block>

        {/* <Block style={{marginTop:10,padding:10}}>
<Block style={[{borderBottomWidth:1,borderColor:"grey",flexDirection:"row",alignItems:"center"}]}>
  <Block style={{width:"6%"}}>
  <MaterialCommunityIcons name="gender-male" size={24} color="grey" />
  </Block>
<Block style={{width:"95%"}} >
<Picker
          selectedValue={formData.gender}
          onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
          style={{ color: 'black', height: 50, fontSize: 18,borderWidth:1,borderColor:"red" }}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other"  />
        </Picker>
</Block>

                </Block>
            
        </Block> */}

        <Block style={{marginTop:10}}>
        <Block style={[ customStyle.Card2]}>
        <Text style={{fontSize:16}}>Email Address</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
        </Block>

       



        <Block style={{marginTop:10}}>
        <Block style={[ customStyle.Card2]}>
        <Text style={{fontSize:16}}>Referral Code</Text>
      <TextInput
          style={styles.input}
          placeholder="0000000000"
          value={formData.referralCode}
        onChangeText={(text) => handleInputChange("referralCode", text)}
          placeholderTextColor="#B7B7B7"
        //   value={formData.phoneNumber}
        // onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
                </Block>
        </Block>

        {/* <Block style={{marginTop:10}}>
        <Block style={[ customStyle.Card3]}>
                <TextInput

        variant="standard"
        keyboardType="default"
        label="Address"
        leading={(props) =>  <FontAwesome5 name="address-book" {...props} />}
        value={formData.address}
        onChangeText={(text) => handleInputChange("address", text)}
        color={ 'grey'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:18,letterSpacing:1 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
      <Button
        title="Add Address"
        onPress={handleAddressChange}
        color="#65be34"
      />
                </Block>
        </Block> */}

      
        
      

               

        <Block style={[{flexDirection:"row",justifyContent:"left",alignItems:"center",marginLeft:10}]}>
        <Checkbox
      style={{marginTop:15}}
      color="#14B57C"
      label={"By checking this box, you accept the terms and conditions"}
      initialValue={termandCondition}
        onChange={(el) => {
                console.log("VAlue of checkbox ==>",el)
                setTermandCondition(el)
        }}
      />
        </Block>

       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 20 }]}>
             
                
    <TouchableOpacity onPress={handelPersonalDetailSubmit} style={[styles.btn,{backgroundColor:"#14B57C"}]} activeOpacity={0.8} disabled={loading}>
   {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
    <Text style={{color:"#fff",fontSize:18}}>Next</Text>
    )}
    </TouchableOpacity>
              
            </Block>
      
           
      
       </ScrollView>
       </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
    },
    lottie: {
      width: width * 0.9,
      height: width * 0.5,
    },
    inputContainer: {
      width: '100%',
      height: 66,
      borderBottomWidth: 1, // Add a bottom border for the input
      borderColor: 'transparent', // Make the border color transparent
    },
    input: {
      flex: 1,
      textAlign: "left",
      padding:15,
      fontSize:16,
      borderWidth:1,
      borderRadius:8,
      borderColor:"#A6A6A6",
      width:width*0.9,
      
      marginTop:4
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
     width: '100%',
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