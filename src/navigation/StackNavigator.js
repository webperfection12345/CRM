import { createStackNavigator } from "@react-navigation/stack";
import Login from "../container/Login/Login";
import AccessRequest from "../container/AccessRequest/AccessRequest";
import ForgotPassword from "../container/FogotPassword/ForgotPassword";
import DrawerNavigator from "./DrawerNavigator";
import AccessRequestSent from "../container/AccessRequestSent/AccessRequestSent";
import EnterPin from "../container/EnterPin/EnterPin";
import Colors from "../utils/Colors";
import ContactsDetails from "../container/ContactsDetails/ContactsDetails";
import AddContacts from "../container/AddContacts/AddContacts";
import AddProperties from "../container/AddProperties/AddProperties";
import EditContactsDetails from "../container/EditContactsDetails/EditContactsDetails";
import PropertiesDetails from "../container/PropertiesDetails/PropertiesDetails";
import DeletePropertiy from "../container/DeletePropertiy/DeletePropertiy";
import AddClients from "../container/AddClients/AddClients";
import MyClientsDetails from "../container/MyClientsDetails/MyClientsDetails";
import EditProfile from "../container/EditProfile/EditProfile";
import AddActivity from "../container/AddActivity/AddActivity";
import NewNote from "../container/NewNote/NewNote";
import EditClientsDetails from "../container/EditClientsDetails/EditClientsDetails";
import Documents from "../container/Documents/Documents";
import PropertiesViewedByLeads from "../container/PropertiesViewedByLeads/PropertiesViewedByLeads";
import PropertiesViewed from "../container/PropertiesViewed/PropertiesViewed";
import EditActivity from "../container/EditActivity/EditActivity";
import NewActivies from "../container/Transactions/NewActivies";
import TransactionDetails from "../container/Transactions/TransactionDetails";
import Leads from "../container/Leads/Leads";
import DisPosition from "../container/DisPosition/DisPosition";
import SingleClientDetail from "../container/SingleClientDetail/SingleClientDetail";
import SurfStats from "../container/SurfStats/SurfStats";
import Settings from "../container/Settings/Settings";
import TransactionDesk from "../container/TransactionDesk/TransactionDesk";
import Favorites from "../container/SurfStats/Favorites";
import SavedSearch from "../container/SurfStats/SavedSearch";
import SearchCreteria from "../container/SurfStats/SearchCreteria";
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: Colors.PrimaryColor },
      }}
      options={{headerShown:false}}

    >
      <Stack.Screen name="Login" component={Login}  options={{headerShown:false}}/>
      <Stack.Screen name="AccessRequest" component={AccessRequest} options={{headerShown:false}}/>
      <Stack.Screen name="AccessRequestSent" component={AccessRequestSent} options={{headerShown:false}}/>
      <Stack.Screen name="EnterPin" component={EnterPin} options={{headerShown:false}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}}/>
      <Stack.Screen name="Dashboard" component={DrawerNavigator} options={{headerShown:false}}/>
      <Stack.Screen name="ContactsDetails" component={ContactsDetails} options={{headerShown:false}}/>
      <Stack.Screen name="AddContacts" component={AddContacts} options={{headerShown:false}}/>
      <Stack.Screen name="AddProperties" component={AddProperties} options={{headerShown:false}}/>
      <Stack.Screen name="NewActivies" component={NewActivies} options={{headerShown:false}}/>
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} options={{headerShown:false}}/>

      <Stack.Screen
        name="EditContactsDetails"
        component={EditContactsDetails}
        options={{headerShown:false}}
      />
      <Stack.Screen name="PropertiesDetails" component={PropertiesDetails} options={{headerShown:false}}/>
      <Stack.Screen name="DeletePropertiy" component={DeletePropertiy} options={{headerShown:false}}/>
      <Stack.Screen name="AddClients" component={AddClients} options={{headerShown:false}}/>
      <Stack.Screen name="MyClientsDetails" component={MyClientsDetails} options={{headerShown:false}}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
      <Stack.Screen name="AddActivity" component={AddActivity} options={{headerShown:false}}/>
      <Stack.Screen name="EditActivity" component={EditActivity} options={{headerShown:false}}/>
      <Stack.Screen name="NewNote" component={NewNote} options={{headerShown:false}}/>
      <Stack.Screen name="EditClientsDetails" component={EditClientsDetails} options={{headerShown:false}}/>
      <Stack.Screen name="Documents" component={Documents} options={{headerShown:false}}/>
      <Stack.Screen name="Leads" component={Leads} options={{headerShown:false}}/>
      <Stack.Screen name="DisPosition" component={DisPosition} options={{headerShown:false}}/>
      <Stack.Screen name="SingleClientDetail" component={SingleClientDetail} options={{headerShown:false}}/>
      <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
      <Stack.Screen
        name="PropertiesViewedByLeads"
        component={PropertiesViewedByLeads}
        options={{headerShown:false}}
      />
      
      <Stack.Screen name="PropertiesViewed" component={PropertiesViewed} options={{headerShown:false}}/>
      <Stack.Screen name="Favorites" component={Favorites} options={{headerShown:false}}/>
      <Stack.Screen name="SavedSearch" component={SavedSearch} options={{headerShown:false}}/>
      <Stack.Screen name="SearchCreteria" component={SearchCreteria} options={{headerShown:false}}/>
      <Stack.Screen name="TransactionDesk" component={TransactionDesk} options={{headerShown:false}}/>
      <Stack.Screen name="SurfStats" component={SurfStats} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}
export default StackNavigator;
