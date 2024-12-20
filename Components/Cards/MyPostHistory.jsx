import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
const {width, height} = Dimensions.get('window');
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


const data = {
  status: '3 Quotation Received', // or 'canceled'
  to: {
    name: 'John Doe',
  },
  orderDate: '2023-10-01T00:00:00Z',
  totalAmount: 1500,
  details: {
    category: 'Electronics',
  },
  from: {
    Address: '123 Main St',
    pincode: '123456',
    city: 'New York',
    country: 'USA',
  },
};

export const MyPostHistory = ({ data }) => {
  const navigation = useNavigation();

  const handeViewDetail=()=>{
    navigation.navigate("Post Details")
  }
    // const {Img,Title,SubTitle} = props
  return (
    <View style={styles.cardContainer}>
     

      

      <Block style={styles.row}>
        <View style={styles.column}>
        <Text style={{fontSize: 16,fontWeight: 600}}>{data.to.name}</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
            <AntDesign name="calendar" size={20} color="#0EB77B" />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>{new Date(data.orderDate).toLocaleDateString('en-GB')}</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column, styles.divider]}>
        <Text style={{fontSize: 16,fontWeight: 600}}>Price</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
          <View >
            <Image source={require('../../assets/Rupee.png')} style={{ width: 20, height: 20 }} />
          </View>
          <Text style={styles.amountText}>₹{data.totalAmount}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={[styles.text,{fontSize: 16,fontWeight: 600}]}>Items</Text>
          <Text style={[styles.text,{marginTop: 5}]}>{data.details.category}</Text>
         
        </View>
      </Block>


            <View style={{ flexDirection: 'row', alignItems: 'center',paddingTop: 15 }}>
        <Ionicons name="location" size={26} color="#0EB77B" />
        <Text style={[styles.text, { flex: 1,paddingRight: 24 }]}>
          Pickup Location: {data.from.Address}, {data.from.pincode}, {data.from.city}, {data.from.country}
        </Text>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={handeViewDetail}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    marginBottom: 15,
    
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 15,
     // Default to #FFD12C if status is not 'canceled' or 'pending'
    // width: 210,
    position: 'absolute',
    right: 10,
    top: -15,
  },
  statusText: {
    color: "#000",
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: "#b3b3b3",
    borderLeftWidth: 1,
    borderLeftColor: "#63b3b3",
    paddingHorizontal: 12,
    
  },
  amountText: {
    fontSize: 18,
    fontWeight: '500',
    color: "#000",
    
    marginLeft: 5,
  },
  text: {
    fontSize: 14,
    color: "#000",
    textAlign: 'center',
    
  },
  blueText: {
    color: "#000",
    fontWeight: '500',
  },
  viewDetailsButton: {
    
  },
  viewDetailsText: {
    fontSize: 16,
    color: "#0EB77B",
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  
    });