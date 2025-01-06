import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Block, Text } from "galio-framework";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';

const { width, height } = Dimensions.get('window');

export const OrderDetail = () => {
  const route = useRoute();
  const { orderId } = route.params;
  const navigation = useNavigation();

  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handelBack = () => {
    navigation.goBack();
  };
  const getOrderDetails = async () => {
    try {
      const response = await axios.get(`${Base_url}b2cOrder/${orderId}`);
      setOrderDetails(response.data);
      console.log("orderDetails", response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const calculateTotalWeight = (items) => {
    return items.reduce((total, item) => total + parseFloat(item.weight) || 0, 0);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.totalPrice || 0), 0);
  };

  const totalWeight = orderDetails.items ? calculateTotalWeight(orderDetails.items) : 0;
  const totalPrice = orderDetails.items ? calculateTotalPrice(orderDetails.items) : 0;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching order details: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
          <Block >
            <Block style={{ flexDirection: 'row', alignItems: 'center', marginTop: 55 }}>
              <Block style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 150, marginLeft: 5 }}>
                <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={24} style={{ marginLeft: 5 }} color="black" />
              </Block>
              <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '500', flex: 1 }}>Order Details</Text>
              <Block style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                <TouchableOpacity activeOpacity={0.8}>
                  <View >
                    
                    {/* <Ionicons name="filter" size={28} color="#000" /> */}
                  </View>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ padding: 15, backgroundColor: "#fff", marginTop: 0, borderRadius: 10 }}>
          <Block style={{ marginTop: 0 }}>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="document" size={20} color="#0EB77B" />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500 }}>
                Order No. : {orderDetails.orderNo || 'N/A'}
              </Text>
            </Block>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar" size={20} color="#0EB77B" />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500 }}>
                {orderDetails.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString('en-GB') : 'N/A'}
              </Text>
            </Block>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location" size={20} color="#0EB77B" />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 500 }}>
                Pickup Location: {orderDetails.location?.address || 'N/A'},  {orderDetails.location?.city || 'N/A'}, {orderDetails.location?.state || 'N/A'}
              </Text>
            </Block>
            <Block style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 500, marginLeft: 26, color: '#0EB77B', textDecorationLine: 'underline' }}>
                View on Map
              </Text>
            </Block>
            <Block style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              {orderDetails.items && orderDetails.items.map((item, index) => (
                <React.Fragment key={index}>
                  <MaterialIcons name="category" size={20} color="#0EB77B" />
                  <Text style={{ fontSize: 18, fontWeight: 500 }}>
                    {item.category}
                  </Text>
                </React.Fragment>
              ))}
            </Block>
          </Block>

          <Block style={styles.tableContainer}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.headerText, styles.tableCell]}>Items</Text>
              <Text style={[styles.headerText, styles.tableCell]}>Est. Weight</Text>
              <Text style={[styles.headerText, styles.tableCell]}>Est. Price</Text>
            </View>

            {orderDetails.items && orderDetails.items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={[styles.cellText, styles.tableCell]}>
                  {item.category || 'N/A'}
                </Text>
                <Text style={[styles.cellText, styles.tableCell]}>
                  {item.weight || 'N/A'}
                </Text>
                <Text style={[styles.cellText, styles.tableCell]}>
                  ₹ {item.totalPrice || 'N/A'}
                </Text>
              </View>
            ))}

            <View style={styles.tableRow}>
              <Text style={[styles.cellText, styles.tableCell ,styles.totalAmountCell]}>Total Est. Amount</Text>
              <Text style={[styles.cellText, styles.tableCell]}>₹ {totalPrice}</Text>
            </View>
          </Block>

          <Text style={{ fontSize: 24, fontWeight: 700, color: '#000', marginVertical: 15 }}>Photos</Text>
          <View style={styles.boxContainer}>
            <View style={styles.row}>
              <View style={styles.box} />
              <View style={styles.box} />
              <View style={styles.box} />
            </View>
            <View style={styles.row}>
              <View style={styles.box} />
              <View style={styles.box} />
              <View style={styles.box} />
            </View>
          </View>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  text1: {
    fontSize: 14,
    color: "#9B9B9B"
  },
  text2: {
    fontSize: 16,
    color: "#040404"
  },
  tabBar: {
    flexDirection: 'row',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 10
  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    textAlign: "center",
    padding: 0,
    fontSize: 22
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing: 0.3
  },
  title: {
    color: "black",
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
    width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: "pink",
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
  tableContainer: {
    marginTop: 15,
    paddingRight: 30,
    paddingLeft: 30,
  },
  tableHeader: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderTopColor: '#000',
    borderTopWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  cellText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: 500
  },
  tableCell: {
    flex: 1,
    paddingVertical: 5,
    borderRightWidth: 0.5,
    borderRightColor: '#000',
    borderLeftWidth: 0.5,
    borderLeftColor: '#000',
  },
  totalAmountCell: {
    flex: 2, // Increase the width of the "Total Est. Amount" cell
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  box: {
    width: '25%',
    aspectRatio: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
  },
});