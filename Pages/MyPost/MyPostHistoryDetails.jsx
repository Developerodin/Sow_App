import React, { useRef, useState ,useEffect} from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation ,useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';


import { AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export const MyPostHistoryDetails = () => {
  const route = useRoute();
      const { postId } = route.params;
  const navigation = useNavigation();
  const [postDetails , setPostDetails] = useState({});

  const getPostDetails = async () => {
    try {
      const response = await axios.get(`${Base_url}posts/${postId}`);
      const data = response.data;
      console.log("postDetails",data);
      setPostDetails(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostDetails();
  }, []);
  
  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

   
    <Block style={{padding:15,backgroundColor:"#fff", marginTop:0,borderRadius:10}}>
    {/* <Block style={styles.Space_Between}>
         <Text style={{fontSize:20,color:"grey"}}>OTP :{orderDetails && orderDetails.otp}</Text>
         <Button  style={{backgroundColor:"crimson",borderRadius:10}}>
              <Text style={{fontSize:16,fontWeight:400,color:"#fff"}}>
              {orderDetails && (orderDetails.status).toUpperCase()}
              </Text>
            
              </Button>
        </Block> */}
             <Block style={{ marginTop: 0 }}>
           <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 700, color: '#000' }}>
              {postDetails && postDetails.categoryName }
            </Text>
          </Block> 

          <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="key" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 18, marginLeft: 8 ,fontWeight : 700 }}>
             OTP :  {postDetails.otp}
            </Text>
          </Block>

          <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../assets/Rupee.png')} style={{height:20,width:20}} />
            <Text style={{ fontSize: 18, marginLeft: 8 ,fontWeight : 700 }}>

             ₹ {postDetails.price}/KG
            </Text>
          </Block>  
          
          <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="document" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 18, marginLeft: 8 ,fontWeight : 700 }}>
              {postDetails.quantity} kg
            </Text>
          </Block>
          <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="calendar" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 16, marginLeft: 8 ,fontWeight : 500}}>
              {new Date(postDetails.createdAt).toLocaleDateString('en-GB')}
            </Text>
          </Block>
          <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="location" size={20} color="#0EB77B" />
            <Text style={{ fontSize: 16, marginLeft: 8 ,fontWeight : 500}}>
              Pickup Location :  {postDetails.address}, {postDetails.city}, {postDetails.state}
            </Text>
          </Block>
         
           
          </Block>

        {/* <Block style={styles.tableContainer}>
      

     
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.headerText, styles.tableCell]}>Items</Text>
        <Text style={[styles.headerText, styles.tableCell]}>Est. Weight</Text>
        <Text style={[styles.headerText, styles.tableCell]}>Est. Price</Text>
      </View>

    
      <View style={styles.tableRow}>
        <Text style={[styles.cellText, styles.tableCell]}>
          Paper
        </Text>
        <Text style={[styles.cellText, styles.tableCell]}>
          40 kg
        </Text>
        <Text style={[styles.cellText, styles.tableCell]}>
        ₹ 4000
        </Text>
      </View>

      

      <View style={styles.tableRow}>
        <Text style={[styles.cellText, styles.tableCell]}>Plastic</Text>
        <Text style={[styles.cellText, styles.tableCell]}>20 kg</Text>
        <Text style={[styles.cellText, styles.tableCell]}>₹ 3000</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={[styles.cellText, styles.tableCell]}>Metal</Text>
        <Text style={[styles.cellText, styles.tableCell]}>20 kg</Text>
        <Text style={[styles.cellText, styles.tableCell]}>₹ 3000</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={[styles.cellText, styles.tableCell]}>Total Est. Amount</Text>
        
        <Text style={[styles.cellText, styles.tableCell]}>₹ 10000</Text>
      </View>
    </Block> */}
 


      <Text style={{fontSize: 24 ,fontWeight : 700, color: '#000' ,marginVertical: 15}}>Photos</Text>
    <View style={styles.boxContainer}>
      <View style={styles.row}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
      <View style={styles.row}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>
    </View>

{/* {
  orderDetails && orderDetails.details.discription &&<Block style={{marginTop:20}} >
  <Block>
   <Text style={styles.text1}>Discription</Text>
  </Block>
  <Block style={{marginTop:10}}>
  <Text style={{fontSize:20}}>{orderDetails && orderDetails.details.discription}</Text>
  </Block>
  
</Block>

} */}
     


     <Block style={{marginTop:20}} >

    
       

       
        
     </Block>
    </Block>

    


    

    
    </ScrollView>
   </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#fff",
    padding:10

  },
  text1:{
   fontSize:14,
   color:"#9B9B9B"
  },
  text2:{
      fontSize:16,
      color:"#040404"
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
    padding:10,
    
  },
  modalContainer: {
    flex: 1,
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
    textAlign:"center",
    padding:0,
    fontSize:22
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
      borderColor: "pink",
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
    tableContainer: {
      marginTop : 15,
      paddingRight : 30,
      paddingLeft : 30,
      
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#333',
      textAlign: 'center',
    },
    tableHeader: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderTopColor: '#000',
      borderTopWidth: 1,
      
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    headerText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#000',
      textAlign: 'center',
    },
    cellText: {
      fontSize: 16,
      color: '#000',
      textAlign: 'center',
      fontWeight : 500
    },
    tableCell: {
      flex: 1,
      paddingVertical: 5,
      borderRightWidth: 0.5,
      borderRightColor: '#000',
      borderLeftWidth: 0.5,
      borderLeftColor: '#000',
    },
    boxContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 10,
    },
    box: {
      width: '25%', // Adjusts the width of each box in the row
      aspectRatio: 1, // Ensures boxes are square
      backgroundColor: '#D3D3D3', // Light grey color
      borderRadius: 8,
    },
  
    });