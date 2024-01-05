import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme, Button } from "galio-framework";
import { Header } from '../../Components/Header/Header';
import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../Context/AppContext';

export const Schedule = () => {
  const navigation = useNavigation()
   const{update,setUpdate} = useAppContext()
    const [expanded, setExpanded] = useState(false);
    const [Dateexpanded, setDateExpanded] = useState(false);
    const [Timeexpanded, setTimeExpanded] = useState(false);
    const [Addressexpanded, setAddressExpanded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [Address,setAddress] = useState(null);
    const [CartData,setCartData] = useState([])
    const [TotalAmount,setTotalAmount] = useState(0);
    const [TotalWeight,setTotalWeight] = useState(0);
    const [selectedWeight,setselectedWeight] = useState("");
    const {Cart,setCart,setShowCartSuggestion} = useAppContext();
    const toggleAccordion = () => {
        setExpanded(!expanded);
      };
      const toggleDateAccordion = () => {
        setDateExpanded(!Dateexpanded);
        setShowDatePicker(true)
      };

      const toggleTimeAccordion = () => {
        setTimeExpanded(!Timeexpanded);
        setShowTimePicker(true)
      };

      const toggleAddressAccordion = () => {
        setAddressExpanded(!Addressexpanded);
      };
      const handleDateChange = (event, selected) => {
        if (event.type === 'set') {
          setSelectedDate(selected);
        }
        setShowDatePicker(false); // Hide date picker on iOS after selecting a date
      };

      const handleTimeChange = (event, selected) => {
        if (event.type === 'set') {
          setSelectedTime(selected);
        }
        setShowTimePicker(Platform.OS === 'ios'); // Hide time picker on iOS after selecting a time
      };
      const retrieveAddress = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserAddress');
          if (jsonValue !== null) {
            // JSON parse the retrieved value to convert it back to an object
            const address = JSON.parse(jsonValue);
            console.log('Retrieved Address:', address);
            setAddress(address)
            return address;
          } else {
            console.log('No address data found in AsyncStorage.');
            return null;
          }
        } catch (error) {
          console.error('Error retrieving address:', error);
          return null;
        }
      };

      const handelAddNewAddress =()=>{
         navigation.navigate("Address")
      }

      const handelWeight = (data)=>{
        setselectedWeight(data)
        toggleAccordion()
      }

      const getCartFromAsyncStorage = async () => {
        try {
          const cartArrayJSON = await AsyncStorage.getItem('cart');
          if (cartArrayJSON !== null) {
            const cartArray = JSON.parse(cartArrayJSON);
            console.log('Cart retrieved from AsyncStorage:', cartArray);
            setCartData(cartArray);
            return cartArray;
          } else {
            console.log('Cart is empty in AsyncStorage');
            return [];
          }
        } catch (error) {
          console.error('Error retrieving cart from AsyncStorage:', error);
        }
      };
      
      const handelShedulePickup = ()=>{
        setCart([])
        navigation.navigate("Order Placed Successfull")
      }

      const clearCartFromAsyncStorage = async () => {
        try {
          await AsyncStorage.removeItem('cart');
          console.log('Cart cleared from AsyncStorage');
          setUpdate((prev)=>prev+1)
          setShowCartSuggestion(false);
          navigation.goBack();
        } catch (error) {
          console.error('Error clearing cart from AsyncStorage:', error);
        }
      };

      useEffect(()=>{
        retrieveAddress();
      },[update])

      useEffect(()=>{
        getCartFromAsyncStorage().then((res)=>{
          let amount = 0;
  let weight = 0;

  res.forEach(item => {
    amount += parseInt(item.totalValue);
    weight += parseInt(item.Weight);
  });
  setTotalAmount(amount);
  setTotalWeight(weight);
        })
      },[])
     
  return (
    <View style={styles.container}>
      {/* <Header/> */}
      <ScrollView style={{flex:1,backgroundColor:"#F1F1F1"}}>

      <Block style={{padding:10}}>
     
     <Block>
         <Block style={{marginTop:30}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
          <FontAwesome5 name="weight" size={24} color="black" style={{marginRight:10}} />
          <Text style={{fontSize:18}}>Details</Text>
          </Block>

          <Block>
            {
              expanded ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {expanded && (
        <View style={{marginTop:20}}>
          
          <Block style={[styles.Space_Between,{marginTop:20}]}>
          <TouchableOpacity activeOpacity={0.6} >
            <Text style={{fontSize:18}}>Total Item : {CartData && CartData.length}</Text>
            </TouchableOpacity>
        
            <TouchableOpacity activeOpacity={0.6} >
            <Text style={{fontSize:18}}>Total Weight : {TotalWeight} Kg</Text>
            </TouchableOpacity>
            </Block>
       
            

            <Block style={[styles.Space_Between,{marginTop:20}]}>
            <TouchableOpacity activeOpacity={0.6} >
            
            <Text style={{fontSize:18}}>Total Amount : ₹ {TotalAmount}</Text>
            </TouchableOpacity>
         
         
            </Block>

            <Block style={[{marginTop:20,flexDirection:"row",justifyContent:"start",alignItems:"center"}]}>
           
             
              {
                CartData.map((el,index)=>{
                  return (
                    <Block key={index} style={{padding:10,backgroundColor:"teal",borderRadius:15,marginRight:10}}>
                      <Text style={{fontSize:15,color:"#fff",fontWeight:500,letterSpacing:1}}>{el.title}</Text>
                    </Block>
                  )
                })
              }

            
              
            
           
       
            </Block>
         
          
        </View>
      )}
    </View>
   

            </Block>

            <Block style={{marginTop:30}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleDateAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
          <Fontisto name="date" size={24} color="black" style={{marginRight:10}}/>
          <Text style={{fontSize:18}}>Select Date</Text>
          </Block>

          <Block>
            {
              Dateexpanded ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {Dateexpanded && (
        <View style={{marginTop:20}}>
          {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

<Text>{selectedDate.toISOString().split('T')[0]}</Text>
        </View>
      )}
    </View>
   

            </Block>

            <Block style={{marginTop:30}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleTimeAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
          <Feather name="clock" size={24} color="black" style={{marginRight:10}}/>
          <Text style={{fontSize:18}}>Select Time</Text>
          </Block>

          <Block>
            {
              Timeexpanded ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {Timeexpanded && (
        <View style={{marginTop:20}}>
           {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
           )}
          <Text>Time: {selectedTime.toLocaleTimeString()}</Text>
        </View>
      )}
    </View>
   

            </Block>


            <Block style={{marginTop:30}}>
   <View style={{borderWidth:1,borderColor:"#C8C8C8",padding:15,backgroundColor:"#fff", marginTop:10,borderRadius:5}}>
      <TouchableOpacity  activeOpacity={0.7} onPress={toggleAddressAccordion}>
        <Block style={styles.Space_Between}>
          <Block style={{flexDirection:"row",alignItems:"center"}}>
          <Ionicons name="location-sharp" size={24} color="black" style={{marginRight:10}} />
          <Text style={{fontSize:18}}>Pickup Address</Text>
          </Block>

          <Block>
            {
              Addressexpanded ? <MaterialIcons name="keyboard-arrow-up" size={28} color="black" /> 
              :
              <MaterialIcons name="keyboard-arrow-down" size={28} color="black" />
            }
          

          
          </Block>
         
        </Block>
      </TouchableOpacity>
      {Addressexpanded && (

        
        <View style={{marginTop:20}}>

          <Block right>
            <Button color='black' onPress={handelAddNewAddress}>Add New</Button>
          </Block>
          {
           Address !== null &&
                
                <View style={{ backgroundColor: "#fff", padding: 15,borderRadius:25 }}>
                <Block style={styles.Space_Between}>
                <Text style={{ fontSize: 16, fontWeight: 500 ,letterSpacing:1}}>{Address.name}</Text> 
                
                </Block>
               
                {
                  Address.house !== "null" && <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>
                  {Address.house},{Address.area}
                 </Text>
                }
                {
                  Address.address !== "null" &&  <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>
                  {Address.address} 
                  </Text>
                }
  
                {
                  Address.city !== "null" && <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>{Address.city},{Address.postalCode},{Address.state}</Text>
                }
               
                {
                  Address.country !== "null" && <Text style={{ fontSize: 12, fontWeight: 500,marginTop:5,letterSpacing:1 }}>
                  {Address.country}
                </Text>
                }
              
              </View>
          } 
         
          
        </View>
      )}
    </View>
   

            </Block>


           


           <Block style={{flexDirection:"row",alignItems:"center",marginTop:30}}>
    
          <AntDesign name="questioncircle" size={24} color="grey" style={{marginRight:10}}/>
          <Text style={{fontSize:16,color:"grey"}}>Please Fill All The Required Details To Schedule Pickup</Text>
          </Block>

          <Block  style={{marginTop:30,marginBottom:160,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Button color='crimson' onPress={clearCartFromAsyncStorage}>Clear Items</Button>
           <Button color='teal' onPress={handelShedulePickup}>Schedule Pickup</Button>
           </Block>

     </Block>

      </Block>
      </ScrollView >
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF",

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

  });