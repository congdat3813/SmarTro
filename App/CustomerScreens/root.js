import CHome from './Home';
import CPosts from './SearchRoom/Posts';
import CPostInfo from './SearchRoom/PostInfo';
import CRoomInfo from './Room/RoomInfo';
import CBills from './Bill/Bills';
import CBillInfo from './Bill/BillInfo';
import CServices from './Service/Services';
import CTroubles from './Trouble/Troubles';
import CTroubleInfo from './Trouble/TroubleInfo';
import CAddTrouble from './Trouble/AddTrouble';
import CSavedPosts from './SavedPosts/SavedPosts';
import CProfileInfo from './Profile/ProfileInfo';
import CUpdateProfile from './Profile/UpdateProfile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function CRoot() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={CHome} />
       <Stack.Screen name="Posts" component={CPosts} />
       <Stack.Screen name="PostInfo" component={CPostInfo} />
       <Stack.Screen name="RoomInfo" component={CRoomInfo} />
       <Stack.Screen name="Bills" component={CBills} />
       <Stack.Screen name="BillInfo" component={CBillInfo} />
       <Stack.Screen name="Services" component={CServices} />
       <Stack.Screen name="Troubles" component={CTroubles} />
       <Stack.Screen name="TroubleInfo" component={CTroubleInfo} />
       <Stack.Screen name="AddTrouble" component={CAddTrouble} />
       <Stack.Screen name="SavedPosts" component={CSavedPosts} />
       <Stack.Screen name="ProfileInfo" component={CProfileInfo} />
       <Stack.Screen name="UpdateProfile" component={CUpdateProfile} />
     </Stack.Navigator>
    );
}