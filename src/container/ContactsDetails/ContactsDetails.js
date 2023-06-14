import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";

const ContactsDetails = (props) => {
  const navigation = useNavigation();
  const [value, setValue] = useState([]);
  const [password, setPassword] = useState("");
  const [leadType, setLeadType] = useState("");
  const items = props.route.params.item;
  useEffect(() => {
    leadData();
  }, []);
  const leadData = () => {
    const url = items.linked_lead;

    try {
      const regex = /(\w+)=\d+/;
      const matches = url.match(regex);

      if (matches && matches.length >= 2) {
        const paramName = "Lead";
        setLeadType(paramName);
      } else {
        console.log("Parameter not found in the URL");
      }
    } catch (error) {
      console.error("Error parsing URL:", error);
    }
  };

  //setValue(items);
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const makePhoneCall = () => {
    let phoneNumber = items.contact_number;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const sendEmail = () => {
    let recipient = items.contact_email;
    let subject = "Subject of email";
    let body = "Body of email";
    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  const sendSMS = () => {
    let phoneNumber = items.phoneNumber;
    let message = "Hello from my app!";
    Linking.openURL(`sms:${phoneNumber}`);
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
            <Image
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                tintColor: Colors.white,
              }}
              source={require("../../../assets/back.png")}
            ></Image>
            <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: Colors.white }}>
            ContactsDetails
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditContactsDetails", { item: items })
            }
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
              height: 200,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View>
              <Image
                source={{ uri: items.contact_image }}
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                }}
              ></Image>
            </View>
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
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {items.contact_name}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 80,
              width: "96%",
              alignSelf: "flex-end",
              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: 80,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                  }}
                >
                  Email
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {items.contact_email}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => sendEmail()}
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../assets/mail.png")}
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: "contain",
                }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 80,
              width: "96%",
              alignSelf: "flex-end",

              alignItems: "center",
              alignContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "70%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  height: 80,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                  }}
                >
                  Phone
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {items.contact_number}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => sendSMS()}
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../assets/chat.png")}
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: "contain",
                }}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => makePhoneCall()}
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../assets/phone.png")}
                style={{
                  height: 40,
                  width: 40,
                  marginLeft: "5%",
                  resizeMode: "contain",
                }}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Client Type{" "}
            </Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {leadType}
              </Text>
            </View>
          </View>

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ContactsDetails;
