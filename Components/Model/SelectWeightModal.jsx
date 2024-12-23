import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from "../../Context/AppContext";

const { width, height } = Dimensions.get("screen");

const SelectWeightModal = ({
  visible,
  onClose,
  isModalVisible,
  setModalVisible,
  selectedItem,
  categoryName,
}) => {
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { cartUpdate,setCartUpdate } = useAppContext();

  const weightOptions = [
    { id: "1", label: "10kg" },
    { id: "2", label: "20kg" },
    { id: "3", label: "30kg" },
    { id: "4", label: "40kg" },
    { id: "5", label: "50kg", upgrade: true },
  ];

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const saveToCart = async () => {
    try {
      const cartItem = {
        category:categoryName,
        subCategory: selectedItem.name,
        value: selectedItem.price,
        unit: quantity,
        weight: selectedWeight,
      };

      let cartItems = await AsyncStorage.getItem('cartItems');
      cartItems = cartItems ? JSON.parse(cartItems) : [];

      cartItems.push(cartItem);

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Cart Items:', cartItems);
      setCartUpdate(prev => prev + 1);
      setModalVisible(false);
      setQuantity(1);
    } catch (error) {
      console.error('Error saving to cart:', error);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationType="slide"
      transparent={true}
      backdropOpacity={0.1}
      swipeDirection={["down"]}
      onSwipeComplete={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      coverScreen={true}
      style={{ justifyContent: "flex-end" }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Approximate Weight</Text>
          {weightOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionContainer,
                selectedWeight === option.label && styles.selectedOption,
              ]}
              onPress={() => setSelectedWeight(option.label)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
              {selectedWeight === option.label ? (
                <Ionicons name="checkmark-circle" size={24} color="#14B57C" />
              ) : option.upgrade ? (
                <TouchableOpacity style={styles.upgradeButton}>
                  <Text style={styles.upgradeText}>Upgrade to commercial</Text>
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>
          ))}

<Text style={styles.uploadLabel}>Upload images*</Text>
          <View style={styles.uploadContainer}>
            <TextInput placeholder="Choose files" style={styles.uploadInput} />
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>



          <View style={styles.infoContainer}>
            <Text>{selectedItem.name}</Text>
            <Text>₹ {selectedItem.price} kg</Text>
            <Text>5 g</Text>
          </View>

          <View style={styles.cartContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 5, borderWidth: 1, borderColor: "#000", borderRadius: 10 }}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange("decrement")}
              >
                <Text style={{ fontSize: 22 }}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>   {quantity}  </Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange("increment")}
              >
                <Text style={{ fontSize: 22 }}>+</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.cartButton} onPress={saveToCart}>
                <Text style={styles.cartButtonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -50,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width,
    height: height * 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: "#14B57C",
  },
  optionLabel: {
    fontSize: 16,
  },
  upgradeButton: {
    backgroundColor: "#14B57C",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  upgradeText: {
    color: "#fff",
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 16,
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  quantityButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    color: "#14B57C",
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#14B57C",
    paddingVertical: 17,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginLeft: 10,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  upgradeButton: {
    backgroundColor: "#14B57C",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  upgradeText: {
    color: "#fff",
    fontSize: 12,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  uploadInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: "#14B57C",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  uploadButtonText: {
    color: "#fff",
  },
});

export default SelectWeightModal;