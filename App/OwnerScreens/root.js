import OHome from './Home';
import OPosts from './PostRoom/Posts';
import OPostInfo from './PostRoom/PostInfo';
import OAddPost from './PostRoom/AddPost';
import ORooms from './Room/Rooms';
import ORoomInfo from './Room/RoomInfo';
import OAddRoom from './Room/AddRoom';
import OTenants from './Tenant/Tenants';
import OTenantInfo from './Tenant/TenantInfo';
import OFinance from "./Finance/Finance";
import OTransactions from './Finance/Transactions';
import OTransactionInfo from './Finance/TransactionInfo';
import OBills from './Finance/Bills';
import OBillInfo from './Finance/BillInfo';
import OServices from './Service/Services';
import OAddService from './Service/AddService';
import OTroubles from './Trouble/Troubles';
import OTroubleInfo from './Trouble/TroubleInfo';
import OAddTrouble from './Trouble/AddTrouble';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function ORoot() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="Home" component={OHome} />
        <Stack.Screen name="Posts" component={OPosts} />
        <Stack.Screen name="PostInfo" component={OPostInfo} />
        <Stack.Screen name="AddPost" component={OAddPost} />
        <Stack.Screen name="Rooms" component={ORooms} />
        <Stack.Screen name="RoomInfo" component={ORoomInfo} />
        <Stack.Screen name="AddRoom" component={OAddRoom} />
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
    );
}