import React, { useState } from "react";
import { useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../modules/deleteContact";
import Colors from "../../utils/Colors";

const EditContactsDetails = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const item = props.route.params.item;

  useEffect(() => {
    const [firstName, lastName] = item.contact_name.split(" ");
    setName(firstName);
    setLastName(lastName);
    setPhone(item.contact_number);
    setEmail(item.email);
    setPassword(item.password);
  }, [item]);
  const handleDelete = () => {
    dispatch(deleteContact(item.id))
      .then(() => {
        console.log("Contact deleted successfully");
        navigation.navigate("Contact");
      })
      .catch((error) => {
        console.log("Error deleting contact:", error);
      });
  };

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        {/* Header */}
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
          <Text style={{ fontSize: 15, color: Colors.white }}></Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable content */}
        <ScrollView>
          {/* Phone */}
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Phone
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
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                value={phone}
                keyboardType="number-pad"
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>

          {/* First Name */}
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              First Name
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
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                value={name}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>

          {/* Last Name */}
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Last Name
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
                  backgroundColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                value={lastName}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setLastName(text)}
              />
            </View>
          </View>

          {/* Linked Lead */}
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Linked Lead
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
                {item.linked_lead}
              </Text>
            </View>
          </View>

          {/* Delete Item */}
          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 30 }}
            onPress={handleDelete}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
              Delete Item
            </Text>
          </TouchableOpacity>

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditContactsDetails;
