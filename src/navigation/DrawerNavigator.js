import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import TabNavigator from "./TabNavigator";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Images from "../utils/Images";
import Fonts from "../utils/Fonts";
import Colors from "../utils/Colors";
import Contacts from "../container/Contacts/Contacts";
import Properties from "../container/Properties/Properties";
import Profile from "../container/Profile/Profile";
import PropertiesFavorites from "../container/PropertiesFavorites/PropertiesFavorites";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  {
    name: "Contacts",
    index: 0,
    img: require("../../assets/people.png"),
  },
  {
    name: "Properties",
    index: 1,
    img: require("../../assets/home.png"),
  },
  {
    name: "SignOut",
    index: 2,
    img: require("../../assets/signOut.png"),
  },
];

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: Colors.PrimaryColor },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        options={{
          title: null,
          headerShown: false,
          headerTintColor: Colors.white,
          drawerIcon: require("../../assets/menu.png"),
          headerBackgroundContainerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
        component={TabNavigator}
      />
      <Drawer.Screen
        name="Contacts"
        options={{
          title: null,
          headerShown: false,
          headerTintColor: Colors.white,
          drawerIcon: require("../../assets/dashboard.png"),
          headerBackgroundContainerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
        component={Contacts}
      />

      <Drawer.Screen
        name="Properties"
        options={{
          title: null,
          headerShown: false,
          headerTintColor: Colors.white,
          drawerIcon: Images.myClients,
          headerBackgroundContainerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
        component={Properties}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          title: null,
          headerShown: false,
          headerTintColor: Colors.white,
          drawerIcon: Images.dashboard,
          headerBackgroundContainerStyle: {
            backgroundColor: Colors.PrimaryColor,
          },
        }}
        component={Profile}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = () => {
  const [userData, setUserDetails] = useState([]);
  const [userImage, setUserImage] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const userDetails = await AsyncStorage.getItem("userDetails");
    // const userImage = await AsyncStorage.getItem('imageUri');
    setUserDetails(JSON.parse(userDetails));
    // setUserImage(JSON.parse(userImage));
  };
  const navigation = useNavigation();
  const signOut = (index) => {
    if (index == 0) {
      return navigation.navigate("Contacts");
    } else if (index == 1) {
      return navigation.navigate("Properties");
    } else index == 2;
    {
      return navigation.navigate("Login");
    }
  };
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: Colors.PrimaryColor,
      }}
    >
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={1}
          style={{
            height: 180,
            width: "100%",
            backgroundColor: Colors.PrimaryColor,
          }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            <Image
              source={require("../../assets/user.png")}
              style={{
                height: 50,
                width: 50,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              fontSize: 20,
              marginLeft: 25,
              marginTop: 10,
              fontWeight: "700",
            }}
          >
            {userData.display_name}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.gray,
              fontSize: 14,
              marginLeft: 25,
              marginTop: 5,
              fontWeight: "600",
            }}
          >
            {userData.user_email}
          </Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "center" }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => signOut(item.index)}
                style={{
                  height: 60,
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: 50,
                    width: 70,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.img}
                    resizeMode="contain"
                    style={{
                      height: "50%",
                      width: "50%",
                    }}
                  ></Image>
                </View>
                <View
                  style={{
                    height: 70,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            //   keyExtractor={(item) => item.id}
            //  ItemSeparatorComponent={this.renderSeparator}
            //   key={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerNavigator;
