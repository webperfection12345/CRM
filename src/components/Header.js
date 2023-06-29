import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import Colors from "../utils/Colors";
import Images from "../utils/Images";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = (props) => {
  const { label, plusButton } = props;
  const navigation = useNavigation();
  const [currentActive, SetCurrentActive] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getActiveClient();
    if (isFocused) {
      // Perform the refresh logic here
    }
  }, [isFocused]);
  const getActiveClient = async () => {
    const id = await AsyncStorage.getItem("userId");
    console.log(id);
    try {
      const response = await fetch(
        "https://surf.topsearchrealty.com/wp-json/activeuser/currentactive?user_id=" +
          id
      );
      if (!response.ok) {
        throw new Error("Failed to fetch active client data.");
      }
      const data = await response.json();
      console.log(data.data);

      // Check if the data is an array or a string
      if (Array.isArray(data.data)) {
        SetCurrentActive(data.data);
      } else {
        SetCurrentActive([]); // Set an empty array if there are no active clients
      }

      setLoading(false);
    } catch (error) {
      console.log(error.message);
      // Handle the error condition
    }
  };
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 2,
      }}
    >
      <View style={styles.onlinepeoples}>
        <ScrollView horizontal={true} style={styles.maincent}>
          {currentActive.length > 0 ? (
            <FlatList
              data={currentActive}
              horizontal={true}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    marginHorizontal: 2,
                    borderRadius: 25,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "purple",
                    outline: "2px solid green",
                  }}
                >
                  {item.User_image ? (
                    <Image
                      source={{ uri: item.User_image }}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={{ fontSize: 16, color: Colors.white }}>
                      {item.User_name.charAt(0)}
                      {item.User_name.split(" ").length > 1 &&
                        item.User_name.split(" ")[1].charAt(0)}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No active clients</Text>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          borderTopColor: "#ddd",
          borderTopWidth: 1,

          paddingVertical: 17,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ width: 50, marginLeft: 10 }}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../../assets/menublack.png")}
          ></Image>
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          style={{
            color: Colors.black,
            fontSize: 19,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {label}
        </Text>
        <View style={styles.headericons}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.notificationicon}
          >
            <Image
              style={{ height: 25, width: 25, resizeMode: "contain" }}
              source={require("../../assets/calender.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.notificationicon}
          >
            <Image
              style={{
                height: 25,
                width: 25,
                marginLeft: 12,
                resizeMode: "contain",
              }}
              source={require("../../assets/notification.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headericons: { flexDirection: "row", alignItems: "center", paddingRight: 12 },
  // maincent:{justifyContent:"center",flex:1},
  onlinepeoples: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 12,
    flexWrap: "wrap",
  },
  icons: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#00ff17",
    marginHorizontal: 5,
  },
  noimage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#00ff17",
    marginHorizontal: 5,
    backgroundColor: Colors.darkblue,
    color: Colors.white,
    textAlign: "center",
    fontWeight: "800",
    lineHeight: 60,
    fontSize: 20,
  },
});
export default Header;
