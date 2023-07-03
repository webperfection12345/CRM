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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateContact } from "../../modules/deleteContact";
import Colors from "../../utils/Colors";
import * as ImagePicker from "expo-image-picker";
const EditContactsDetails = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const item = props.route.params.item;

  const [name, setName] = useState("");
  const [linkedId, setLinkedId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [avatarSource, setAvatarSource] = useState(null);
  const [uriResponse, setUriResponse] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    setName(item.contact_name);
    setPhone(item.contact_number);
    setEmail(item.contact_email);
    setLinkedId(item.linked_lead);
    setPassword(item.password);
  }, [item]);
  useEffect(() => {
    if (isFocused) {  
  
    }
  }, [isFocused]);
  const handleDelete = () => {
    const payload = {
      contactid: item.id,
      contact_name: name,
      contact_number: phone,
      contactimg: uriResponse,
    };
    dispatch(updateContact(payload))
      .then((res) => {
        ("Contact update successfully");

        navigation.navigate("Contact");
      })
      .catch((error) => {
        console.log("Error deleting contact:", error);
      });
  };

  const _pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Request base64 encoding
    });

    if (!pickerResult.cancelled) {
      let base64Image = `data:image/png;base64,${pickerResult.base64}`;

      setUriResponse(base64Image);
    }
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
            onPress={handleDelete}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>Done</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable content */}
        <ScrollView>
          {/* Phone */}

          {/* First Name */}
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Name
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
          {/* Last Name */}
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Email
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
                value={email}
                editable={false}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setEmail(text)}
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
                value={item.linked_lead}
                autoCorrect={false}
                editable={false}
                returnKeyType="done"
                onChangeText={(text) => setLinkedId(text)}
              />
            </View>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Picture
            </Text>
            <TouchableOpacity
              onPress={() => _pickImage()}
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <View
                allowFontScaling={false}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: "100%",
                  color: Colors.black,
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: Colors.gray,
                  fontSize: 14,
                  alignSelf: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    resizeMode: "contain",
                    marginLeft: 10,
                  }}
                  source={require("../../../assets/uploadImage.png")}
                ></Image>

                <Text
                  allowFontScaling={false}
                  style={{
                    color: Colors.black,
                    fontSize: 14,
                    marginLeft: 10,
                    alignSelf: "center",
                  }}
                >
                  Choose an image...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 30 }}
            onPress={handleDelete}
          >
            <Text style={{ fontSize: 16, fontWeight: 400, color: Colors.white, backgroundColor:Colors.PrimaryColor,paddingHorizontal:25,paddingVertical:19,borderRadius:9 }}>
              Update Contact
            </Text>
          </TouchableOpacity>

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditContactsDetails;
