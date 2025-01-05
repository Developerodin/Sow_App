import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
const { width, height } = Dimensions.get("window");
import Logo from "../Images/Logo_1.png";
import Img from "../Images/Onbording.png";
import kycImage from "../../assets/kycImage.png";
import kycImage2 from "../../assets/kycimage2.png";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Base_url } from "../../Config/BaseUrl";
import { useAppContext } from "../../Context/AppContext";

export const KycVerificationprofile2 = () => {
  const navigation = useNavigation();
const { userDetails,updateProfiletype,setUpdateProfiletype } = useAppContext();
  const handelContinue = () => {
    navigation.navigate("KYC Verification3");
  };

  const handelBack = () => {
    navigation.navigate("Profile");
  };

  const handelSkip = () => {
    navigation.navigate("Profile");
  };

  const getKycDetails = async (userId) => {
   console.log("Getting kyc data...",userId);
    try {
      const response = await axios.get(`${Base_url}b2cUser/kyc/${userId}`);
const data = response.data.data;
console.log("Kyc data==>",data.status);
Alert.alert(
  'KYC Status Update', 
  `Your KYC status is now: ${data.status.charAt(0).toUpperCase() + data.status.slice(1)}.`, 
  [
    { text: 'OK', onPress: () =>  handelBack() }
  ]
);
     
      return response.data; // Return the response data for further usage
    } catch (error) {
       console.log("Error ==>",error)
       
  
      
    }
  };


  useEffect(()=>{
    getKycDetails(userDetails.id);
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Block style={{ padding :20 }}>
      <Block style={{ flexDirection: 'row', alignItems: 'center', marginTop: 55 }}>
        <Block style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 150, marginLeft: 20 }}>
          <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={24} style={{ marginLeft: 5 }} color="black" />
        </Block>
        <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '500', flex: 1 }}>KYC Verification</Text>
        {/* <Block style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#14B57C', borderRadius: 35, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-end' }}>
          <TouchableOpacity onPress={handelSkip} activeOpacity={0.8}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginRight: 2, color: '#fff' }}>Skip</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        </Block> */}
      </Block>
    </Block>
      <View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image source={kycImage} style={{ resizeMode: "contain" }} />
        </View>

        <Block style={{ padding: 10, marginTop: 40 }}>
          <Block style={[styles.Center]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  flexDirection: "row",
                  backgroundColor: "#14B57C",
                  textAlign: "center",
                  alignItems: "center",
                  zIndex: 999,
                },
              ]}
              onPress={handelContinue}
            >
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 20,
                  color: "#fff",
                }}
              >
                Complete KYC
              </Text>
              <AntDesign
                name="right"
                size={20}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </Block>
        </Block>
      </View>
      <Block style={{ position: "absolute", width: width, bottom: 0 }}>
        <Image source={kycImage2} style={{ width: width }} />
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: "transparent", // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign: "center",
    padding: 0,
    fontSize: 22,
    // Remove padding to make it look borderless
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 10,

    textAlign: "left",
    lineHeight: 23,
    letterSpacing: 0.3,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
    width: "100%",
    height: 55,
    borderRadius: 5,
    backgroundColor: "#40A99E",
    justifyContent: "center",
    alignItems: "center",
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
