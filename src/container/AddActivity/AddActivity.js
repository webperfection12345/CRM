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
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";

const AddActivity = () => {
  const navigation = useNavigation();
  const [id, setID] = useState("");
  const [login, setLogin] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
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
      console.log("mkm", avatarSource);
      console.log("uri", uriResponse);
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.PrimaryColor, flex: 1 }}>
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
            <Text style={{ fontSize: 15, color: Colors.white }}>Cancel</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: Colors.white }}>
            New Activity
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>Submit</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 15, color: Colors.black }}>
                Activity Type
              </Text>
              <Text style={{ fontSize: 12, color: Colors.black }}>
                Required
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderColor: Colors.gray,
                  borderWidth: 1,
                  fontSize: 14,
                  padding: 2,
                }}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setID(text)}
              />
            </View>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 15, color: Colors.black }}>
                Activity
              </Text>
              <Text style={{ fontSize: 12, color: Colors.black }}>
                Required
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderColor: Colors.gray,
                  borderWidth: 1,
                  fontSize: 14,
                  padding: 2,
                }}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setLogin(text)}
              />
            </View>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 15, color: Colors.black }}>
                Due Date
              </Text>
              <Text style={{ fontSize: 12, color: Colors.black }}>
                Required
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderColor: Colors.gray,
                  borderWidth: 1,
                  fontSize: 14,
                  padding: 2,
                }}
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Notes
            </Text>
            <View
              style={{
                width: "100%",
                height: 100,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderColor: Colors.gray,
                  borderWidth: 1,
                  fontSize: 14,
                  padding: 2,
                }}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setNickname(text)}
              />
            </View>
          </View>
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              borderWidth: 1,
              borderColor: Colors.gray,
              marginTop: 30,
              marginBottom: 20,
            }}
          ></View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                autoCorrect={false}
                returnKeyType="done"
                placeholder="Aitomatically generated"
                placeholderTextColor={Colors.black}
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Contact email
            </Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderWidth: 1,
                  borderColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                autoCorrect={false}
                returnKeyType="done"
                placeholder="biff@bowser.com"
                placeholderTextColor={Colors.black}
                onChangeText={(text) => setLastName(text)}
              />
            </View>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Owner
            </Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderWidth: 1,
                  borderColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                keyboardType="number-pad"
                autoCorrect={false}
                returnKeyType="done"
                placeholder="devaccessme@gmail.com"
                placeholderTextColor={Colors.black}
                onChangeText={(text) => setMobile(text)}
              />
            </View>
          </View>

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddActivity;
