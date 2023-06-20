import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Contacts = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uriResponse, seturiResponse] = useState("");
  const [avatarSource, setAvatarSource] = useState("");
  const [userData, setUserDetails] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const userDetails = await AsyncStorage.getItem("userDetails");
    // const userImage = await AsyncStorage.getItem('imageUri');
    setUserDetails(JSON.parse(userDetails));
  };

  const _pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then((response) => {
      let source = { uri: response.path };
      setAvatarSource(source);
      seturiResponse(response.path);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <View
          style={{
            height: 60,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.PrimaryColor,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>Close</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}>Profile</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                tintColor: Colors.white,
              }}
              source={require("../../../assets/edit.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              height: 250,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <TouchableOpacity
            //onPress={() => _pickImage()}
            >
              <Image
                source={require("../../../assets/profileCam.png")}
                style={{ height: 100, width: 100 }}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {userData.display_name}
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                {userData.user_email}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Contacts;
