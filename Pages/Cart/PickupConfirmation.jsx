import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const PickupConfirmation = () => {
    const navigation = useNavigation();

    const handleicon = () => {
        navigation.navigate('Home');
    };
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleicon}>
      <View style={styles.iconContainer}>
        <Image source={require('../../assets/Confirm.png')} style={{ width: 144, height: 140 }} />
      </View>
        </TouchableOpacity>
      <Text style={styles.title}>Pickup Requested!</Text>
      <Text style={styles.subtitle}>
        Your pickup order request 
      </Text>
      <Text style={styles.subtitle2}>
        has been placed.
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // screen ke center mein rakhne ke liye
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    
    
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 25,
  },
  subtitle: {
    fontSize: 17,
    color: '#18BC9C',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle2: {
    fontSize: 17,
    color: '#18BC9C',
    textAlign: 'center',
  }
});

export default PickupConfirmation;
