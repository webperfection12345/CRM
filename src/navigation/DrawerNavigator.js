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
import Settings from "../container/Settings/Settings";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);

  const tabBackgroundColor = isHovered ? "#fff" : "#576ebd";
  const textColor = isHovered ? "#000" : "white";
  const imageTintColor = isHovered ? "#000" : "white";

  const tab2BackgroundColor = isHovered2 ? "#fff" : "#576ebd";
  const tab2TextColor = isHovered2 ? "#000" : "white";
  const tab2ImageTintColor = isHovered2 ? "#000" : "white";

  const tab3BackgroundColor = isHovered3 ? "#fff" : "#576ebd";
  const tab3TextColor = isHovered3 ? "#000" : "white";
  const tab3ImageTintColor = isHovered3 ? "#000" : "white";

  const tab4BackgroundColor = isHovered4 ? "#fff" : "#576ebd";
  const tab4TextColor = isHovered4 ? "#000" : "white";
  const tab4ImageTintColor = isHovered4 ? "#000" : "white";

  const tab5BackgroundColor = isHovered5 ? "#fff" : "#576ebd";
  const tab5TextColor = isHovered5 ? "#000" : "white";
  const tab5ImageTintColor = isHovered5 ? "#000" : "white";

  const tab6BackgroundColor = isHovered6 ? "#fff" : "#576ebd";
  const tab6TextColor = isHovered6 ? "#000" : "white";
  const tab6ImageTintColor = isHovered6 ? "#000" : "white";

  const tab7BackgroundColor = isHovered7 ? "#fff" : "#576ebd";
  const tab7TextColor = isHovered7 ? "#000" : "white";
  const tab7ImageTintColor = isHovered7 ? "#000" : "white";

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };
  const handleMouseEnter4 = () => {
    setIsHovered4(true);
  };

  const handleMouseLeave4 = () => {
    setIsHovered4(false);
  };

  const handleMouseEnter5 = () => {
    setIsHovered5(true);
  };

  const handleMouseLeave5 = () => {
    setIsHovered5(false);
  };
  const handleMouseEnter6 = () => {
    setIsHovered6(true);
  };

  const handleMouseLeave6 = () => {
    setIsHovered6(false);
  };
  const handleMouseEnter7 = () => {
    setIsHovered7(true);
  };

  const handleMouseLeave7 = () => {
    setIsHovered7(false);
  };

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
      <ScrollView>
      <View style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
       <View style={{flexDirection:"row",alignItems:"center",width:"90%"}}> 
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={1}
          style={{
            height: 95,
            width: "100%",
            backgroundColor: Colors.PrimaryColor,
            flexDirection: "row",
            alignItems: "center",
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
          </Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image
              source={require("../../assets/setting-icons.png")}
              style={{
                height: 25,
                width: 25,
                resizeMode: "contain",
                marginLeft:-12
              }}
            ></Image>
            </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: Colors.PrimaryColor,
            height: "78%",
          }}
        >
          <TouchableHighlight
            onPress={handlePress1}
            underlayColor="transparent"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <View
              style={{
                backgroundColor: tabBackgroundColor,
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
                    tintColor: imageTintColor,
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
                  color: textColor,
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
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
          >
            <View
              style={{
                backgroundColor: tab2BackgroundColor,
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
                    tintColor: tab2ImageTintColor,
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
                  color: tab2TextColor,
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
            onMouseEnter={handleMouseEnter3}
            onMouseLeave={handleMouseLeave3}
          >
            <View
              style={{
                backgroundColor: tab3BackgroundColor,
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
                    tintColor: tab3ImageTintColor,
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
                  color: tab3TextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                surf Leads
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate("TransactionDesk")}
            underlayColor="transparent"
            onMouseEnter={handleMouseEnter4}
            onMouseLeave={handleMouseLeave4}
          >
            <View
              style={{
                backgroundColor: tab4BackgroundColor,
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
                    tintColor: tab4ImageTintColor,
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
                  color: tab4TextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Transactions
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={handlePress}
            underlayColor="transparent"
            onMouseEnter={handleMouseEnter5}
            onMouseLeave={handleMouseLeave5}
          >
            <View
              style={{
                backgroundColor: tab5BackgroundColor,
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
                    tintColor: tab5ImageTintColor,
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
                  color: tab5TextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Document Library
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate("Properties")}
            underlayColor="transparent"
            onMouseEnter={handleMouseEnter6}
            onMouseLeave={handleMouseLeave6}
          >
            <View
              style={{
                backgroundColor: tab6BackgroundColor,
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
                    tintColor: tab6ImageTintColor,
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
                  color: tab6TextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                surf Listings
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={handlePress}
            underlayColor="transparent"
            onMouseEnter={handleMouseEnter7}
            onMouseLeave={handleMouseLeave7}
          >
            <View
              style={{
                backgroundColor: tab7BackgroundColor,
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
                    tintColor: tab7ImageTintColor,
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
                  color: tab7TextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Call Center
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={handlePress}
            underlayColor="transparent"
            onMouseEnter={handleMouseEnter7}
            onMouseLeave={handleMouseLeave7}
          >
            <View
              style={{
                backgroundColor: tab7BackgroundColor,
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
                  source={require("../assets/images/bell.png")}
                  style={{
                    height:32,
                    width:32
                  }}
                />
              </View>
              <Text
                style={{
                  color: tab7TextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Notifications
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={handlePress}
            underlayColor="transparent"
            onMouseEnter={handleMouseEnter7}
            onMouseLeave={handleMouseLeave7}
          >
            <View
              style={{
                backgroundColor: tab7BackgroundColor,
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
               
              </View>
              <Text
                style={{
                  color: tab7TextColor,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Lead Pond
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
            width: 110,
            justifyContent: "center",
            alignItems: "center",
            resizeMode: "contain",
          }}
        ></Image>
      </View>
      </ScrollView>
     
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
