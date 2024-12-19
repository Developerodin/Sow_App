import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Block } from 'galio-framework'; 
import SelectWeightModal from '../../Components/Model/SelectWeightModal';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SellScrap = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName } = route.params;
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const getSubCategoriesByCategoryName = async (categoryName) => {
    console.log('Getting SubCategories', categoryName);
    try {
      const response = await axios.post(`${Base_url}subcategories/category`, {
        categoryName: categoryName
      });

      console.log("sub category data of selected category ==>", response.data);
      setSubCategoryData(response.data);

      return response.data;
    } catch (error) {
      console.log("Error getting subcategory ==>", error);
      setSubCategoryData([]);
    }
  };

  useEffect(() => {
    getSubCategoriesByCategoryName(categoryName);
  }, [categoryName]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCart = () => {
    navigation.navigate('Cart');
  };

  const openModal = (item) => {
    setSelectedId(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      console.log('Cart items cleared');
    } catch (error) {
      console.error('Error clearing cart items:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = item._id === selectedId?._id;
    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.selectedItem]}
        onPress={() => openModal(item)}
      >
        <Image source={require('../../assets/Box.png')} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price}/Kg</Text>
        </View>
        {isSelected && <Ionicons name="checkmark-circle" size={24} color="#14B57C" />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Block style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 50, marginBottom: 20 }}>
        <TouchableOpacity onPress={handleBack}>
          <Block style={{ backgroundColor: "#fff", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150 }}>
            <MaterialIcons name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="#000" />
          </Block>
        </TouchableOpacity>
        <Text style={{ marginLeft: 2, fontSize: 25, fontWeight: '500' }}>Sell your Scrap</Text>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.category}>
          Category: <Text style={styles.categoryName}>{categoryName}</Text>
        </Text>
        <FlatList
          data={subCategoryData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.list}
        />
        <TouchableOpacity style={styles.addCategoryButton}>
          <Ionicons name="add-circle" size={24} color="#14B57C" />
          <Text style={styles.addCategoryText}>Add more Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pickupButton} onPress={handleCart}>
          <Text style={styles.pickupButtonText}>Go to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={clearCart}>
          <Ionicons name="trash" size={24} color="#FF0000" />
          <Text style={styles.deleteButtonText}>Clear Cart</Text>
        </TouchableOpacity>

        {selectedId && (
          <SelectWeightModal
            isVisible={isModalVisible}
            onClose={closeModal}
            selectedItem={selectedId} 
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
          />
        )}
      </ScrollView>
    </View>
  );
};

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
    marginBottom: 16,
  },
  addCategoryText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
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
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'center',
    marginBottom: 16,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF0000',
    marginLeft: 8,
  },
});

export default SellScrap;