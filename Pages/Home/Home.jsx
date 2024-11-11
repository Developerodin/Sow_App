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
export const Home = () => {
  const navigation = useNavigation();
  const animationRef = useRef(null);
  const {
    CartInStorage,
    CartTotalAmount,
    CartTotalWeight,
    showCartSuggestion,
    setShowCartSuggestion,
  } = useAppContext();

  const handelSellScrap = () => {
    navigation.navigate("Schedule Pickup");
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
      <StatusBar  style="dark"/>
      <Header />
      <ScrollView>
        <Block style={{ backgroundColor: "#FFF", padding: 10 }}>
          <HorizontalScroller />
          <Block style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: 500, color: "#4b4b4b" }}>
              Hey Vinod !!
            </Text>

            <Block style={[{ marginTop: 10 }, styles.Space_Between]}>
              <Block>
                <Text
                  style={{ fontSize: 14, color: "#797979", letterSpacing: 1 }}
                >
                  Let’s Save Environment &
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#797979",
                    letterSpacing: 1,
                    marginTop: 5,
                  }}
                >
                  Make Some Money
                </Text>
              </Block>

              <Block>
                <Button color="white" style={{ borderWidth: 1, width: 120 }}>
                  <Text style={{ fontSize: 16, fontWeight: 400 }}>
                    Sell Scraps
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>

          <Block
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "#DCDCDC",
              padding: 10,
              backgroundColor: "#96DE20",
              paddingBottom: 20,
              borderRadius: 7,
              elevation: 2,
            }}
          >
            <Block>
              <Block>
                <Text style={{ fontSize: 16 }}>We Buy</Text>
              </Block>
              <Block style={[styles.Space_Between, { marginTop: -10 }]}>
                <Block>
                  <Text style={{ fontSize: 30, fontWeight: 700 }}>
                    Over 10 +
                  </Text>
                </Block>

                <Block>
                  <Button color="white" style={{ width: 120 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400 }}>
                      Sell Scraps
                    </Text>
                  </Button>
                </Block>
              </Block>

              <Block>
                <Text style={{ fontSize: 16 }}>Types of Scrap</Text>
              </Block>
            </Block>
          </Block>

          <Block style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              Latest from Us
            </Text>

            <Block
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Image
                style={{ width: "100%", height: 200 }}
                source={{
                  uri: "https://img.freepik.com/premium-vector/mega-sale-discount-banner-set-promotion-with-yellow-background_497837-702.jpg",
                }}
              />
            </Block>
          </Block>

          <Block style={{ marginTop: 30 }}>
            <Block style={styles.Space_Between}>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                Scrap Categories
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 500, color: "#00a56a" }}>
                View All
              </Text>
            </Block>

            <Block style={{ marginTop: 10 }}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Block style={styles.gridItem}>
                    <Text style={styles.itemText}>Metal</Text>
                  </Block>
                </View>
                <View style={styles.column}>
                  <Block style={styles.gridItem}>
                    <Text style={styles.itemText}>Metal</Text>
                  </Block>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Block style={styles.gridItem}>
                    <Text style={styles.itemText}>Metal</Text>
                  </Block>
                </View>
                <View style={styles.column}>
                  <Block style={styles.gridItem}>
                    <Text style={styles.itemText}>Metal</Text>
                  </Block>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Block style={styles.gridItem}>
                    <Text style={styles.itemText}>Metal</Text>
                  </Block>
                </View>
                <View style={styles.column}>
                  <Block style={styles.gridItem}>
                    <Text style={styles.itemText}>Metal</Text>
                  </Block>
                </View>
              </View>
            </Block>
          </Block>

          <Block
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "#DCDCDC",
              padding: 10,
              backgroundColor: "#3333ef",
              paddingBottom: 20,
              borderRadius: 7,
              elevation: 2,
            }}
          >
            <Block>
              <Block>
                <Text style={{ fontSize: 16, color: "#fff" }}>We Give</Text>
              </Block>
              <Block style={[styles.Space_Between, { marginTop: -10 }]}>
                <Block>
                  <Text
                    style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}
                  >
                    Max Price
                  </Text>
                </Block>

                <Block>
                  <Button color="white" style={{ width: 120 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400 }}>
                      Sell Scraps
                    </Text>
                  </Button>
                </Block>
              </Block>

              <Block>
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  For Your Scrap
                </Text>
              </Block>
            </Block>
          </Block>

          <Block
            style={{
              marginBottom: 60,
              marginTop: 30,
              borderWidth: 2,
              padding: 20,
              backgroundColor: "#FFFFFF",
              paddingBottom: 60,
              borderRadius: 10,
            }}
          >
            <Block style={styles.Space_Between}>
              <Block style={{ height: 200 }}>
                <Text style={{ fontSize: 30, fontWeight: 500 }}>Trash</Text>
                <Text style={{ fontSize: 30, fontWeight: 500, color: "grey" }}>
                  ko kro
                </Text>
                <Text style={{ fontSize: 30, fontWeight: 500 }}>Cash</Text>
                <Block style={{ marginTop: 10 }}>
                  <Button
                    color="white"
                    style={{
                      borderWidth: 1,
                      height: 80,
                      borderBottomWidth: 5,
                      marginLeft: -3,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 400 }}>
                      Within
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: 500 }}>
                      24 Hours
                    </Text>
                  </Button>
                </Block>
              </Block>

              <Block
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LottieView
                  ref={animationRef}
                  style={styles.lottie}
                  source={require("../../assets/Animations/Animation - 1695806708311.json")}
                  autoPlay={true}
                  loop={true}
                />
              </Block>
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
});
