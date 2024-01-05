import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Alert,Modal  } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer,useFocusEffect,useNavigation  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
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
import { OrderDetail } from './Pages/Orders/OrderDetail';
import { AppProvider } from './Context/AppContext';
import * as SplashScreen from 'expo-splash-screen';
import { WelcomeScreen } from './Pages/OnBoarding/SplashScreen/WelcomeScreen';
import { Schedule } from './Pages/Schedule/Schedule';
import { AboutCompany } from './Pages/Profile/ProfileTabs/AboutCompany';
import { TermsCondition } from './Pages/Profile/ProfileTabs/TermsCondition';
import { UpgradeTo } from './Pages/Profile/ProfileTabs/UpgradeTo';
import { Address } from './Pages/Profile/ProfileTabs/Address/Address';
import { OrderPlacedSuccessfull } from './Pages/Schedule/OrderPlacedSuccessfull';
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
       
     
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <FontAwesome name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      
       
      />

<Tab.Screen
        name="Rates"
        component={Market}
        options={{
          tabBarIcon: ({ color, size }) => (
           
            <MaterialCommunityIcons name="tag-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
       
      />
      



{/* <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <Feather name="file-text" size={size} color={color} />
          ),
          
          headerShown: false,
        }}
      
       
      /> */}
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
      
       
      />
 {/* <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            
            <Octicons name="checklist" size={size} color={color} />
          ),
          headerShown: false,
        }}
       
       
      />  */}

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

  const [Auth, setAuth]=useState(null);
  const [isAppFirstLaunched, setIsAppFirstLaunched] =useState(null);
  const [appIsReady, setAppIsReady] = useState(false);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
 
 

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync()
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(()=>{
    const checkAuthAndFirstLaunch = async () => {
       try {
         // Check authentication status
         const authStatus = await AsyncStorage.getItem('Auth') || null;
         setAuth(authStatus === 'true');
 
         // Check if app is launched for the first time
         const appData = await AsyncStorage.getItem('isAppFirstLaunched') || null;
         if (appData === null) {
           setIsAppFirstLaunched(true);
           await AsyncStorage.setItem('isAppFirstLaunched', 'false');
         } else {
           setIsAppFirstLaunched(false);
         }
       } catch (err) {
         console.log('Error while checking Auth and First Launch:', err);
       }
     };
 
     checkAuthAndFirstLaunch();
   },[])
   
   if (!appIsReady) {
    return <WelcomeScreen/>
  }
 
  return (
    <AppProvider>
<NavigationContainer onLayout={onLayoutRootView} >
      {/* {
       isAppFirstLaunched !== null && Auth !== null && */}
         <Stack.Navigator initialRouteName={isAppFirstLaunched ? 'AppSlides' : Auth ? 'Tabs' : 'AppSlides'}>
         {/* <Stack.Navigator initialRouteName={'AppSlides'}> */}
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

<Stack.Screen name="Order Details" component={OrderDetail}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="Schedule Pickup" component={Schedule}
          options={{
            headerShown: true,
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

<Stack.Screen name="Order Placed Successfull" component={OrderPlacedSuccessfull}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AppSlides" component={AppSlides}
          options={{
            headerShown: false,
          }}
        />
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

<Stack.Screen name="About Company" component={AboutCompany} options={{
            headerShown: true,
          }}/>
    
    <Stack.Screen name="Terms and Condition" component={TermsCondition} options={{
            headerShown: true,
          }}/>
           <Stack.Screen name="Upgrade Profile" component={UpgradeTo} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="Address" component={Address} options={{
            headerShown: true,
          }}/>
      
      </Stack.Navigator>
      {/* } */}
     
    </NavigationContainer>
   </AppProvider>
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
