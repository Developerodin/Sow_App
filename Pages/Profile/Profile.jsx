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
  Share,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme  } from "galio-framework";
import { Header } from "../../Components/Header/Header";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProfileCard } from "../../Components/Cards/ProfileCard";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from "../../Context/AppContext";
import { TextInput, Button,Wrap,Box } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profileColor = "#96DE20"
export const Profile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const {
    CartInStorage,
    CartTotalAmount,
    CartTotalWeight,
    showCartSuggestion,
    setShowCartSuggestion,
    update
  } = useAppContext();
  const [Address,setAddress] = useState(null);
  const ProfileTabs = [
    {
      icon: <FontAwesome name="address-book" size={22} color={profileColor} />,
      title: "Manage Address",
      link: "Address",
      color: "dark",
    },

    {
      icon: <FontAwesome name="history" size={22} color={profileColor} />,
      title: "Order History",
      link: "Orders",
    },
    {
      icon: <MaterialIcons name="pending-actions" size={23} color={profileColor} />,
      title: "Pending Orders",
      link: "Orders",
    },
    {
      icon: <FontAwesome name="building" size={22} color={profileColor} />,
      title: "About Comapny",
      link: "About Company",
    },
    {
      icon: <AntDesign name="infocirlce" size={21} color={profileColor} />,
      title: "Terms & Conditions",
      link: "Terms and Condition",
    },
    // {
    //   icon: <Foundation name="torso-business" size={22} color={profileColor} />,
    //   title: "Upgrade to business profile",
    //   link: "Upgrade Profile",
    // },
  ];

  const handeClick = (link) => {
    navigation.navigate(link);
  };
  const handelSellScrap = () => {
    navigation.navigate("Schedule Pickup");
  };
  const handelCloseCartInfo = () => {
    if (CartInStorage.length > 0) {
      setTimeout(() => {
        setShowCartSuggestion(true);
      }, 5000);
    }
    setShowCartSuggestion(false);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey there ! I've been using this app, and it's been great. I thought you might like it too. If you sign up using my referral code, we both get 50 rupee credits in our wallets. Here's my referral code: [ICX59908]. Give it a try",
      });
      if (result.action === Share.sharedAction) {
        // Share was successful
        console.log("Shared successfully");
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed/cancelled
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const handelLogout = () => {
    console.log("Log out");
    navigation.navigate("AppSlides");
  };

  const handelRateAppliction = () => {
    console.log("handel Rate Appliction");
  };

  const handelDeleteAccount = () => {
    console.log("Delete Account");
  };

  const showImagePicker = async (sourceType) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      sourceType: sourceType,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const retrieveAddress = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserAddress');
      if (jsonValue !== null) {
        // JSON parse the retrieved value to convert it back to an object
        const address = JSON.parse(jsonValue);
        console.log('Retrieved Address:', address);
        setAddress(address)
        return address;
      } else {
        console.log('No address data found in AsyncStorage.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving address:', error);
      return null;
    }
  };

  useEffect(()=>{
    retrieveAddress();
  },[update])
  return (
    <View style={styles.container}>
      {/* <Header/> */}
      <StatusBar style="dark" />
      <Block style={{marginTop:40, padding: 13}}>
      <Block style={{ flexDirection: "row", alignItem: "center" }}>
            <Block left style={[styles.Center]}>
              <Block>
                {image === null && (
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: 130,
                      height: 170,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: "https://images.unsplash.com/photo-1628563694622-5a76957fd09c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
                    }}
                  />
                )}

                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      resizeMode: "contain",
                      width: 120,
                      height: 170,
                      borderRadius: 10,
                    }}
                  />
                )}
                {/* <Text center style={{fontSize:18,fontWeight:"500",borderWidth:1}}>Ronak Vaya</Text> */}
              </Block>
            </Block>

            <Block
              style={[
                styles.Space_Around,
                { width: width * 0.59, marginTop: 70 },
              ]}
            >
              <Block>
                <Text
                  center
                  style={{ letterSpacing: 2, fontSize: 20, fontWeight: 500 }}
                >
                  45 kgs
                </Text>
                <Text
                  center
                  style={{
                    fontSize: 14,
                    color: "grey",
                    marginTop: 3,
                    letterSpacing: 1,
                  }}
                >
                  Scrap Sold
                </Text>
              </Block>
              <Block>
                <Text
                  center
                  style={{ letterSpacing: 2, fontSize: 20, fontWeight: 500 }}
                >
                  15,000
                </Text>
                <Text
                  center
                  style={{
                    fontSize: 14,
                    color: "grey",
                    marginTop: 3,
                    letterSpacing: 1,
                  }}
                >
                  Earned
                </Text>
              </Block>
            </Block>
          </Block>

          <Block>
            <Block style={[styles.Center, { marginTop: -20, width: 130 }]}>
              <Button
                onPress={() => showImagePicker("camera")}
                title="Ronak"
                color="#fff"
                style={{ width: 100, elevation: 3 }}
                tintColor="black"
              />
            </Block>

            <Block style={{marginTop:25}}>

              <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
              <FontAwesome name="phone" size={20} color="grey" />
              <Text style={{fontSize:14,color:"grey",marginLeft:15}}>+91 9090909090</Text>
              </Block>

              {
                Address  &&
              <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center",marginTop:10}}>
              <FontAwesome5 name="address-card" size={18} color="grey" />
               <Text style={{fontSize:14,color:"grey",marginLeft:12}}>{Address.house},{Address.address} {Address.city} {Address.postalCode} </Text>
             
              
              </Block>
}
            </Block>
          </Block>
      </Block>
      <ScrollView style={{ padding: 10, marginBottom: 70, }}>
        <Block style={{ backgroundColor: "#FFF" }}>
          

          <Block
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "#DCDCDC",
              padding: 15,
              backgroundColor: "#96DE20",
              paddingBottom: 20,
              borderRadius: 7,
              elevation: 2
            }}
          >
            <Block>
              <Block>
                <Text style={{ fontSize: 16 }}>Total Money Earned</Text>
              </Block>
              <Block style={[styles.Space_Between, { marginTop: 10 }]}>
                <Block>
                  <Text style={{ fontSize: 30, fontWeight: 700 }}>
                    ₹ 56,569
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>

          <Block style={{ marginTop: 10 }}>
           
          <Wrap m={4} items="center"  style={{justifyContent:"space-between",alignItems:"center"}}>
            
            {ProfileTabs.map((el, index) => {
              return (
                <Box  key={index} w={width*0.44}>
                <ProfileCard
                 
                  Link={el.link}
                  Title={el.title}
                  Img={el.icon}
                  Fun={() => handeClick(el.link)}
                />
                </Box>
              );
            })}
        
              <Box w={width*0.44}>
            <ProfileCard
              Title={"Share App"}
              Img={<Entypo name="share" size={22} color={profileColor} />}
              Fun={handleShare}
            />
            </Box>
            <Box w={width*0.44}>
            <ProfileCard
              Title={"Rate the app"}
              Img={<AntDesign name="star" size={22} color={profileColor} />}
              Fun={handelRateAppliction}
            />
            </Box>
            <Box w={width*0.44}>
            <ProfileCard
                Title={"Logout"}
                Img={<AntDesign name="logout" size={22} color={profileColor} />}
                Fun={handelLogout}
              />
            </Box>
            </Wrap>
            <Block style={{ marginBottom: 10 }}>
              
               <ProfileCard
              Title={"Upgrade to business profile"}
              Img={<Foundation name="torso-business" size={22} color={"orange"} />}
              Fun={() => handeClick("Upgrade Profile")}
            />
            </Block>
            <Block style={{ marginBottom: 40 }}>
              
               <ProfileCard
              Title={"Delete account"}
              Img={<AntDesign name="delete" size={22} color="crimson" />}
              Fun={handelDeleteAccount}
            />
            </Block>
          </Block>
        </Block>
      </ScrollView>
      {showCartSuggestion && CartInStorage.length > 0 && (
        <Block
          center
          style={{
            position: "absolute",
            bottom: 60,
            elevation: 10,
            borderRadius: 15,
            height: 100,
            backgroundColor: "#fff",
            width: width * 0.9,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#65be34",
          }}
        >
          <Block
            right
            style={{
              width: width * 0.9,
              position: "absolute",
              top: 2,
              right: 5,
            }}
          >
            <Ionicons
              onPress={handelCloseCartInfo}
              name="close-circle"
              size={25}
              style={{ marginLeft: 5 }}
              color="red"
            />
          </Block>
          <Block
            center
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddding: 10,
              width: width * 0.9,
              marginTop: 20,
            }}
          >
            <Block>
              <Block center>
                <Text style={{ fontSize: 16, fontWeight: 500, marginLeft: 10 }}>
                  Total Weight : {CartTotalWeight} Kg
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  {" "}
                  Total Amount : ₹ {CartTotalAmount}
                </Text>
              </Block>
            </Block>

            <Block
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItem: "center",
                },
              ]}
            >
              <Block center>
                <Button
                  color="#65be34"
                  onPress={handelSellScrap}
                  style={{ width: 100, marginRight: 30 }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: 400, color: "#fff" }}
                  >
                    Sell Scraps
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    padding:5,
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
    width: "95%",
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
