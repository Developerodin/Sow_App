import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Alert,Modal ,Image  } from "react-native";
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
import { AppProvider, useAppContext } from './Context/AppContext';
import * as SplashScreen from 'expo-splash-screen';
import { WelcomeScreen } from './Pages/OnBoarding/SplashScreen/WelcomeScreen';
import { Schedule } from './Pages/Schedule/Schedule';
import { AboutCompany } from './Pages/Profile/ProfileTabs/AboutCompany';
import { TermsCondition } from './Pages/Profile/ProfileTabs/TermsCondition';
import { UpgradeTo } from './Pages/Profile/ProfileTabs/UpgradeTo';
// import { Address } from './Pages/Profile/ProfileTabs/Address/Address';
import { OrderPlacedSuccessfull } from './Pages/Schedule/OrderPlacedSuccessfull';
import { AddAddress } from './Pages/SignUp/Registration/AddAddress';
import { KycVerification } from './Pages/Kyc/KycVerification';
import { KycVerification2 } from './Pages/Kyc/KycVerification2';
import { KycPanUplode } from './Pages/Kyc/KycPanUplode';
import { KycEnterGstDeatils } from './Pages/Kyc/KycEnterGstDeatils';
import { KYCPending } from './Pages/Kyc/KYCPending';
import { Notification } from './Pages/Notification/Notification';
import { PickupAddress } from './Pages/Cart/PickupAddress';
import { Cart } from './Pages/Cart/Cart';
import { ScheduleAddress } from './Pages/Cart/ScheduleAddress';
import { PrivacyPolicy } from './Pages/Profile/ProfileTabs/PrivacyPolicy';
import { AccountType } from './Pages/Profile/ProfileTabs/AccountType';
import { AccountSettings } from './Pages/Profile/ProfileTabs/AccountSettings';
import { ManageAddress } from './Pages/Profile/ProfileTabs/ManageAddress';
import { Sell} from './Pages/Sell/Sell';
import { SellScrap} from './Pages/Sell/SellScrap';
import { PickupConfirmation } from './Pages/Cart/PickupConfirmation';
import { MyPost } from './Pages/MyPost/MyPost';
import { MyPostHistoryDetails } from './Pages/MyPost/MyPostHistoryDetails';
import { QuotationsDetails } from './Pages/MyPost/QuotationsDetails';
import { Quotations } from './Pages/MyPost/Quotations';
import { QuotationAccepted } from './Pages/MyPost/QuotationAccepted';
import { VerifyProfileStatus } from './Pages/SignUp/Registration/VerifyProfileStatus';
import { WebViewApp } from './Pages/WebViewPage/WebView';
import { Base_url } from './Config/BaseUrl';
import axios from 'axios';
import { KYCPending2 } from './Pages/kycProfile/KYCPending2';
import { KycEnterGstDeatils2 } from './Pages/kycProfile/KycEnterGstDeatils2';
import { KycPanUplode2 } from './Pages/kycProfile/KycPanUplode2';
import { KycVerification3 } from './Pages/kycProfile/KycVerification3';
import { KycVerificationprofile2 } from './Pages/kycProfile/KycVerificationprofile2';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
  const [profileType,setProfileType] = useState(null);
