import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import Images from "../utils/Images";
import Fonts from "../utils/Fonts";
import Colors from "../utils/Colors";
import Dashboard from "../container/Dashboard/Dashboard";
import SurfStats from "../container/SurfStats/SurfStats";
import Leads from "../container/Leads/Leads";
import Contact from "../container/Contact/Contact";
import Transactions from "../container/Transactions/Transactions";
import Marketing from "../container/Marketing/Marketing";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import TransactionDeskNew from "../container/TransactionDeskNew/TransactionDeskNew";
import TransactionDesk from "../container/TransactionDesk/TransactionDesk";
import Properties from "../container/Properties/Properties";
import MyClientsDetails from "../container/MyClientsDetails/MyClientsDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from "../container/SurfStats/Favorites";
import SavedSearch from "../container/SurfStats/SavedSearch";
import SearchCreteria from "../container/SurfStats/SearchCreteria";
import PropertiesDetails from "../container/PropertiesDetails/PropertiesDetails";
import EditClientsDetails from "../container/EditClientsDetails/EditClientsDetails";
import chat from "../container/chat";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, keyboardHidesTabBar: true }}
      tabBar={(props) => <CustomTabBar {...props} size={30} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="MLS"
        component={SurfListingStackScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} allowFontScaling={false}>
              surf Listings
            </Text>
          ),
          tabBarIcon: require("./../assets/images/mlscallcenterb.png"),
          tabBarHideOnKeyboard: true,
          tintColor: "red",
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactStackScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} allowFontScaling={false}>
              Contacts
            </Text>
          ),
          tabBarIcon: require("./../assets/images/contactwhiteb.png"),
          //keyboardHidesTabBar: true,
          tabBarHideOnKeyboard: true,
        }}
      />
    
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} allowFontScaling={false}>
              DashBoard
            </Text>
          ),

          tabBarIcon: require("./../assets/images/Dashboab.png"),
          //keyboardHidesTabBar: true,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Leads"
        component={Leads}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} allowFontScaling={false}>
              surf Leads
            </Text>
          ),

          tabBarIcon: require("./../assets/images/transactionwqhiteb.png"),
          //keyboardHidesTabBar: true,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="TransactionDeskNew"
        component={TransactionStackScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} allowFontScaling={false}>
              Transactions
            </Text>
          ),
          tabBarIcon: require("./../assets/images/opporrtubitb.png"),
          //keyboardHidesTabBar: true,
          tabBarHideOnKeyboard: true,
          tabBarBackground: "grey",
        }}
      />
  
    </Tab.Navigator>
    
  );
};
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <>
      <SafeAreaView
        style={{
          width: "100%",
          maxHeight: 80,
          backgroundColor: Colors.white,
          borderTopColor: Colors.black,
          borderTopWidth: 0.5,
        }}
      >
        <KeyboardAvoidingView
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const image =
              options.tabBarIcon !== undefined
                ? options.tabBarIcon
                : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };
            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };
            return (
              <>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{
                    height: 70,
                    width: 85,
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={image}
                      resizeMode="contain"
                      style={{
                        height: label ==='Dashboard' ? '90%':"100%",
                        width: label ==='Dashboard' ? '90%':"70%",
                        tintColor: isFocused ? Colors.PrimaryColor : null,

                        marginBottom: 10,
                      }}
                    ></Image>
                  </View>
                  <Text
                    style={{
                      color: isFocused ? Colors.PrimaryColor : null,
                      position: "absolute",
                      bottom: 2,
                      fontSize: 12,
                      marginTop: 10,
                    }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              </>
            );
          })}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const ContactStack = createNativeStackNavigator();
const TransactionStack = createNativeStackNavigator();
const SurfListingStack = createNativeStackNavigator();


function SurfListingStackScreen() {
  return (
    <SurfListingStack.Navigator>
      <SurfListingStack.Screen name="MLS" component={Properties} options={{headerShown:false}} />
      <SurfListingStack.Screen name="PropertiesDetails" component={PropertiesDetails} options={{headerShown:false}}/>

      
    </SurfListingStack.Navigator>
  );
}

function TransactionStackScreen() {
  return (
    <TransactionStack.Navigator>
      <TransactionStack.Screen name="TransactionDeskNew" component={TransactionDeskNew} options={{headerShown:false}} />
      <TransactionStack.Screen name="TransactionDesk" component={TransactionDesk} options={{headerShown:false}}/>
    </TransactionStack.Navigator>
  );
}

function ContactStackScreen() {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen name="Contact" component={Contact} options={{headerShown:false}} />
      <ContactStack.Screen name="MyClientsDetails" component={MyClientsDetails} options={{headerShown:false}}/>
      <ContactStack.Screen name="SurfStats" component={SurfStats} options={{headerShown:false}}/>
      <ContactStack.Screen name="Favorites" component={Favorites} options={{headerShown:false}}/>
      <ContactStack.Screen name="SavedSearch" component={SavedSearch} options={{headerShown:false}}/>
      <ContactStack.Screen name="SearchCreteria" component={SearchCreteria} options={{headerShown:false}}/>
      <ContactStack.Screen name="TransactionDesk" component={TransactionDesk} options={{headerShown:false}}/>
      <ContactStack.Screen name="EditClientsDetails" component={EditClientsDetails} options={{headerShown:false}}/>
      <ContactStack.Screen name="Chat" component={chat} options={{headerShown:false}}/>


    </ContactStack.Navigator>
  );
}
export default BottomTabNavigator;
