import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";

const EditActivity = () => {
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
  const [date, setDate] = useState("");
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
            Activity Details
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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 35,
                width: "40%",
                borderRadius: 5,
                borderColor: Colors.gray,
                borderWidth: 0.5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end",
                marginTop: 10,
                backgroundColor: Colors.PrimaryColor,
              }}
            >
              <Text style={{ fontSize: 14, color: Colors.white }}>
                🗑️ Delete
              </Text>
            </TouchableOpacity>
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
              <Text style={{ fontSize: 15, color: Colors.black }}>Subject</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 70,
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
            <TouchableOpacity
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              {/* <Text
                allowFontScaling={false}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  height: '100%',
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
                onChangeText={text => setEmail(text)}
              /> */}
              {/* <DatePicker
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  color: Colors.black,
                  borderColor: Colors.gray,
                  borderWidth: 1,
                  fontSize: 14,
                  padding: 2,
                }}
                date={date}
                mode="date"
                placeholder="select date"
                format="DD/mm/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: Colors.white,
                    color: Colors.white,
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 50,
                  },
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              /> */}
            </TouchableOpacity>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Result
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
              flexDirection: "row",
              width: "95%",
              marginTop: 20,
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: Colors.black,
              }}
            >
              Completed?
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
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

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditActivity;
