import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';

export const Sell = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}categories`);
      console.log('Categories:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSellScrap = (categoryName) => {
    navigation.navigate('SellScrap', { categoryName });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        selectedCategory === item._id && styles.selectedCategoryContainer,
      ]}
      onPress={() => handleSellScrap(item.name)}
    >
      <Image
        source={require('../../assets/Metal.png')}
        style={styles.image}
      />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.headerText}>Sell your Scrap</Text>
      </View>
      <Text style={styles.subHeaderText}>
        Select your <Text style={styles.highlightText}>scrap category</Text> -
      </Text>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item._id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
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
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
});

export default Sell;