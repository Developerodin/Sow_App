// WeightSelectionModal.js
import React, { useState } from 'react';
import {  View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";

const weightOptions = [
  { id: '1', label: 'Less than 10 KG' },
  { id: '2', label: '10-20 KG' },
  { id: '3', label: '20-30 KG' },
  { id: '4', label: '30-40 KG' },
  { id: '5', label: 'More than 50 KG', upgrade: true },
];

const SelectWeightModal = ({ visible, onClose }) => {
  const [selectedWeight, setSelectedWeight] = useState(null);

  return (
    <Modal visible={visible} animationType="slide" transparent={true} backdropOpacity={0.1} swipeDirection={[ "down"]} onSwipeComplete={() => onClose()} onBackdropPress={() => onClose()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Approximate Weight</Text>
          {weightOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionContainer, selectedWeight === option.id && styles.selectedOption]}
              onPress={() => setSelectedWeight(option.id)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
              {selectedWeight === option.id ? (
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
            <Text>Material: Paper</Text>
            <Text>Price: ₹2/KG</Text>
            <Text>CO₂ Saved: 5 g</Text>
          </View>

          <View style={styles.cartContainer}>
            <TouchableOpacity style={styles.quantityButton}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>2 kg</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Add to cart</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    
    
    
  },
  modalContent: {
    
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#14B57C',
  },
  optionLabel: {
    fontSize: 16,
  },
  upgradeButton: {
    backgroundColor: '#14B57C',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  upgradeText: {
    color: '#fff',
    fontSize: 12,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  uploadInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: '#14B57C',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  uploadButtonText: {
    color: '#fff',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  quantityText: {
    marginHorizontal: 10,
  },
  cartButton: {
    backgroundColor: '#14B57C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  cartButtonText: {
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default SelectWeightModal;
