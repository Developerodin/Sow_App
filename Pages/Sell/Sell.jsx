import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Paper', image: require('../../assets/Paper.png') },
  { id: '2', name: 'Plastic', image: require('../../assets/Plastic.png') },
  { id: '3', name: 'Metal', image: require('../../assets/Metal.png') },
  { id: '4', name: 'Plastic', image: require('../../assets/Plastic.png') },
  { id: '5', name: 'Metal', image: require('../../assets/Metal.png') },
  { id: '6', name: 'Paper', image: require('../../assets/Paper.png') },
  { id: '7', name: 'Metal', image: require('../../assets/Metal.png') },
  { id: '8', name: 'Paper', image: require('../../assets/Paper.png') },
  { id: '9', name: 'Plastic', image: require('../../assets/Plastic.png') },
];

export const Sell = () => {
    const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handelSellScrap = () => {
    navigation.navigate('SellScrap');
    };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        selectedCategory === item.id && styles.selectedCategoryContainer,
      ]}
      onPress={handelSellScrap}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View style={{marginTop: 50}}>
      <Text style={styles.headerText}>Sell your Scrap</Text>
      </View>
      <Text style={styles.subHeaderText}>
        Select your <Text style={styles.highlightText}>scrap category</Text> -
      </Text>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  highlightText: {
    color: '#14B57C',
    fontWeight: 'bold',
  },
  grid: {
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    margin: 5,
    borderRadius: 12,
    
    
    backgroundColor: '#f9f9f9',
  },
  selectedCategoryContainer: {
    borderColor: '#14B57C',
    borderWidth: 1,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
});

export default Sell;
