import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme } from "galio-framework";
const { width, height } = Dimensions.get("window");

import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-native-material/core";

import { Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Base_url } from "../../../Config/BaseUrl";
import { ToastAndroid } from "react-native";
import { useAppContext } from "../../../Context/AppContext";

// import CheckBox from 'react-native-check-box';

export const AccountSettings = () => {
  const navigation = useNavigation();
  const { userDetails } = useAppContext();
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const [isFocused, setIsFocused] = useState({
    ForName: false,
    ForEmail: false,
    ForCity: false,
  });
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const customStyle = {
    Card1: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: "#fff",
      elevation: isFocused.ForName ? 4 : 0,
    },
    Card2: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: "#fff",
      elevation: isFocused.ForEmail ? 4 : 0,
    },
    Card3: {
      borderRadius: 5,
      padding: 10,
      backgroundColor: "#fff",
      elevation: isFocused.ForCity ? 4 : 0,
    },
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handelBack = () => {
    navigation.goBack();
  };


   const getUserData = async () => {
    try {
      const response = await axios.get(`${Base_url}b2cUser/${userDetails.id}`);
      console.log("get user details",response.data );
      
        setFormData({
          email: response.data.email,
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          mobile: response.data.phoneNumber,
        });
     
    } catch (error) {
      console.log(error);
    }
  };

    const updateUserData = async () => {
    setLoading(true);
    try {
      console.log('Form Data being sent:', formData); // Log the formData
      const response = await axios.post(`${Base_url}b2cUser/${userDetails.id}`, formData);
      setLoading(false);
      
      console.log('User data updated successfully =>>>', response.data);
  
      getUserData(); // Refresh the data after update
      ToastAndroid.show("User data updated successfully", ToastAndroid.SHORT);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    // Clean up the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(()=>{
  getUserData();
  },[])

  const handleSubmit = () => {
    updateUserData();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView>
        <View style={{ alignItems: "left", marginTop: 55, width: width }}>
          {!isKeyboardOpen && (
            <Block
              style={{
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Block
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 150,
                  marginLeft: 20,
                }}
              >
                <MaterialIcons
                  onPress={handelBack}
                  name="arrow-back-ios"
                  size={24}
                  style={{ marginLeft: 5 }}
                  color="black"
                />
              </Block>

              <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: 500 }}>
                Account Settings
              </Text>
            </Block>
          )}
        </View>

        <Block style={{ padding: 10 }}>
      <Block style={{ marginTop: 15 }}>
        <Block style={[customStyle.Card1]}>
          <Text style={{ fontSize: 16 }}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formData.firstname}
            onChangeText={(text) => handleInputChange('firstname', text)}
            placeholderTextColor="#B7B7B7"
            editable={!loading}
          />
        </Block>
      </Block>

      <Block style={{ marginTop: 10 }}>
        <Block style={[customStyle.Card1]}>
          <Text style={{ fontSize: 16 }}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formData.lastname}
            onChangeText={(text) => handleInputChange('lastname', text)}
            placeholderTextColor="#B7B7B7"
            editable={!loading}
          />
        </Block>
      </Block>

      <Block style={{ marginTop: 10 }}>
        <Block style={[customStyle.Card2]}>
          <Text style={{ fontSize: 16 }}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholderTextColor="#B7B7B7"
            editable={!loading}
            
          />
        </Block>
      </Block>

      <Block style={{ marginTop: 10 }}>
        <Block style={[customStyle.Card2]}>
          <Text style={{ fontSize: 16 }}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 9876543210"
            value={formData.mobile}
            onChangeText={(text) => handleInputChange('mobile', text)}
            placeholderTextColor="#B7B7B7"
            keyboardType="number-pad"
            editable={false}


          />
        </Block>
      </Block>

      <Block right style={[{ padding: 20, marginTop: 20 }]}>
          
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 15,
              backgroundColor: '#14B57C',
              borderRadius: 10,
              alignItems: 'center',
              
            }}
          >
                 {loading ? (
          <View>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
            <Text style={{ color: '#fff', fontSize: 16 }}>Update</Text>
          )}
          </TouchableOpacity>
      </Block>
    </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  lottie: {
    width: width * 0.9,
    height: width * 0.5,
  },
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign: "left",
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A6A6A6",
    width: width * 0.9,

    marginTop: 4,
    // Remove padding to make it look borderless
  },
 
  btn: {
    width: "95%",
    height: 55,
    borderRadius: 5,
    backgroundColor: "#40A99E",
    justifyContent: "center",
    alignItems: "center",
  },
  
});
