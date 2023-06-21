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
import * as ImagePicker from "expo-image-picker";
import { updateContact } from "../../modules/deleteContact";
import { useDispatch } from "react-redux";

const EditClientsDetails = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [id, setID] = useState("");
  const [login, setLogin] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [avatarSource, setAvatarSource] = useState(null);
  const [uriResponse, setUriResponse] = useState(null);
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const item = props.route.params.item;
  useEffect(() => {
    setName(item.contact_full_name);
    setEmail(item.contact_email);
    setPhone(item.contact_number);
    setID(item.linked_lead);
  }, [item]);

  const onHandleClick = () => {
    const payload = {
      contactid: item.id,
      contact_name: name,
      contact_number: phone,
      contactimg: uriResponse,
    };
    dispatch(updateContact(payload))
      .then((res) => {
        console.log("Contact update successfully");
        navigation.navigate("MyClients");
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
      let filename = `lokal-with_board-(1).png`;
      let tmpName = `/tmp/phpr2QrsB`;
      let fileArray = [
        {
          name: filename,
          tmp_name: tmpName,
          // Adjust the type according to your requirements
        },
      ];
      setUriResponse(fileArray);
    }
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
          <Text style={{  fontSize: 19, fontWeight: "bold", color: Colors.white }}>Edit Client</Text>
          <TouchableOpacity
            onPress={onHandleClick}
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
                Full_Name
              </Text>
              <Text style={{ fontSize: 12, color: "#950000" }}>
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
                value={name}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setName(text)}

                //onChangeText={text => setID(text)}
              />
            </View>
          </View>
          {/* <View style={{width: '95%', alignSelf: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={{fontSize: 15, color: Colors.black}}>
                Company Name
              </Text>
              <Text style={{fontSize: 12, color: Colors.black}}></Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TextInput
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
                autoCorrect={false}
                returnKeyType="done"
              />
            </View>
          </View> */}

          {/* <View style={{width: '95%', alignSelf: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text style={{fontSize: 15, color: Colors.black}}>Job_Title</Text>
              <Text style={{fontSize: 12, color: Colors.black}}></Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TextInput
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
                //onChangeText={text => setEmail(text)}
              />
            </View>
          </View> */}

          {/* <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: Colors.black, marginTop: 15}}>
              Client Type
            </Text>
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TextInput
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
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={text => setNickname(text)}
              />
            </View>
          </View> */}

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
                  borderWidth: 1,
                  borderColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                value={email}
                autoCorrect={false}
                returnKeyType="done"
                placeholderTextColor={Colors.black}
                onChangeText={(text) => setEmail(text)}
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
                  borderWidth: 1,
                  borderColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                value={phone}
                autoCorrect={false}
                returnKeyType="done"
                placeholderTextColor={Colors.black}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>
          {/* 
          <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: Colors.black, marginTop: 15}}>
              Linkedin
            </Text>
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TextInput
                allowFontScaling={false}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  height: '100%',
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
                //onChangeText={text => setLastName(text)}
              />
            </View>
          </View> */}

          {/* <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: Colors.black, marginTop: 15}}>
              Twitter
            </Text>
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TextInput
                allowFontScaling={false}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  height: '100%',
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
                //onChangeText={text => setLastName(text)}
              />
            </View>
          </View> */}

          {/* <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={{fontSize: 15, color: Colors.black, marginTop: 15}}>
              Role
            </Text>
            <View
              style={{
                width: '100%',
                height: 50,
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TextInput
                allowFontScaling={false}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  height: '100%',
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderWidth: 1,
                  borderColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                autoCorrect={false}
                returnKeyType="done"
                placeholder="Decision Maker"
                placeholderTextColor={Colors.black}
                //onChangeText={text => setLastName(text)}
              />
            </View>
          </View> */}

          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Client Type
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
                editable={false}
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
                value={id}
                keyboardType="number-pad"
                autoCorrect={false}
                returnKeyType="done"
                placeholderTextColor={Colors.black}
                //onChangeText={text => setMobile(text)}
              />
            </View>
          </View>

          {/* <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Comments
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
                  borderWidth: 1,
                  borderColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                }}
                multiline={true}
                autoCorrect={false}
                returnKeyType="done"
                placeholderTextColor={Colors.black}
                onChangeText={(text) => setComments(text)}
              />
            </View>
          </View> */}
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Profile Picture
            </Text>
            <TouchableOpacity onPress={_pickImage}>
              <View
                style={{
                  width: "100%",
                  height: 50,
                  marginTop: 10,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    height: "100%",
                    color: Colors.black,
                    borderColor: Colors.gray,
                    backgroundColor: Colors.white,
                    borderWidth: 1,
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
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditClientsDetails;
