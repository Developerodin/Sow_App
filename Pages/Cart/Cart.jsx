import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Block } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { useAppContext } from "../../Context/AppContext";

export const Cart = () => {
  const navigation = useNavigation();
  const { userDetails,cartUpdate,setCartUpdate } = useAppContext();
  const [cartData, setCartData] = useState([]);

  const getCartData = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      console.log('Cart Items:', cartItems);
      setCartData(cartItems ? JSON.parse(cartItems) : []);
    } catch (error) {
      console.log('Error getting cart data:', error);
    }
  };

  

  useEffect(() => {
    getCartData();
  }, [cartUpdate]);

  const createOrderFromCart = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      const items = cartItems ? JSON.parse(cartItems) : [];
  
      if (items.length === 0) {
        throw new Error('Cart is empty');
      }
  
      // Calculate total price for each item
      const itemsWithTotalPrice = items.map(item => ({
        ...item,
        totalPrice: item.value * item.unit,
      }));
  
      // Calculate total price for the entire order
      const totalPrice = itemsWithTotalPrice.reduce((sum, item) => sum + item.totalPrice, 0);
  
      const orderData = {
        items: itemsWithTotalPrice,
        orderBy: userDetails.id,
        orderTo: null, // Empty for now
        location: '6746feda758e95007f4a3eb5', // Random ID for now
        photos: '', // Empty for now
        orderStatus: 'New', // Example status
      };
  
      const response = await axios.post(`${Base_url}b2cOrder`, orderData);
      console.log('Order created:', response.data);


      await AsyncStorage.removeItem('cartItems');
    console.log('Cart items cleared from AsyncStorage');
    setCartUpdate(prev => prev + 1);
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };

  const totalWeight = cartData.reduce((acc, item) => {
    if (item.weight) {
      const weight = parseInt(item.weight.replace('kg', ''), 10); // Parse the weight as a number
      return acc + item.unit * weight;
    }
    return acc;
  }, 0);

  const totalValue = cartData.reduce((acc, item) => acc + item.value * item.unit, 0); // Multiply price by quantity

  const handlePickupAddress = () => {
    navigation.navigate('Schedule Address');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('../../assets/Book.png')} // Replace with the correct path
        style={styles.icon}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.subCategory}</Text>
        <Text style={styles.itemWeight}>{item.weight}</Text>
        <Text style={styles.editText}>Edit </Text>
      </View>
      <TouchableOpacity style={styles.quantityButton}>
        <Text style={styles.quantityText}>-  {item.unit}  +</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Block style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 50, marginBottom: 20 }}>
        <TouchableOpacity onPress={handleBack}>
          <Block style={{ backgroundColor: "#fff", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150 }}>
            <MaterialIcons name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="#000" />
          </Block>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: '500' }}>Your Scrap Start</Text>
      </Block>
      <ScrollView style={{ marginBottom: 50 }} showsVerticalScrollIndicator={false}>
        {cartData.length === 0 ? (
          <Block center style={{ marginTop: 40 }}>
            <Image
              source={require("../../assets/media/5-dark.png")}
              style={{
                width: 300,
                height: 300,
                marginRight: 10,
              }}
            />
                        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10 }}>
              Your cart is empty. Let's add some items!
            </Text>
          </Block>
        ) : (
          <>
            <View style={styles.pointsContainer}>
              <FontAwesome name="circle" size={20} color="gold" />
              <Text style={styles.pointsText}>You’ll earn 70 Points from this scrap</Text>
            </View>

            <FlatList
              data={cartData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.list}
            />

            <TouchableOpacity style={styles.addCategoryButton}>
              <FontAwesome name="plus-circle" size={22} color="#14B57C" />
              <Text style={styles.addCategoryText}>Add more Categories</Text>
            </TouchableOpacity>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryTitle}>Est. Weight</Text>
                <Text style={styles.summaryValue}>{totalWeight} kg</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryTitle}>Est. Value</Text>
                <Text style={styles.summaryValue}>₹ {totalValue}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.pickupButton} onPress={handlePickupAddress}>
              <Text style={styles.pickupButtonText}>Select Pickup Address</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C7F0E1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  pointsText: {
    marginLeft: 15,
    fontSize: 14,
    color: '#14B57C',
  },
  list: {
    flexGrow: 0,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#b3b3b3',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 65,
    height: 54,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemWeight: {
    fontSize: 14,
    color: '#000',
  },
  editText: {
    fontSize: 14,
    color: '#14B57C',
  },
  quantityButton: {
    backgroundColor: '#EBf9f4',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quantityText: {
    color: '#14B57C',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  addCategoryText: {
    color: '#000',
    marginLeft: 10,
    fontSize: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    color: '#14B57C',
  },
  summaryValue: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  pickupButton: {
    backgroundColor: '#14B57C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  pickupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;