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
import { useDispatch } from "react-redux";
import { activityAddnote } from "../../modules/activityAddnote";
import moment from "moment";
import getMyClientDetails from "../../modules/getMyClientDetails";

// import ImagePicker from "react-native-image-crop-picker";

const NewNote = (props) => {
  const dispatch = useDispatch();

  const items = props.route.params;

  const navigation = useNavigation();
  const [note, setNote] = useState("");
  const [login, setLogin] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");

  const onhandleClick = () => {
    addActivity();
  };
  const addActivity = () => {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(currentDateTime, "date1");
    setDate(currentDateTime);

    const payload = {
      note_client_id: items.item.id,
      note_contact_lead_id: items.item.contact_lead_id,
      activity_note_content: note,
      note_created_date: currentDateTime,
    };
    dispatch(activityAddnote(payload)).then((response) => {
      console.log(response, "response");
      navigation.goBack();
    });
  };
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
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: "contain",
                tintColor: Colors.white,
              }}
              source={require("../../../assets/back.png")}
            ></Image>
          </TouchableOpacity>
          <Text style={{  fontSize: 19, fontWeight: "bold", color: Colors.white }}>New Note</Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: "contain",
                transform: [{ rotate: "45deg" }],
              }}
              source={require("../../../assets/plus.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <View
              style={{
                borderWidth: 1,
                width: "95%",
                alignSelf: "center",
                borderRadius: 5,
                marginTop: 20,
                borderColor: Colors.gray,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: items.item.contact_image }}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                  }}
                ></Image>
                <View>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 24,

                      fontWeight: "bold",
                      marginLeft: 20,
                    }}
                  >
                    {items.item.contact_name}
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 14,
                      marginTop: 5,
                      marginLeft: 20,
                    }}
                  >
                    {items.item.contact_name}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
                width: "95%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, color: Colors.black, fontWeight: "700" }}
              >
                Note
              </Text>
              <Text style={{ fontSize: 12, color: "#950000" }}>
                Required
              </Text>
            </View>
            <View
              style={{
                width: "95%",
                height: 150,
                marginTop: 10,
                alignSelf: "center",
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
                  paddingVertical:15,
                  color: Colors.black,
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                autoCorrect={false}
                returnKeyType="done"
                multiline={true}
                placeholder="Enter your note here...."
                onChangeText={(text) => setNote(text)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: 60,
              marginTop: 20,
              alignSelf: "center",
              justifyContent: "flex-end"
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: "30%",
                borderRadius: 5,
                backgroundColor: Colors.PrimaryColor,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onhandleClick}
            >
              <Text
                style={{
                  fontSize: 14,
                  //fontWeight: "bold",
                  color: Colors.white,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NewNote;
