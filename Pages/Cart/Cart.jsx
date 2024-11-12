import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Image,ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Block } from 'galio-framework'; 
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', name: 'Note Book', weight: '>10KG', quantity: 2 },
  { id: '2', name: 'Note Book', weight: '>10KG', quantity: 2 },
  { id: '3', name: 'Note Book', weight: '>10KG', quantity: 2 },
  { id: '4', name: 'Note Book', weight: '>10KG', quantity: 2 },
];

export const Cart = () => {
    const navigation = useNavigation();

    const handlePickupAddress = () => {
        navigation.navigate('Pickup Address');
    };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('./Book.png')} // Replace with the correct path
        style={styles.icon}
        />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemWeight}>{item.weight}</Text>
        <Text style={styles.editText}>Edit ></Text>
      </View>
      <TouchableOpacity style={styles.quantityButton}>
        <Text style={styles.quantityText}>-  {item.quantity} kg  +</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{marginBottom: 50}} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Block style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" ,marginTop : 50 ,marginBottom: 20}}>
        <Block style={{ backgroundColor: "#fff", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150 }}>
          <MaterialIcons  name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="#000" />
        </Block>
        <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: '500' }}>Your Scrap Start</Text>
      </Block>

      <View style={styles.pointsContainer}>
        <FontAwesome name="circle" size={20} color="gold" />
        <Text style={styles.pointsText}>You’ll earn 70 Points from this scrap</Text>
      </View>

      <FlatList
        data={data}
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
          <Text style={styles.summaryValue}>8 kg</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Est. Value</Text>
          <Text style={styles.summaryValue}>₹3000</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.pickupButton} onPress={handlePickupAddress}>
        <Text style={styles.pickupButtonText}>Select Pickup Address</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
