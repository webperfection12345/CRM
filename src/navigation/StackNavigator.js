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
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.PrimaryColor },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AccessRequest" component={AccessRequest} />
      <Stack.Screen name="AccessRequestSent" component={AccessRequestSent} />
      <Stack.Screen name="EnterPin" component={EnterPin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />
      <Stack.Screen name="ContactsDetails" component={ContactsDetails} />
      <Stack.Screen name="AddContacts" component={AddContacts} />
      <Stack.Screen name="AddProperties" component={AddProperties} />
      <Stack.Screen name="NewActivies" component={NewActivies} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />

      <Stack.Screen
        name="EditContactsDetails"
        component={EditContactsDetails}
      />
      <Stack.Screen name="PropertiesDetails" component={PropertiesDetails} />
      <Stack.Screen name="DeletePropertiy" component={DeletePropertiy} />
      <Stack.Screen name="AddClients" component={AddClients} />
      <Stack.Screen name="MyClientsDetails" component={MyClientsDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddActivity" component={AddActivity} />
      <Stack.Screen name="EditActivity" component={EditActivity} />
      <Stack.Screen name="NewNote" component={NewNote} />
      <Stack.Screen name="EditClientsDetails" component={EditClientsDetails} />
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="Leads" component={Leads} />
      <Stack.Screen name="DisPosition" component={DisPosition} />
      <Stack.Screen name="SingleClientDetail" component={SingleClientDetail} />
      <Stack.Screen
        name="PropertiesViewedByLeads"
        component={PropertiesViewedByLeads}
      />
      <Stack.Screen name="PropertiesViewed" component={PropertiesViewed} />
      <Stack.Screen name="SurfStats" component={SurfStats} />
    </Stack.Navigator>
  );
}
export default StackNavigator;
