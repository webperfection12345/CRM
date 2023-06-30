import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Images from "../utils/Images";
import Fonts from "../utils/Fonts";
import Colors from "../utils/Colors";
import Dashboard from "../container/Dashboard/Dashboard";
//import MyClients from "../container/MyClients/MyClients";
import Leads from "../container/Leads/Leads";
import Contact from "../container/Contact/Contact";
import Transactions from "../container/Transactions/Transactions";
import DisPosition from "../container/DisPosition/DisPosition";
import Marketing from "../container/Marketing/Marketing";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import TransactionDesk from "../container/TransactionDesk/TransactionDesk";

import SingleClientDetail from "../container/SingleClientDetail/SingleClientDetail";

import Properties from "../container/Properties/Properties";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, keyboardHidesTabBar: true }}
      tabBar={(props) => <CustomTabBar {...props} size={30} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="MLS"
        component={Properties}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} allowFontScaling={false}>
              MLS
            </Text>
          ),
          tabBarIcon: require("./../assets/images/mlscallcenterb.png"),
          tabBarHideOnKeyboard: true,
          tintColor: "red",
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 11 }} allowFontScaling={false}>
              Contact
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
              Opportunities
            </Text>
          ),

          tabBarIcon: require("./../assets/images/transactionwqhiteb.png"),
          //keyboardHidesTabBar: true,
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="TransactionDesk"
        component={TransactionDesk}
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
      {/* <Tab.Screen
        name="Marketing"
        component={Marketing}
        options={{
          tabBarLabel: (
            <Text style={{ fontSize: 10 }} allowFontScaling={false}>
              Marketing
            </Text>
          ),
          tabBarIcon: require("../../assets/account.png"),
          //keyboardHidesTabBar: true,
          tabBarHideOnKeyboard: true,
        }}
      /> */}
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
                        height: "70%",
                        width: "70%",
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
export default BottomTabNavigator;
