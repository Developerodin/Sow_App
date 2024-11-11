import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet,ScrollView,  View,Dimensions,TouchableOpacity, Image,Animated ,Modal } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Block, Text, Input, theme } from "galio-framework";
const {width, height} = Dimensions.get('window');
import Logo from "../../Images/Logo_1.png";
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from 'react-native';
import { MyMap } from "../../../Components/Maps/MyMap";
import { useAppContext } from "../../../Context/AppContext";

// import CheckBox from 'react-native-check-box';

export const PersonalDetails = () => {
    const navigation= useNavigation()
  const { update, setUpdate,SelectedAddressFromMap,setSelectedAddressFromMap } = useAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const [AllUserAddresses, setAllUsersAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    house: "",
    area: "",
    directions: "",
  });
  const selectAddress = (address) => {
    setSelectedAddress(address);
    saveSelectedAddress(address);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setIsAddressModalVisible(!isAddressModalVisible);
  };

  const ConfirmLoction  = ()=>{
    console.log("Address from loction ==>", SelectedAddressFromMap)
    toggleModal();
    setTimeout(()=>{
      toggleModal2()
    },500)
    
  }
  const saveAddress = () => {
   
    const newAddress1 ={

      address: `${SelectedAddressFromMap.district}`,
      landmark:`${SelectedAddressFromMap.street}`,
      postalCode:SelectedAddressFromMap.postalCode,
      city: `${SelectedAddressFromMap.city}`,
      state:SelectedAddressFromMap.region,
      country: `${SelectedAddressFromMap.country}`,
      mobileNumber: "",
      name: SelectedAddressFromMap.name,
      house:newAddress.house,
      area:newAddress.area,
      directions:newAddress.directions
    }
    // setAddresses([...addresses, newAddress1]);
    setnewAddressinStorage(newAddress1)
    toggleModal();
    // Clear input fields
    setNewAddress({
      house:"",
      area:"",
      directions:"",
    });
    setIsModalVisible(false)
    setIsAddressModalVisible(false)
  };