const { userDetails,updateProfiletype,setUpdateProfiletype } = useAppContext();
  const getUserProfileType = async (userId) => {
    try {
      const response = await axios.get(`${Base_url}b2cUser/get-profile-type/${userId}`);
      
      console.log('Profile type retrieved successfully:', response.data.data);
     const res = response.data.data;
     setProfileType(res.profileType)
      return response.data;
    } catch (error) {
      console.error('Error retrieving profile type:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

  useEffect(()=>{
    getUserProfileType(userDetails.id)
  },[updateProfiletype])
  return (
 
<Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor :'#fff',
      
      tabBarStyle: { backgroundColor: '#14B57C',color:"#fff",position:'absolute',bottom:0,paddingTop:10,paddingBottom:10,height:64,borderTopLeftRadius:30,borderTopRightRadius:30,borderColor:'#14b57c',borderWidth:1}
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (

          
            <Image
            source={require('./assets/media/home.png')} 
            style={{ width: 25, height: 25, tintColor: color }}
          />
          ),
          headerShown: false,
        }}
       
     
      />
      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
            source={require('./assets/media/sell.png')} 
            style={{ width: 25, height: 25, tintColor: color }}
          />
          ),
          headerShown: false,
        }}
      
       
      />
{
  profileType && (profileType=== "office" || profileType=== "shopkeeper") && <Tab.Screen
  name="My Post"
  component={MyPost}
  options={{
    tabBarIcon: ({ color, size }) => (
      <Image
      source={require('./assets/media/Plus.png')} 
      style={{ width: 25, height: 25, tintColor: color }}
    />
    ),
    headerShown: false,
  }}

 
/>
}


<Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
           
            <Image
            source={require('./assets/media/cart.png')} 
            style={{ width: 25, height: 25, tintColor: color }}
          />
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
            <Image
            source={require('./assets/media/profile.png')} 
            style={{ width: 25, height: 25, tintColor: color }}
          />
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
       {/* Login */}
         <Stack.Navigator initialRouteName={ Auth ? 'Tabs' : 'Login'}>
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

{/* <Stack.Screen name="MyPost" component={MyPost}
          options={{
            headerShown: false,
          }}
        /> */}

<Stack.Screen name="Profile" component={Profile}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="AccountType" component={AccountType}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="AccountSettings" component={AccountSettings}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="ManageAddress" component={ManageAddress}
          options={{
            headerShown: false,
          }}
        />
<Stack.Screen name="Order Details" component={OrderDetail}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="Post Details" component={MyPostHistoryDetails}
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
            headerShown: true,
          }}
        />
<Stack.Screen name="AddAddress" component={AddAddress}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="KYC Verification" component={KycVerification}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="KYC Verification2" component={KycVerification2}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="KycPanUplode" component={KycPanUplode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="KycEnterGstDeatils" component={KycEnterGstDeatils}
          options={{
            headerShown: false,
          }}
        />
<Stack.Screen name="KYCPending" component={KYCPending}
          options={{
            headerShown: false,
          }}
        />





<Stack.Screen name="KYC Verificationprfile2" component={KycVerificationprofile2}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="KYC Verification3" component={KycVerification3}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="KycPanUplode2" component={KycPanUplode2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="KycEnterGstDeatils2" component={KycEnterGstDeatils2}
          options={{
            headerShown: false,
          }}
        />
<Stack.Screen name="KYCPending2" component={KYCPending2}
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
        <Stack.Screen name="Notification" component={Notification} options={{
            headerShown: false ,
          }}/>
       
        <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{
            headerShown: false,
          }}/>




<Stack.Screen
            name="About Company"
            component={AboutCompany}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Privacy Policy"
            component={PrivacyPolicy}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Terms and Condition"
            component={TermsCondition}
            options={{
              headerShown: true,
            }}
          />
           <Stack.Screen name="Upgrade Profile" component={UpgradeTo} options={{
            headerShown: true,
          }}/>

          <Stack.Screen name="Pickup Address" component={PickupAddress} options={{
            headerShown: true,
          }}/>
          <Stack.Screen name="Schedule Address" component={ScheduleAddress} options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="SellScrap" component={SellScrap} options={{
           headerShown: false,
          }}/>

          {/* <Stack.Screen name="Cart" component={Cart} options={{
            headerShown: false,
          }}/> */}

          <Stack.Screen name="PickupConfirmation" component={PickupConfirmation} options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="QuotationsDetails" component={QuotationsDetails} options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="Quotations" component={Quotations} options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="QuotationAccepted" component={QuotationAccepted} options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="VerifyProfileStatus" component={VerifyProfileStatus} options={{
            headerShown: false,
          }}/>

<Stack.Screen
            name="Scrap On Wheels"
            component={WebViewApp}
            options={{
              headerShown: true,
            }}
          />
      
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
