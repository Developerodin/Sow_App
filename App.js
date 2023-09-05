import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Alert,Modal  } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer,useFocusEffect,useNavigation  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Home } from "./Pages/Home/Home";
import { Invoice } from "./Pages/Invoices/Invoice";
import { Market } from "./Pages/Market/Market";
import { Profile } from "./Pages/Profile/Profile";
import {AppSlides} from "./Pages/OnBoarding/AppSlides/AppSlides";
import { Orders } from "./Pages/Orders/Orders";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/Signup";
import { Feather } from '@expo/vector-icons'; 
import { StartScreen } from './Pages/OnBoarding/StartScreen/StartScreen';
import { OTPVerify } from './Pages/OnBoarding/OTP_Verification/OTPVerify';
import { RegisterAs } from './Pages/SignUp/Registration/Registeras';
import { PersonalDetails } from './Pages/SignUp/Registration/PersonalDetails';
import { UplodeShopImage } from './Pages/SignUp/Registration/UplodeShopImage';
import { RegisterSuccessfull } from './Pages/SignUp/Registration/RegisterSuccessfull';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Inventory } from './Pages/Inventory/Inventory';
import { Octicons } from '@expo/vector-icons'; 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
  

  // const handleTabPress = async (e,tabName) => {
  //   console.log("tab pressed: " + tabName)
  //   if (tabName !== 'Home' && !isLoggedIn) {
  //     e.preventDefault();
  //     setSelectedTabs(tabName);
  //     setModalVisible(true);
  //   } else {
      
  //     setModalVisible(false);
  //     setSelectedTabs(tabName);
  //   }
  // }
  return (
 
<Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor :'grey',
      tabBarLabelStyle:{color:"black"},
      tabBarStyle: { backgroundColor: '#F1F1F1',color:"#fff",position:'absolute',bottom:0,paddingTop:2,paddingBottom:3},
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (

          
            <Ionicons name="home" color={color} size={size}  />
          ),
          headerShown: false,
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     // e.preventDefault();
        //     handleTabPress(e,'Home');
        //   },
        // }}
     
      />

<Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ color, size }) => (
           
            <MaterialCommunityIcons name="tag-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     handleTabPress(e,'Saved');
        //   },
        // }}
       
      />
      

<Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <FontAwesome name="shopping-bag" size={size} color={color} />
          ),
          headerShown: false,
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     handleTabPress(e,'Saved');
        //   },
        // }}
       
      />

<Tab.Screen
        name="Invoices"
        component={Invoice }
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <Feather name="file-text" size={size} color={color} />
          ),
          
          headerShown: false,
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     handleTabPress(e,'Saved');
        //   },
        // }}
       
      />

<Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            
            <Octicons name="checklist" size={size} color={color} />
          ),
          headerShown: false,
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     handleTabPress(e,'Saved');
        //   },
        // }}
       
      />

{/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <FontAwesome name="user" size={size} color={color} />
          ),
         
        }}
        listeners={{
          tabPress: (e) => {
            handleTabPress(e,'Saved');
          },
        }}
       
      /> */}
      {/* <Tab.Screen
        name="Trips"
        component={Profile }
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="line-graph" size={size} color={color} />
          ),
          
        }}
        listeners={{
          tabPress: (e) => {
            // e.preventDefault();
            handleTabPress(e,'Trips');
          },
        }}
        
       
      /> */}
      {/* <Tab.Screen
        name="Wallet"
        component={ Wallet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-wallet" size={size} color={color} />
          ),
         
        }}

        listeners={{
          tabPress: (e) => {
            // e.preventDefault();
            handleTabPress(e,'Wallet');
          },
        }}
        

       
       
      /> */}
      
    </Tab.Navigator>

 
    
  );
};
export default function App() {
  return (
   
<NavigationContainer >
      {/* {
       isAppFirstLaunched !== null && Auth !== null && */}
         {/* <Stack.Navigator initialRouteName={isAppFirstLaunched ? 'AppSlides' : Auth ? 'Tabs' : 'Login'}> */}
         <Stack.Navigator initialRouteName={'StartScreen'}>
        {/* <Stack.Screen name="Home" component={Home}
        options={{
          headerShown: false,
        }}
        /> */}
         <Stack.Screen name="StartScreen" component={StartScreen}
          options={{
            headerShown: false,
          }}
        />

     <Stack.Screen name="OTPVerify" component={OTPVerify}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen name="RegisterAs" component={RegisterAs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="FillPersonalDetails" component={PersonalDetails}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="UplodeShopImage" component={UplodeShopImage}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="RegisterSuccessfull" component={RegisterSuccessfull}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="AppSlides" component={AppSlides}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{
            headerShown: false,
          }}/>
    
      
      </Stack.Navigator>
      {/* } */}
     
    </NavigationContainer>
    // </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