const setnewAddressinStorage =async(address)=>{
  const Data = [...AllUserAddresses,address]
  // console.log("Data",Data)
  try {
    
      await AsyncStorage.setItem(
        "UserAllAddress",
        JSON.stringify(Data)
      );
      console.log("Address save to storage ")
      setUpdate((prev) => prev + 1);
    
  } catch (error) {
    console.error("Error saving address to AsyncStorage:", error);
  }
}
  const saveSelectedAddress = async (address) => {
    try {
      if (address) {
        await AsyncStorage.setItem(
          "UserAddress",
          JSON.stringify(address)
        );
        setUpdate((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error saving address to AsyncStorage:", error);
    }
  };

  const GettAllAddressFromStorage=async()=>{
    AsyncStorage.getItem("UserAllAddress").then((storedData) => {
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setAllUsersAddresses(parsedData)
        console.log("All Address",parsedData);
      } else {
        setAllUsersAddresses([])
        console.log("All Address Data not found in AsyncStorage");
      }
    }).catch((error) => {
      setAllUsersAddresses([])
      console.error("Error retrieving data from AsyncStorage: ", error);
    });
  }

  const getSelectedAddressFromStorage = async ()=>{
    AsyncStorage.getItem("UserAddress").then((storedData) => {
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setSelectedAddress(parsedData)
        console.log("All Address",parsedData);
      } else {
        setSelectedAddress({})
        console.log("All Address Data not found in AsyncStorage");
      }
    }).catch((error) => {
      setSelectedAddress({})
      console.error("Error retrieving data from AsyncStorage: ", error);
    });
  }

  const DeleteAddress = async(name)=>{
    const Data = AllUserAddresses.filter ((el)=>el.name !== name)
  // console.log("Data",Data)
  if(selectedAddress.name === name){
    try {
      if (selectedAddress) {
        await AsyncStorage.setItem(
          "UserAddress",
          JSON.stringify({})
        );
        setUpdate((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error saving address to AsyncStorage:", error);
    }
  }
  try {
    
      await AsyncStorage.setItem(
        "UserAllAddress",
        JSON.stringify(Data)
      );
      console.log("Address save to storage ")
      setUpdate((prev) => prev + 1);
    
  } catch (error) {
    console.error("Error saving address to AsyncStorage:", error);
  }
  }
  useEffect(()=>{
   GettAllAddressFromStorage()
   getSelectedAddressFromStorage()
  },[update])
  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);

    const [formData, setFormData] = useState({
      email: "",
      name:"",
      city:""
    });
    const [showShopDetails,setShowShopDetails]= useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isFocused, setIsFocused] = useState({
      ForName:false,
      ForEmail:false,
      ForCity:false
    });
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const customStyle ={
      Card1: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForName ? 4 : 0
      },
      Card2: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForEmail ? 4 : 0
      },
      Card3: {
      
        borderRadius:5,
        padding:10,
        backgroundColor:"#fff",
        elevation:isFocused.ForCity ? 4 : 0
      },
    }
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
    const handelPersonalDetailSubmit=()=>{
        // setShowShopDetails(true);
        navigation.navigate("Login")
    }

    const handleInputChange = (fieldName, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    };

    const handelShopDetails=()=>{
        navigation.navigate("UplodeShopImage")
    }

    const handelAddress = () => {
      navigation.navigate("AddAddress")
    };

    const handleFocus = (Name) => {
      setIsFocused((prevState) => ({
        ForName: Name === "name",
        ForEmail: Name === "email",
        ForCity: Name === "city"
      }));
   
    };
  
    const handleBlur = (Name) => {
      setIsFocused((prevState) => ({
        ...prevState,
        [Name]: false
      }));
      
    };

    const handelBack = () => {
      navigation.navigate("Login")
    };

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardOpen(true);
      });
  
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardOpen(false);
      });
  
      // Clean up the event listeners when the component unmounts
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  return (
    <View style={styles.container}>
    <StatusBar style="dark" />
  
        <ScrollView>
      
       <View style={{alignItems:"left",marginTop:35,width:width}}>
         
       {!isKeyboardOpen &&
         <Block>
           
              <AntDesign
                onPress={handelBack}
                name="arrowleft"
                size={30}
                color="grey"
                style={{ marginLeft: 20 }}
              />
            
          </Block>
}
         <Block center style={{marginTop:20}}>
              <LottieView
                style={styles.lottie}
                source={require("../../../assets/Animations/Animation - 1698917253840.json")}
                autoPlay
                loop
              />
            </Block>
   
       
     
         <View style={{alignItems:"left",padding:10,justifyContent:"center"}}>
         {/* {
        showShopDetails ?
         <Text style={{fontSize:24,fontWeight:500}}>Enter Shop Details</Text>
         : */}
         {/* <Text style={{fontSize:24,fontWeight:500}}>Enter Details</Text> */}
{/* } */}
        
        {/* <Block style={[styles.Space_Between,{marginTop:30}]}>
            <Text style={{fontSize:14,fontWeight:500}}>Registering As: <Text style={{color:"#EA5932"}}>Scrap Collector</Text> </Text>
            <Text style={{fontSize:14,fontWeight:500,color:"#6096FF"}} >change</Text>
        </Block> */}
         
         </View>
   
       </View>

       {/* {
        showShopDetails ?
        <Block style={{padding:10}}>
          

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Entypo name="shop" size={20}  color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Shop Name</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="vcard-o" size={20} color="black" />
         
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Udhyam Adhar No.</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>

        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <FontAwesome name="credit-card" size={20} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter GST No..</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>
        <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons name="location-sharp" size={20} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Shop Address</Text>
            </Block>
            <Block>
                <Input/>
            </Block>
        </Block>
       </Block>
        : */}
        <Block style={{padding:10}}>
          

        <Block style={{marginTop:20}}>
            {/* <Block style={{flexDirection:"row",alignItems:"center"}}>
            <Ionicons name="person" size={18} color="black" />
            <Text style={{fontSize:20,fontWeight:500,marginLeft:6}}>Enter Name</Text>
            </Block>
            <Block>
                <Input/>
            </Block> */}
<Block style={[ customStyle.Card1,{marginTop:20}]}>
                <TextInput

        variant="standard"
        
        label="Name"
        leading={(props) => <Icon name={isFocused.ForName ? 'account-circle' : 'account'} {...props} />}
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
        onFocus={()=>handleFocus("name")}
        onBlur={()=>handleBlur("ForName")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
            
        </Block>

      

        <Block style={{marginTop:30}}>
        <Block style={[ customStyle.Card2]}>
                <TextInput

        variant="standard"
        keyboardType="email-address"
        label="Email"
        leading={(props) => <Icon name={isFocused.ForEmail ? 'mail' : 'email'} {...props} />}
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        onFocus={()=>handleFocus("email")}
        onBlur={()=>handleBlur("ForEmail")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
                </Block>
        </Block>

        <Block style={{marginTop:30}}>
        <Block style={[ customStyle.Card3]} onPress={handelAddress}>
                <TextInput
        onPress={handelAddress}
        variant="standard"
        keyboardType="default"
        label="Address"
        leading={(props) => <Icon name={isFocused.ForCity ? 'map-marker' : 'city'} {...props} />}
        value={formData.city}
        onChangeText={(text) => handleInputChange("city", text)}
        onFocus={()=>handleFocus("city")}
        onBlur={()=>handleBlur("ForCity")}
        color={ 'white'}
        inputStyle={{ borderWidth: 0, paddingBottom:0,fontSize:20,letterSpacing:3 }}
        // inputContainerStyle={{ borderBottomWidth:1, paddingBottom:0,borderColor:`${isFocused ? "#65be34" : "#fff" }`}}
        
      />
       <Button
        title="Add Address"
        onPress={toggleModal}
        color="#65be34"
      />
                </Block>
        </Block>

      
       
       </Block>
    {/* } */}

      
        
    <Block right style={[{ padding: 20, marginTop: 10 }]}>
             
                <Button
                  title="sign up"
                  color="#65be34"
                  style={{ width: 150, padding: 5 }}
                  onPress={handelPersonalDetailSubmit}
                  trailing={(props) => <Icon name="send" {...props} />}
                  tintColor="#fff"
                />
              
            </Block>
      
   
      
       </ScrollView>
       <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
        
            <MyMap navigation={navigation} />
          
          <Block style={{backgroundColor:"#fff",flexDirection:"row",justifyContent:"left",alignItems:"center",height:50}}>
          <Ionicons onPress={toggleModal} name="arrow-back-circle" style={{marginLeft:10}} size={30} color="#65be34" />
          <Text style={{fontSize:18,fontWeight:500,marginLeft:10}}>Select Address</Text>
          </Block>

{
 <Block style={{padding:11,backgroundColor:"#fff",height:200,position:"absolute",bottom:0,width:width,borderTopLeftRadius:10,borderTopRightRadius:10}}>
              
  <Block>
    <Text  style={{color:"grey",fontSize:13,fontWeight:500,letterSpacing:1}}>SELECT PICKUP LOCATION</Text>
  </Block>
  
  {
   SelectedAddressFromMap ?  
    <Block >
    <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:5}}>
         <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
         <Ionicons name="md-location" size={24} color="crimson" />
         <Text style={{fontSize:18,fontWeight:"bold",letterSpacing:1,marginLeft:5}} >{SelectedAddressFromMap.street}</Text>
         </Block>

         {/* <Block>
         <Button color="#65be34" size={"small"} style={{width:80,height:26}}>CHANGE</Button>
         </Block> */}
     </Block>
     <Block left style={{width:width*0.7,marginTop:0}} >
      <Text style={{fontSize:13,fontWeight:400,letterSpacing:1}}>{SelectedAddressFromMap.name},{SelectedAddressFromMap.district}</Text>
      <Text style={{fontSize:13,fontWeight:400,letterSpacing:1,marginTop:4}}>{SelectedAddressFromMap.city},{SelectedAddressFromMap.region} {SelectedAddressFromMap.postalCode},{SelectedAddressFromMap.country}</Text>
     </Block>
    </Block>
    :
      <Block>
       
         <Block center>
             <LottieView
                style={styles.lottie}
                source={require("../../../assets/Animations/Animation - 1699521355549.json")}
                autoPlay
                loop
              />
       </Block>
      </Block>
  }
  
  
   <Block style={[styles2.AlignCenter,{marginTop:20}]}>
  
   <Button color="#65be34" title="CONFIRM LOCATION" style={{width:width*0.9}} tintColor="#fff" onPress={ConfirmLoction} />
        
   </Block>
</Block>
}
          

          {/* <Block>
            <Text style={styles.modalHeading}>Add Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newAddress.name}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, name: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newAddress.address}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, address: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={newAddress.landmark}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, landmark: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="City"
              value={newAddress.city}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, city: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Country"
              value={newAddress.country}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, country: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={newAddress.mobileNumber}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, mobileNumber: text })
              }
            />
          </Block> */}

          {/* Add similar TextInput fields for other address details */}

          {/* <Block style={[styles2.Space_Between, { width: "100%" }]}>
            <Button onPress={saveAddress}>Save</Button>
            <Button onPress={toggleModal}> CLose </Button>
          </Block> */}
        </View>
      </Modal>


      <Modal visible={isAddressModalVisible} animationType="slide">
        <View style={styles.modalContainer2}>
          
          <Block style={{backgroundColor:"#fff",flexDirection:"row",justifyContent:"left",alignItems:"center",height:50}}>
          <Ionicons onPress={toggleModal2} name="arrow-back-circle" style={{marginLeft:10}} size={30} color="#65be34" />
          {/* <Text style={{fontSize:18,fontWeight:500,marginLeft:10}}>Select Address</Text> */}
          </Block>

          {
            SelectedAddressFromMap &&  
            <Block style={{marginTop:20}}>
            <Block style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:5}}>
                 <Block style={{flexDirection:"row",justifyContent:"left",alignItems:"center"}}>
                 <Ionicons name="md-location" size={24} color="crimson" />
                 <Text style={{fontSize:18,fontWeight:"bold",letterSpacing:1,marginLeft:5}} >{SelectedAddressFromMap.street}</Text>
                 </Block>
        
                
             </Block>
             <Block left style={{width:width*0.7,marginTop:10}} >
              <Text style={{fontSize:13,fontWeight:400,letterSpacing:1}}>{SelectedAddressFromMap.name},{SelectedAddressFromMap.district}</Text>
              <Text style={{fontSize:13,fontWeight:400,letterSpacing:1,marginTop:4}}>{SelectedAddressFromMap.city},{SelectedAddressFromMap.region} {SelectedAddressFromMap.postalCode},{SelectedAddressFromMap.country}</Text>
             </Block>
            </Block>
          }

          <Block style={{marginTop:40}}>
            

            <TextInput
              value={newAddress.house}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, house: text })
              }
              variant="standard"
              keyboardType="ascii-capable"
              label="House / Flat / Block No"
              color={ 'grey'}
              inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:15 }}
            />

            <TextInput
             
              value={newAddress.area}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, area: text })
              }
              variant="standard"
              keyboardType="ascii-capable"
              label="Apartment / Road / Area (optional)"
              color={ 'grey'}
              inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:15 }}
              style={{marginTop:20}}
            />

            <TextInput
             
              value={newAddress.directions}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, directions: text })
              }
              variant="standard"
              keyboardType="ascii-capable"
              label="Directions to reach (Optional)"
              color={ 'grey'}
              inputStyle={{ borderWidth: 0, paddingBottom:0,color:"black",fontSize:15 }}
              style={{marginTop:20}}
            />

           
          </Block>

          {/* Add similar TextInput fields for other address details */}

          <Block center style={[styles2.Space_Between, { width:width*0.9,position:"absolute",bottom:40 }]}>
            <Button color="#65be34" title="save" style={{width:width*0.4}} tintColor="#fff" onPress={saveAddress} />
            <Button color="#65be34" title="close" style={{width:width*0.4}} tintColor="#fff" onPress={toggleModal2} />
          </Block>
        </View>
      </Modal>
       </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"#FFF"
    },
    lottie: {
      width: width * 0.9,
      height: width * 0.5,
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
      modalContainer: {
        flex: 1,
       
      },
      modalContainer2: {
        flex: 1,
        padding:10
       
      },
      modalHeading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
      },
      heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
      },
      addressContainer: {
        backgroundColor: "#fff",
        marginBottom: 25,
        elevation:1,
        borderBottomWidth:1,
        borderColor:"grey"
      },
      selectedAddress: {
        borderWidth:2,
        borderColor: "#65be34",
        borderRadius:20
      },
  
    });
  
    const styles2 = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      AlignCenter: {
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
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
      },
      input: {
        width: "100%",
        height: 40,
        borderColor: "grey",
        borderBottomWidth: 0.5,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      error: {
        color: "red",
        marginTop: 10,
      },
      borderView: {
        borderWidth: 1,
        borderColor: "red",
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
      },
      bottomBlock: {
        position: "absolute",
        bottom: 0,
        width: "100%",
      },
      textContainer: {
        position: "absolute",
        bottom: 40, // Adjust as needed
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      },
      text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
    });