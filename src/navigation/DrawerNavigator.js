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
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Images from "../utils/Images";
import Fonts from "../utils/Fonts";
import Colors from "../utils/Colors";
import Contacts from "../container/Contacts/Contacts";
import Properties from "../container/Properties/Properties";
import Profile from "../container/Profile/Profile";
import PropertiesFavorites from "../container/PropertiesFavorites/PropertiesFavorites";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const data = [
  // {
  //   name: "Dashboard",
  //   index: 0,
  //   img: require("../../assets/Dashboardwhite.png"),
  // },
  // {
  //   name: "Contacts",
  //   index: 1,
  //   img: require("../../assets/contactwhite.png"),
  // },
  // {
  //   name: "Opportunities",
  //   index: 2,
  //   img: require("../../assets/transactionwqhite.png"),
  // },
  // {
  //   name: "Transactions",
  //   index: 3,
  //   img: require("../../assets/opporrtubitywhite.png"),
  // },
  // {
  //   name: "Document Folder",
  //   index: 4,
  //   img: require("../../assets/folderwhite.png"),
  // },
  // {
  //   name: "MLS",
  //   index: 5,
  //   img: require("../../assets/mlscallcenter.png"),
  // },
  // {
  //   name: "Call Center",
  //   index: 6,
  //   img: require("../../assets/callwhite.png"),
  // },
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
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed1, setIsPressed1] = useState(false);
  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  const handlePress1 = () => {
    setIsPressed1(!isPressed1);
  };
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
      <View style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={1}
          style={{
            height: 130,
            width: "100%",
            backgroundColor: Colors.PrimaryColor,
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <View
            style={{
              height: 70,
              width: 70,

              marginLeft: 20,
            }}
          >
            <Image
              source={require("../../assets/profilePic.png")}
              style={{
                height: 70,
                width: 70,
                borderColor: Colors.white,
                borderWidth: 1,
                resizeMode: "contain",
                borderRadius: 100,
              }}
            ></Image>
          </View>
          <Text
            allowFontScaling={false}
            style={{
              color: Colors.white,
              fontSize: 20,
              marginLeft: 15,
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            {userData.display_name}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: Colors.PrimaryColor,
            height: "78%",
          }}
        >
          {/* <FlatList
            data={data}
            renderItem={({ item }) => (
             
              <TouchableOpacity
                onPress={() => signOut(item.index)}
                style={{
                  height: 60,
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                 marginHorizontal:12,
                  borderBottomColor:Colors.borderlightcolor,
                    borderBottomWidth:1
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
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                
              </TouchableOpacity>
            )}
         
          /> */}
          <TouchableHighlight
            onPress={handlePress1}
            underlayColor="transparent"
          >
            <View
              style={{
                backgroundColor: isPressed1 ? "#fff" : "#576ebd",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                borderBottomColor: Colors.borderlightcolor,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/Dashboardwhite.png")}
                  style={{
                    tintColor: isPressed1 ? "#000" : "white",
                    height: "50%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: isPressed1 ? "#000" : "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                DashBoard
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate("Contacts")}
            underlayColor="transparent"
          >
            <View
              style={{
                backgroundColor: isPressed ? "#fff" : "#576ebd",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                borderBottomColor: Colors.borderlightcolor,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/contactwhite.png")}
                  style={{
                    tintColor: isPressed ? "#000" : "white",
                    height: "50%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: isPressed ? "#000" : "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Contacts
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate("Leads")}
            underlayColor="transparent"
          >
            <View
              style={{
                backgroundColor: isPressed ? "#fff" : "#576ebd",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                borderBottomColor: Colors.borderlightcolor,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/transactionwqhite.png")}
                  style={{
                    tintColor: isPressed ? "#000" : "white",
                    height: "50%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: isPressed ? "#000" : "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Opportunities
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate("TransactionDesk")}
            underlayColor="transparent"
          >
            <View
              style={{
                backgroundColor: isPressed ? "#fff" : "#576ebd",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                borderBottomColor: Colors.borderlightcolor,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/opporrtubitywhite.png")}
                  style={{
                    tintColor: isPressed ? "#000" : "white",
                    height: "50%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: isPressed ? "#000" : "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Transactions
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handlePress} underlayColor="transparent">
            <View
              style={{
                backgroundColor: isPressed ? "#fff" : "#576ebd",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                borderBottomColor: Colors.borderlightcolor,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/folderwhite.png")}
                  style={{
                    tintColor: isPressed ? "#000" : "white",
                    height: "50%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: isPressed ? "#000" : "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Document Folder
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate("Properties")}
            underlayColor="transparent"
          >
            <View
              style={{
                backgroundColor: isPressed ? "#fff" : "#576ebd",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                borderBottomColor: Colors.borderlightcolor,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/mlscallcenter.png")}
                  style={{
                    tintColor: isPressed ? "#000" : "white",
                    height: "50%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: isPressed ? "#000" : "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                MLS
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handlePress} underlayColor="transparent">
            <View
              style={{
                backgroundColor: isPressed ? "#fff" : "#576ebd",
                height: 60,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                borderBottomColor: Colors.borderlightcolor,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/callwhite.png")}
                  style={{
                    tintColor: isPressed ? "#000" : "white",
                    height: "50%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: isPressed ? "#000" : "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Call Center
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          resizeMode: "contain",
        }}
      >
        <Image
          source={require("../../assets/bottomlogosidebar.png")}
          style={{
            height: 150,
            width: 150,
            justifyContent: "center",
            alignItems: "center",
            resizeMode: "contain",
          }}
        ></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
  },
  buttonPressed: {
    backgroundColor: "red",
  },
});
export default DrawerNavigator;
