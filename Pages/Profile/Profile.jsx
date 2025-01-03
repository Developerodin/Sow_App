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
  Share,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileLogo from "../../assets/profileMenu.png";
import { Base_url } from "../../Config/BaseUrl";
import axios from 'axios';

export const Profile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userDetails, setuserDetails] = useState({});
  const {
    CartInStorage,
    CartTotalAmount,
    CartTotalWeight,
    showCartSuggestion,
    setShowCartSuggestion,
  } = useAppContext();
  const ProfileTabs = [
    {
      icon: <Feather name="settings" size={24} color="#0EB77B" />,
      title: "Account Settings",
      link: "AccountSettings",
    },
    {
      icon: <MaterialIcons name="pending-actions" size={24} color="#0EB77B" />,
      title: "Your Orders",
      link: "Orders",
    },
    {
      icon: <AntDesign name="idcard" size={24} color="#0EB77B" />,
      title: "Kyc",
      link: "",
    },
    {
      icon: <FontAwesome name="address-book" size={24} color="#0EB77B" />,
      title: "Manage Address",
      link: "ManageAddress",
    },
    {
      icon: <Entypo name="language" size={24} color="#0EB77B" />,
      title: "Change Language",
      link: "",
    },
    {
      icon: <FontAwesome name="building" size={24} color="#0EB77B" />,
      title: "About Comapny",
      link: "About Company",
    },
    {
      icon: <AntDesign name="infocirlce" size={24} color="#0EB77B" />,
      title: "Terms & Conditions",
      link: "Terms and Condition",
    },
    {
      icon: <MaterialIcons name="privacy-tip" size={24} color="#0EB77B" />,
      title: "Privacy Policy",
      link: "Privacy Policy",
    },

    // {icon:<Foundation name="torso-business" size={28} color="#4854e0" />,title:"Upgrade to business profile",link:"Upgrade Profile"},
  ];

  const getCurrentUser = async () => {
    const user = await AsyncStorage.getItem("userDetails");
    const ParseUser = JSON.parse(user);
    if (user) {
      setuserDetails(ParseUser);
    }
  };

  const deleteAccount = async () => {
    try {
      // Replace 'yourapiurl' with your actual API endpoint URL
      const response = await axios.delete(`${Base_url}b2cUser/${userDetails.id}`);

      // Assuming the response contains a success message
      console.log('Account deleted successfully:', response.data);

      // Clear AsyncStorage
      await AsyncStorage.removeItem("userDetails");
      await AsyncStorage.setItem("Auth", 'false');
      console.log('AsyncStorage cleared successfully');

      // Navigate to login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      // Handle errors
      console.error('Error deleting account:', error.response ? error.response.data : error.message);
    }
  };

  const handelDeleteAccount = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteAccount(),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  const handelBack = () => {
    navigation.goBack();
  };

  const handeClick = (link) => {
    if (link === "About Company") {
      const Data = {
        url: "https://scraponwheels.com/",
      };
      navigation.navigate("Scrap On Wheels", { Data });
      return;
    }

    if (link === "Terms and Condition") {
      const Data = {
        url: "https://www.scraponwheels.com/terms.html",
      };
      navigation.navigate("Scrap On Wheels", { Data });
      return;
    }

    if (link === "Privacy Policy") {
      const Data = {
        url: "https://www.scraponwheels.com/privacy.html",
      };
      navigation.navigate("Scrap On Wheels", { Data });
      return;
    }

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

  const handelLogout = async () => {
    console.log("Log out");
    try {
      await AsyncStorage.removeItem("userDetails");
      await AsyncStorage.setItem("Auth", "false");
      console.log("AsyncStorage cleared successfully");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
    // navigation.navigate("Login")
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handelRateAppliction = () => {
    console.log("handel Rate Appliction");
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

  const handelChangeAccountType = () => {
    navigation.navigate("AccountType");
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header/> */}
      <Block style={[styles.Space_Between, { marginTop: 40,backgroundColor: "#FFF", padding: 20  }]}>
            <Block
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                onPress={handelBack}
                name="left"
                size={28}
                color="black"
              />

              <Text style={{ fontSize: 30, fontWeight: 500, marginLeft: 20 }}>
                Profile
              </Text>
            </Block>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handelChangeAccountType}
              style={{
                marginRight: -20,
                padding: 10,
                backgroundColor: "#D8F5EA",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
              }}
            >
              <Block>
                <AntDesign name="reload1" size={24} color="#14B57C" />
              </Block>

              <Block style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 14, color: "#14B57C" }}>Change</Text>
                <Text style={{ fontSize: 14, color: "#14B57C", marginTop: 2 }}>
                  Account type
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
      <ScrollView>
        <Block style={{ marginTop: 0, backgroundColor: "#FFF", padding: 20 }}>
          

          <Block>
            <Text style={{ fontSize: 24, fontWeight: 500, marginTop: 0 }}>
              Sales Summary
            </Text>
          </Block>
          <Block style={[styles.Space_Around, { marginTop: 10 }]}>
            <Block
              style={{
                width: width * 0.43,
                borderWidth: 1,
                height: 100,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#14B57C",
                borderRadius: 15,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 15 }}>
                Net Amount Earned
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  color: "#14B57C",
                  fontWeight: 500,
                  marginTop: 10,
                }}
              >
                $ 20,000
              </Text>
            </Block>

            <Block
              style={{
                width: width * 0.43,
                borderWidth: 1,
                height: 100,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#14B57C",
                borderRadius: 15,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 15 }}>
                Net Scrap Sold
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  color: "#1A73E8",
                  fontWeight: 500,
                  marginTop: 10,
                }}
              >
                50 Kgs
              </Text>
            </Block>
          </Block>

          <Block style={{ marginTop: 10, padding: 15 }}>
            {ProfileTabs.map((el, index) => {
              return (
                <ProfileCard
                  key={index}
                  Link={el.link}
                  Title={el.title}
                  Img={el.icon}
                  Fun={() => handeClick(el.link)}
                />
              );
            })}

            <ProfileCard
              Title={"Share App"}
              Img={<Entypo name="share" size={24} color="#0EB77B" />}
              Fun={handleShare}
            />
            <ProfileCard
              Title={"Rate the app"}
              Img={<AntDesign name="star" size={24} color="#0EB77B" />}
              Fun={handelRateAppliction}
            />
            <ProfileCard
              Title={"Delete account"}
              Img={<AntDesign name="delete" size={24} color="#0EB77B" />}
              Fun={handelDeleteAccount}
            />
            <Block style={{ marginBottom: 10 }}>
              <ProfileCard
                Title={"Logout"}
                Img={<AntDesign name="logout" size={24} color="#0EB77B" />}
                Fun={handelLogout}
              />
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
