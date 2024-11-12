import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Block } from 'galio-framework'; 
import { useNavigation } from '@react-navigation/native';

const addresses = [
  { id: '1', label: 'Home A', address: 'Flatbush Ave, Brooklyn, NY 11238, United States', selected: true },
  { id: '2', label: 'Home B', address: 'Flatbush Ave, Brooklyn, NY 11238, United States', selected: false },
];

export const PickupAddress = () => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    
  const [selectedSegment, setSelectedSegment] = useState('Home');
  const [selectedAddress, setSelectedAddress] = useState('1');

  const renderAddressItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.addressContainer, item.selected && styles.selectedAddressContainer]}
      onPress={() => setSelectedAddress(item.id)}
    >
      <View style={styles.addressDetails}>
        <FontAwesome name="map-marker" size={20} color="#14B57C" />
        <View style={styles.addressTextContainer}>
          <Text style={styles.addressLabel}>{item.label}</Text>
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
      {item.id === selectedAddress && (
        <FontAwesome name="check-circle" size={20} color="#14B57C" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Block style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" ,marginTop : 50 ,marginBottom: 20}}>
        <TouchableOpacity onPress={handleBack}>
        <Block style={{ backgroundColor: "#fff", width: 50, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 150 }}>
          <MaterialIcons  name="arrow-back-ios" size={22} style={{ marginLeft: 5 }} color="#000" />
        </Block>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: '500' }}>Select pickup address</Text>
      </Block>

      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[styles.segment, selectedSegment === 'Home' && styles.activeSegment]}
          onPress={() => setSelectedSegment('Home')}
        >
          <FontAwesome name="home" size={16} color={selectedSegment === 'Home' ? '#14B57C' : '#14B57C'} />
          <Text style={[styles.segmentText, selectedSegment === 'Home' && styles.activeSegmentText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segment, selectedSegment === 'Other' && styles.activeSegment]}
          onPress={() => setSelectedSegment('Other')}
        >
          <MaterialIcons name="location-on" size={16} color={selectedSegment === 'Other' ? '#14B57C' : '#14B57C'} />
          <Text style={[styles.segmentText, selectedSegment === 'Other' && styles.activeSegmentText]}>Other</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.savedAddressText}>Saved address</Text>

      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
        style={styles.addressList}
      />

      

      <View style={styles.divider}>
        <Text style={styles.orText}>or</Text>
      </View>

      <TouchableOpacity style={styles.locationButton}>
        <FontAwesome name="map-marker" size={18} color="#14B57C" />
        <Text style={styles.locationButtonText}>Use current Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus-circle" size={18} color="black" />
        <Text style={styles.addButtonText}>Add new Address</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    marginBottom: 20,
    padding: 5,
    marginHorizontal: 30,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeSegment: {
    backgroundColor: '#000',
  },
  segmentText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#000',
  },
  activeSegmentText: {
    color: '#fff',
  },
  savedAddressText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b3b3b3',
    marginBottom: 10,
  },
  selectedAddressContainer: {
    borderColor: '#0eb77b',
  },
  addressDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTextContainer: {
    marginLeft: 10,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    color: 'gray',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  orText: {
    flex: 1,
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0eb77b',
    marginBottom: 15,
  },
  locationButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b3b3b3',
  },
  addButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});

export default PickupAddress;
