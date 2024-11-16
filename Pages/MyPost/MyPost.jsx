import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";

import { AntDesign } from '@expo/vector-icons';
import { Header } from '../../Components/Header/Header';
import { OrdersCard } from '../../Components/Cards/OrdersCard';
const {width, height} = Dimensions.get('window');
import { TabView, SceneMap } from 'react-native-tab-view';
import { useAppContext } from '../../Context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { QuatationCard } from '../../Components/Cards/QuatationCard';
import { MyPostHistory } from '../../Components/Cards/MyPostHistory';


const data = {
  status: '3 Quotation Received', // or 'canceled'
  to: {
    name: 'Date',
  },
  orderDate: '2024-11-11T00:00:00Z',
  totalAmount: 1500,
  details: {
    category: 'Electronics',
  },
  from: {
    Address: 'Near Dmart',
    pincode: '302033',
    city: 'Jaipur',
    country: 'India',
  },
};

const FirstRoute = () => (
  <ScrollView style={{flex:1}}>
   
    <Block style={{padding:10,marginBottom:60}}>
         
    <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>Select Item</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter you name"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>

        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:18}}>Uplode images*</Text>
      <TextInput
          style={styles.input}
          placeholder="Choose files"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>

<Block style={{marginTop:20}}>
  <Text style={{fontSize:22}}>Item Details</Text>
</Block>

        <Block style={{marginTop:18}}>
<Block >
          <Text style={{fontSize:16}}>Title</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your title"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>

        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>Description</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your description"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>


        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>Price</Text>
      <TextInput
          style={styles.input}
          placeholder="0000"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>


        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>Quantity</Text>
      <TextInput
          style={styles.input}
          placeholder="0000"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>


        <Block style={{marginTop:20}}>
          <Text style={{fontSize:22}}>Your Details</Text>
        </Block>
         
        
        <Block style={{marginTop:18}}>
<Block >
          <Text style={{fontSize:16}}>Comapny name</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your Co. Name"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>


        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>Email address</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your Email Address"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>


        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>Phone Number</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your Number"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>

        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>State</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your State"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>

        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>City</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your City"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>

        <Block style={{marginTop:15}}>
<Block >
          <Text style={{fontSize:16}}>Address</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your Address"
          // value={formData.firstname}
          // onChangeText={(text) => handleInputChange("firstname", text)}
          placeholderTextColor="#B7B7B7"

        />
                </Block>
            
        </Block>


        <Block style={{marginTop:50,marginBottom:30}}>
        <TouchableOpacity style={styles.pickupButton} >
        <Text style={styles.pickupButtonText}>Submit</Text>
      </TouchableOpacity>
        </Block>
        
        </Block>

        </ScrollView>
);
const SecondRoute = () => (
  <ScrollView style={{flex:1}}>
   
    <Block style={{padding:10,marginBottom:60}}>
         
    <QuatationCard  data={data}/>
           
           <QuatationCard data={data}/>
           <QuatationCard data={data}/>
        
        </Block>
        </ScrollView>
);

const ThirdRoute = () => (
    <ScrollView style={{flex:1}}>
     
      <Block style={{padding:10,marginBottom:60}}>
           
      <MyPostHistory  data={data}/>
             
             <MyPostHistory data={data}/>
             <MyPostHistory data={data}/>
          
          </Block>
          </ScrollView>
  );
export const MyPost = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const {CartInStorage,CartTotalAmount,CartTotalWeight,showCartSuggestion,setShowCartSuggestion} = useAppContext()
 
  const handelSellScrap =()=>{
    navigation.navigate("Schedule Pickup")
 }
 const handelCloseCartInfo =()=>{
  if(CartInStorage.length > 0){
    setTimeout(()=>{
      setShowCartSuggestion(true);
    },5000)
  }
  setShowCartSuggestion(false);
 
 }
  const handleIndexChange = (newIndex) => setIndex(newIndex);
  const routes = [
    { key: 'first', title: 'Create Post' },
    { key: 'second', title: 'Quotations' },
    { key: 'third', title: 'History' },
  ];

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
        const isTabActive = i === index;
        const tabBackgroundColor = isTabActive ? '#0EB77B' : '#fff';
        const textColor = isTabActive ? '#fff' : '#000';
        const borderWidth = isTabActive ? 1 : 1;
        const borderColor = isTabActive ? '#0EB77B' : '#0EB77B';

        const tabStyle = [
          styles.tabItem,
          { borderRadius:0,borderWidth:borderWidth,borderColor:'#0EB77B',backgroundColor:tabBackgroundColor },
        ];

        const textStyles = [
         
          { color: textColor,fontWeight: 400,fontSize:16 },
        ];

        return (
          <TouchableOpacity
          activeOpacity={0.8}
            key={i}
            style={tabStyle}
            onPress={() => setIndex(i)}>
            <Animated.Text style={[textStyles,{fontSize:20}]}>{route.title}</Animated.Text>
          </TouchableOpacity>
        );
      })}


      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third:ThirdRoute
  });
  return (
    <View style={styles.container}>
    <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 60,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 500 }}>My Post</Text>
          <Ionicons name="filter" size={26} color="#000" />
        </View>
   
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />

    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#ffffff",

  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
    padding:10,
    backgroundColor:"#fff",
    
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop:10
    
  },
  inputContainer: {
    width: '100%',
    height: 66,
    borderBottomWidth: 1, // Add a bottom border for the input
    borderColor: 'transparent', // Make the border color transparent
  },
  input: {
    flex: 1,
    textAlign: "left",
    padding:15,
    fontSize:16,
    borderWidth:1,
    borderRadius:8,
    borderColor:"#A6A6A6",
    width:width*0.95,
    
    marginTop:4
    // Remove padding to make it look borderless
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
   width: '95%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
      borderWidth: 1,
      borderColor: "blue",
    },
    Center: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    Space_Around: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    Space_Between: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    shadow: {
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.2,
      elevation: 2,
    },
    button: {
      width: width,
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

  });