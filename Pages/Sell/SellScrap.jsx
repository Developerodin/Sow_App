import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Block } from 'galio-framework'; 

const scrapItems = [
  { id: '1', name: 'Note Book', price: '₹2/Kg', image: require('./Book.png') },
  { id: '2', name: 'Cartoon Box', price: '₹2/Kg', image: require('./Box.png') },
  { id: '3', name: 'News Paper', price: '₹2/Kg', image: require('./Paper.png') },
  { id: '4', name: 'Magazines', price: '₹2/Kg', image: require('./Magazines.png') },
  { id: '5', name: 'News Paper', price: '₹2/Kg', image: require('./Paper.png') },
  { id: '6', name: 'Cartoon Box', price: '₹2/Kg', image: require('./Box.png') },
];

export const SellScrap = () => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.selectedItem]}
        onPress={() => setSelectedId(item.id)}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        {isSelected && <Ionicons name="checkmark-circle" size={24} color="#14B57C" />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Block style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" ,marginTop : 50 ,marginBottom: 20}}>
        <TouchableOpacity onPress={handleBack}>
        <Block style={{ backgroundColor: "#fff", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150 }}>
          <MaterialIcons  name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="#000" />
        </Block>
        </TouchableOpacity>
        <Text style={{ marginLeft: 2, fontSize: 25, fontWeight: '500' }}>Sell your Scrap</Text>
      </Block>
      <Text style={styles.category}>
        Category: <Text style={styles.categoryName}>Paper</Text>
      </Text>
      <FlatList
        data={scrapItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.addCategoryButton}>
        <Ionicons name="add-circle" size={24} color="#14B57C" />
        <Text style={styles.addCategoryText}>Add more Categories</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 20,
    marginBottom: 20,
  },
  categoryName: {
    color: '#14B57C',
  },
  list: {
    flexGrow: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedItem: {
    borderColor: '#14B57C',
  },
  itemImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#000',
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },
  addCategoryText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
});

export default SellScrap;
