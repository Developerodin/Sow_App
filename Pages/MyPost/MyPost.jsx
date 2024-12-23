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
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { CategoryAddModel } from '../../Components/Model/CategoryAddModel';
import { Alert } from 'react-native';



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

const FirstRoute = () => {
  const { userDetails } = useAppContext(); // Assuming userDetails is available in the context
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isSubCategoryModalVisible, setIsSubCategoryModalVisible] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: '',
    title: '',
    description: '',
    price: '',
    quantity: '',
    companyName: '',
    emailAddress: '',
    phoneNumber: '',
    state: '',
    city: '',
    address: '',
  });

  // Fetch Categories API
  const getCategories = async () => {
    try {
      setLoading(true); // Show loading spinner
      const response = await axios.get(`${Base_url}categories`);
      setCategoriesData(response.data); // Set the fetched data to state
      setLoading(false); // Hide loading spinner
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  // Fetch Subcategories by Category Name API
  const getSubCategoriesByCategoryName = async (categoryName) => {
    try {
      setLoading(true); // Show loading spinner
      const response = await axios.post(`${Base_url}subcategories/category`, {
        categoryName: categoryName,
      });
      setSubCategoryData(response.data); // Set the fetched data to state
      setLoading(false); // Hide loading spinner
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubCategoryData([]); // Set empty data in case of an error
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategorie(category.name); // Set selected category name
    setIsCategoryModalVisible(false); // Close category modal
    await getSubCategoriesByCategoryName(category.name); // Fetch subcategories
    setIsSubCategoryModalVisible(true); // Open subcategory modal
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createPost = async () => {
    try {
      const {
        images,
        title,
        description,
        price,
        quantity,
        companyName,
        emailAddress,
        phoneNumber,
        state,
        city,
        address,
      } = formData;

      const postData = {
        postBy: userDetails.id,
        categoryName: selectedCategorie,
        subCategoryName: selectedSubCategory,
        images,
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        companyName,
        emailAddress,
        phoneNumber,
        state,
        city,
        address,
      };

      const response = await axios.post(`${Base_url}posts`, postData);
      console.log('Post created:', response.data);
      Alert.alert('Success', 'Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'An error occurred while creating the post.');
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Block style={{ padding: 10, marginBottom: 60 }}>
        <Block style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16 }}>Select Category</Text>
          <TouchableOpacity
            onPress={() => {
              getCategories();
              setIsCategoryModalVisible(true);
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Select Category"
              value={selectedCategorie}
              editable={false}
              placeholderTextColor="#B7B7B7"
            />
          </TouchableOpacity>
        </Block>

        {/* Subcategory */}
        <Block style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16 }}>Select Subcategory</Text>
          <TouchableOpacity
            onPress={() => {
              if (!selectedCategorie) {
                alert("Please select a category first.");
                return;
              }
              setIsSubCategoryModalVisible(true);
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Select Subcategory"
              value={selectedSubCategory}
              editable={false}
              placeholderTextColor="#B7B7B7"
            />
          </TouchableOpacity>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 18 }}>Upload images*</Text>
            <TextInput
              style={styles.input}
              placeholder="Choose files"
              placeholderTextColor="#B7B7B7"
              value={formData.images}
              onChangeText={(value) => handleInputChange('images', value)}
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 22 }}>Item Details</Text>
        </Block>

        <Block style={{ marginTop: 18 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your title"
              placeholderTextColor="#B7B7B7"
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your description"
              placeholderTextColor="#B7B7B7"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="0000"
              placeholderTextColor="#B7B7B7"
              value={formData.price}
              onChangeText={(value) => handleInputChange('price', value)}
              keyboardType="numeric"
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="0000"
              placeholderTextColor="#B7B7B7"
              value={formData.quantity}
              onChangeText={(value) => handleInputChange('quantity', value)}
              keyboardType="numeric"
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 22 }}>Your Details</Text>
        </Block>

        <Block style={{ marginTop: 18 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Company name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Co. Name"
              placeholderTextColor="#B7B7B7"
              value={formData.companyName}
              onChangeText={(value) => handleInputChange('companyName', value)}
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email Address"
              placeholderTextColor="#B7B7B7"
              value={formData.emailAddress}
              onChangeText={(value) => handleInputChange('emailAddress', value)}
              keyboardType="email-address"
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Number"
              placeholderTextColor="#B7B7B7"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              keyboardType="phone-pad"
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your State"
              placeholderTextColor="#B7B7B7"
              value={formData.state}
              onChangeText={(value) => handleInputChange('state', value)}
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your City"
              placeholderTextColor="#B7B7B7"
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 15 }}>
          <Block>
            <Text style={{ fontSize: 16 }}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Address"
              placeholderTextColor="#B7B7B7"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
            />
          </Block>
        </Block>

        <Block style={{ marginTop: 50, marginBottom: 30 }}>
          <TouchableOpacity style={styles.pickupButton} onPress={createPost}>
            <Text style={styles.pickupButtonText}>Submit</Text>
          </TouchableOpacity>
        </Block>
        <CategoryAddModel
          modalVisible={isCategoryModalVisible}
          setModalVisible={setIsCategoryModalVisible}
          data={categoriesData}
          onSelect={handleCategorySelect}
        />
        <CategoryAddModel
          modalVisible={isSubCategoryModalVisible}
          setModalVisible={setIsSubCategoryModalVisible}
          data={subCategoryData}
          onSelect={(subcategory) => {
            setSelectedSubCategory(subcategory.name);
            setIsSubCategoryModalVisible(false);
          }}
        />
      </Block>
    </ScrollView>
  );
};

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