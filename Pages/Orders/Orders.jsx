import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, RefreshControl, ActivityIndicator } from "react-native";
import { Block, Text, Button } from "galio-framework";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAppContext } from "../../Context/AppContext";

import { OrdersCard } from "../../Components/Cards/OrdersCard";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import { Base_url } from "../../Config/BaseUrl";

const { width, height } = Dimensions.get("window");

export const Orders = () => {
  const { userDetails } = useAppContext();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingError, setPendingError] = useState(false);
  const [completedError, setCompletedError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {
    CartInStorage,
    CartTotalAmount,
    CartTotalWeight,
    showCartSuggestion,
    setShowCartSuggestion,
  } = useAppContext();

  const fetchOrders = async (type, setOrders, setError) => {
    console.log('User Details:>>', type, userDetails.id);
    setLoading(true);
    try {
      const response = await axios.post(`${Base_url}b2cOrder/filterorders`, {
        type: type,
        userId: userDetails.id,
      });
      setOrders(response.data);
      console.log('Orders:>>', response.data);
    } catch (error) {
      setError(true);
      console.log('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (index === 0) {
      fetchOrders("Pending", setPendingOrders, setPendingError);
    } else if (index === 1) {
      fetchOrders("Completed", setCompletedOrders, setCompletedError);
    }
    setRefreshing(false);
  };

  const OrdersList = ({ orders, error }) => (
    <ScrollView style={{ flex: 1 }} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <Block style={{ padding: 10, marginBottom: 60 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0EB77B" />
        ) : error || orders.length === 0 ? (
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
          orders.map((order) => (
            <OrdersCard key={order._id} data={order} />
          ))
        )}
      </Block>
    </ScrollView>
  );

  useEffect(() => {
    if (index === 0) {
      fetchOrders("Pending", setPendingOrders, setPendingError);
    } else if (index === 1) {
      fetchOrders("Completed", setCompletedOrders, setCompletedError);
    }
  }, [index]);

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
  const handleIndexChange = (newIndex) => setIndex(newIndex);
  const routes = [
    { key: "first", title: "Pending" },
    { key: "second", title: "Completed" },
  ];

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const isTabActive = i === index;
          const tabBackgroundColor = isTabActive ? "#0EB77B" : "#fff";
          const textColor = isTabActive ? "#fff" : "#000";
          const borderWidth = isTabActive ? 1 : 1;
          const borderColor = isTabActive ? "#0EB77B" : "#0EB77B";

          const tabStyle = [
            styles.tabItem,
            {
              borderRadius: 0,
              borderWidth: borderWidth,
              borderColor: "#0EB77B",
              backgroundColor: tabBackgroundColor,
            },
          ];

          const textStyles = [
            { color: textColor, fontWeight: 400, fontSize: 16 },
          ];

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={i}
              style={tabStyle}
              onPress={() => setIndex(i)}
            >
              <Animated.Text style={[textStyles, { fontSize: 20 }]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <OrdersList orders={pendingOrders} error={pendingError} />;
      case 'second':
        return <OrdersList orders={completedOrders} error={completedError} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 60,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: 500 }}>Your Orders</Text>
        {/* <Ionicons name="filter" size={26} color="#000" /> */}
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
      />
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
    backgroundColor: "#ffffff",
  },
  tabBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
    height: 66,
    borderBottomWidth: 1,
    borderColor: "transparent",
  },
  input: {
    flex: 1,
    textAlign: "center",
    padding: 0,
    fontSize: 22,
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

export default Orders;