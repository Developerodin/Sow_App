import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { Block } from 'galio-framework';

export const Sell = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(false); // Add error state

  const getCategories = async () => {
    try {
      const response = await axios.get(`${Base_url}categories`);
      console.log('Categories:', response.data);
      setCategories(response.data);
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
      activeOpacity={0.8}
    >
      <Image
        source={item.image && { uri: item.image }}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#14B57C" />
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
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item._id}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
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
    justifyContent: 'flex-start',
    
    marginBottom: 60,
  },
  row: {
    justifyContent: 'flex-start',
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
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
});

export default Sell;