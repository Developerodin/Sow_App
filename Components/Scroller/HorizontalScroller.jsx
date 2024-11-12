import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const data = [
  {
    id: '1',
    title: 'Sell Scrap in',
    title2: 'Bulk!',
    subtitle1: 'Upgrade to Commercial. ',
    subtitle2: 'Complete your KYC now.',
    buttonLabel: 'Upgrade',
    image: require('./scrap.png'), // Replace with the correct path
  },
  {
    id: '2',
    title: 'Sell Scrap in',
    title2: 'Bulk!',
    subtitle1: 'Upgrade to Commercial.',
    subtitle2: 'Complete your KYC now.',
    buttonLabel: 'Upgrade',
    image: require('./scrap.png'), // Replace with the correct path
  },
  // Add more cards if needed
];

const Card = ({ item }) => (
  <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.title}>{item.title2}</Text>
    <View style={styles.textContainer}>
        <View>
        
        </View>
        <View style={{marginTop:10,marginBottom:10}}>
        <Text style={styles.subtitle}>{item.subtitle1}</Text>
        <Text style={styles.subtitle}>{item.subtitle2}</Text>
        </View>
      </View>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{item.buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const HorizontalScroller = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => <Card item={item} />}
    keyExtractor={(item) => item.id}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.75,
    backgroundColor: '#14B57C', // Green color similar to the image
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 10,
   
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    
  },
  textContainer: {
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position:'absolute',
    bottom:0,
    right:0,
  },
  image: {
    width: 85,
    height: 85,
    
    position: 'absolute',
    right: 0,
    top: 0,
    borderTopRightRadius: 16,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default HorizontalScroller;
