import { ImagePickerIOS, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Login  from './Screens/Auth/Login';
import Register from './Screens/Auth/Register';
import ForgotPassword from './Screens/Auth/ForgotPassword';
import SplashScreen from './Screens/Auth/SplashScreen';

import OHome from './App/OwnerScreens/Home';
import OPosts from './App/OwnerScreens/PostRoom/Posts';
import OPostInfo from './App/OwnerScreens/PostRoom/PostInfo';
import ORooms from './App/OwnerScreens/Room/Rooms';
import ORoomInfo from './App/OwnerScreens/Room/RoomInfo';
import OTenants from './App/OwnerScreens/Tenant/Tenants';
import OTenantInfo from './App/OwnerScreens/Tenant/TenantInfo';
import OFinance from "./App/OwnerScreens/Finance/Finance";
import OTransactions from './App/OwnerScreens/Finance/Transactions';
import OTransactionInfo from './App/OwnerScreens/Finance/TransactionInfo';
import OBills from './App/OwnerScreens/Finance/Bills';
import OBillInfo from './App/OwnerScreens/Finance/BillInfo';
import OServices from './App/OwnerScreens/Service/Services';
import OAddService from './App/OwnerScreens/Service/AddService';
import OTroubles from './App/OwnerScreens/Trouble/Troubles';
import OTroubleInfo from './App/OwnerScreens/Trouble/TroubleInfo';
import OAddTrouble from './App/OwnerScreens/Trouble/AddTrouble';

import CHome from './App/CustomerScreens/Home';
import CBills from './App/CustomerScreens/Bill/Bills';
import CBillInfo from './App/CustomerScreens/Bill/BillInfo';
import CServices from './App/CustomerScreens/Service/Services';
import CAddService from './App/CustomerScreens/Service/AddService';
import CTroubles from './App/CustomerScreens/Trouble/Troubles';
import CTroubleInfo from './App/CustomerScreens/Trouble/TroubleInfo';
import CAddTrouble from './App/CustomerScreens/Trouble/AddTrouble';
import CProfileInfo from './App/CustomerScreens/Profile/ProfileInfo';
import CUpdateProfile from './App/CustomerScreens/Profile/UpdateProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      {/* <Stack.Screen name="Home" component={OHome} />
      <Stack.Screen name="Posts" component={OPosts} />
      <Stack.Screen name="PostInfo" component={OPostInfo} />
      <Stack.Screen name="Rooms" component={ORooms} />
      <Stack.Screen name="RoomInfo" component={ORoomInfo} />
      <Stack.Screen name="Tenants" component={OTenants} />
      <Stack.Screen name="TenantInfo" component={OTenantInfo} />
      <Stack.Screen name="Finance" component={OFinance} />
      <Stack.Screen name="Transactions" component={OTransactions} />
      <Stack.Screen name="TransactionInfo" component={OTransactionInfo} />
      <Stack.Screen name="Bills" component={OBills} />
      <Stack.Screen name="BillInfo" component={OBillInfo} />
      <Stack.Screen name="Services" component={OServices} />
      <Stack.Screen name="AddService" component={OAddService} />
      <Stack.Screen name="Troubles" component={OTroubles} />
      <Stack.Screen name="TroubleInfo" component={OTroubleInfo} />
      <Stack.Screen name="AddTrouble" component={OAddTrouble} />
    </Stack.Navigator>
  </NavigationContainer>
  ); */}

       <Stack.Screen name="Home" component={CHome} />
       <Stack.Screen name="Bills" component={CBills} />
       <Stack.Screen name="BillInfo" component={CBillInfo} />
       <Stack.Screen name="Services" component={CServices} />
       <Stack.Screen name="AddService" component={CAddService} />
       <Stack.Screen name="Troubles" component={CTroubles} />
       <Stack.Screen name="TroubleInfo" component={CTroubleInfo} />
       <Stack.Screen name="AddTrouble" component={CAddTrouble} />
       <Stack.Screen name="ProfileInfo" component={CProfileInfo} />
       <Stack.Screen name="UpdateProfile" component={CUpdateProfile} />
     </Stack.Navigator>
   </NavigationContainer>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

