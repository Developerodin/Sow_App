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
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from "../../Components/Header/Header";
import HamburgerMenu from "../../Components/HamburgerMenu/HamburgerMenu ";
import HorizontalScroller from "../../Components/Scroller/HorizontalScroller";
const { width, height } = Dimensions.get("window");
import LottieView from "lottie-react-native";
import { useAppContext } from "../../Context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import paper from "../../assets/Paper.png";
import plastic from "../../assets/Plastic.png";
import metal from "../../assets/Metal.png";
import HomeImg from "../../assets/HomeImg.png";
import { Base_url } from "../../Config/BaseUrl";
import axios from "axios";

export const Home = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);
  const {
    CartInStorage,
    CartTotalAmount,
    CartTotalWeight,
    showCartSuggestion,
    setShowCartSuggestion,
  } = useAppContext();

  const handelSellScrap = () => {
    navigation.navigate("Sell");
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}categories`);
      console.log('Categories:', response.data);
      setCategories(response.data.slice(0, 5)); // Get only the first three categories
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false); // Set loading to false if there is an error
      setError(true); // Set error to true if there is an error
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSell = (categoryName) => {
    navigation.navigate('SellScrap', { categoryName });
  };

  const handelCloseCartInfo = () => {
    // console.log("In home",CartInStorage)
    if (CartInStorage.length > 0) {
      setTimeout(() => {
        setShowCartSuggestion(true);
      }, 5000);
    }
    setShowCartSuggestion(false);
  };
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ backgroundColor: "#FFF", padding: 10 }}>
          <HorizontalScroller />
          <Block style={{ marginTop: 30 ,marginLeft: 5  }}>
            <Text style={{ fontSize: 25, fontWeight: 500, color: "black" }}>
              Sell your Scrap!
            </Text>
            <Block style={{ flexDirection: "row",}}>
              <Text style={{ fontSize: 15,fontWeight: 500 }}>Select your scrap <Text style={{color: "#14B57C"}}>category -</Text></Text>
              
            </Block>
          </Block>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {loading ? (
          <ActivityIndicator size="large" color="#14B57C" style={{alignContent: "center"}}/>
        ) : error || categories.length === 0 ? (
          <Block center style={{ marginTop: 40 }}>
            <Image
              source={require("../../assets/media/5-dark.png")}
              style={{
                width: 300,
                height: 300,
                marginRight: 10,
              }}
            />
          </Block>
        ) : (
          categories.map((category) => (
            <Block
              key={category._id}
              style={styles.categoryBlock}
            >
              <Image source={require("../../assets/Metal.png")} style={{height: 70,width: 70}} />
              <Text style={styles.categoryText}>
                {category.name}
              </Text>
              <TouchableOpacity
                style={styles.sellButton}
                onPress={() => handleSell(category.name)}
              >
                <Text style={{ color: "#14B57C" }}>Sell</Text>
              </TouchableOpacity>
            </Block>
          ))
        )}
          </ScrollView>

          <Block center style={{ marginTop: 30 }}>
            <TouchableOpacity
              style={{ padding: 10, borderWidth: 1, borderRadius: 20 }}
              onPress={handelSellScrap}
              activeOpacity={0.8}
            >
              <Text>View all categories > </Text>
            </TouchableOpacity>
          </Block>

          <Block
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={HomeImg} style={{ width: 387, height: 167 }} />
          </Block>
        </Block>
        <Block style={[styles.bottomContainer]}>
          <Text style={styles.headerText}>Talk to us for free</Text>
          <Text style={styles.consultationText}>Consultation.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
  lottie: {
    width: 150,
    height: 150,
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
  row: {
    flexDirection: "row",
    marginTop: 10, // This will create a row of items
  },
  column: {
    flex: 1, // Each column should take up equal space
    alignItems: "center", // Center items horizontally
    justifyContent: "space-between",
    // Center items vertically
  },
  gridItem: {
    width: 170,
    height: 75,
    backgroundColor: "#fff",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ea5932",
    borderRadius: 10,
  },
  itemText: {
    color: "#ea5932",
    fontSize: 17,
  },
  bottomContainer: {
    marginBottom: 40,
    backgroundColor: "#14B57C", // Close to the color in the image
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,

    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 250,

    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
  consultationText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginTop: 5,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  categoryBlock: {
    width: 140,
    padding: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    marginTop: 15,
  },
  image: {
    width: 70,
    height: 70,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
  },
  sellButton: {
    marginTop: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: "#14B57C",
    height: 25,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
