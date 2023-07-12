import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal
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
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "react-native-web";

const data = [
  { label: 'mobile', value: '1' },
  { label: 'home', value: '2' },
  { label: 'work', value: '3' },
  { label: 'school', value: '4' },
  { label: 'main', value: '5' },
];
const EditClientsDetails = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [uriResponse, setUriResponse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const item = props.route.params.item;
  useEffect(() => {
    setName(item.contact_full_name);
    setEmail(item.contact_email);
    setPhone(item.contact_number);
    setID(item.linked_lead);
    setComments(item.property_address);
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
        navigation.goBack();
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
          <Text
            style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
          >
            Edit Client
          </Text>

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
                Full Name
              </Text>
              <Text style={{ fontSize: 12, color: "#950000" }}>Required</Text>
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
              />
            </View>
          </View>

          <View style={{ width: "95%", alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
                Email
              </Text>
              <TouchableOpacity
                style={styles.iconcover}
                onPress={() => { setShowPopup(!showPopup) }}
              >
                <Image
                  style={{
                    height: 15,
                    margin: 2,
                    width: 15,
                    resizeMode: "contain",
                    tintColor: Colors.white,
                  }}
                  source={require("../../../assets/plus.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                style={{ width: 25, height: 25, backgroundColor: Colors.PrimaryColor, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => { }}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: "contain",

                  }}
                  source={require("../../../assets/mail.png")}
                ></Image>
              </TouchableOpacity>
              <TextInput
                allowFontScaling={false}
                style={{
                  width: "90%",
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

            <Modal
              animationType="slide"
              transparent={true}
              visible={showPopup}
              onRequestClose={closePopup}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      position: "absolute",
                      zIndex: 9999,
                      right: 6,
                      top: 6,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.popupButton}
                      onPress={closePopup}
                    >
                      <Image
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: "contain",
                        }}
                        source={require("../../../assets/closeblack.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
                      <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setValue(item.value);
                          setIsFocus(false);
                        }}

                      />
                      <TextInput
                        allowFontScaling={false}
                        style={{
                          width: "70%",
                          borderRadius: 8,
                          height: 50,
                          marginTop: 30,
                          marginLeft: 8,
                          color: Colors.black,
                          borderColor: Colors.gray,
                          borderWidth: 1,
                          borderColor: Colors.boderColor,
                          fontSize: 14,
                          padding: 2,
                        }}
                        autoCorrect={false}
                        returnKeyType="done"
                        onChangeText={(text) => setName(text)}
                      />
                    </View>
                    <View style={{width:"100%",justifyContent:"center",alignItems:"center",marginTop:16}}>
                      <View style={{width:'25%',height:50,borderRadius:10,backgroundColor:Colors.PrimaryColor,justifyContent:'center'}}>
                        <Text style={{color:Colors.white,textAlign:'center',justifyContent:'center',}}>Add</Text>
                      </View>
                      </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={{ width: "95%", alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
                Phone
              </Text>
              <TouchableOpacity
                style={styles.iconcover}
                onPress={() => { setShowPopup(!showPopup) }}
              >
                <Image
                  style={{
                    height: 15,
                    margin: 2,
                    width: 15,
                    resizeMode: "contain",
                    tintColor: Colors.white,
                  }}
                  source={require("../../../assets/plus.png")}
                />
              </TouchableOpacity>
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

          <View style={{ width: "95%", alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
                Address
              </Text>
              <TouchableOpacity
                style={styles.iconcover}
                onPress={() => { setShowPopup(!showPopup) }}
              >
                <Image
                  style={{
                    height: 15,
                    margin: 2,
                    width: 15,
                    resizeMode: "contain",
                    tintColor: Colors.white,
                  }}
                  source={require("../../../assets/plus.png")}
                />
              </TouchableOpacity>
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
                editable={true}
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
                value={comments}
                multiline={true}
                autoCorrect={false}
                returnKeyType="done"
                placeholderTextColor={Colors.black}
                onChangeText={(text) => setComments(text)}
              />
            </View>
          </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    width: "25%",

    marginTop: 30,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  popupButton: {
    backgroundColor: Colors.white,
    alignSelf: "center",
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: Colors.cream,
    padding: 16,
    borderRadius: 10,
    height:'40%',
    width: "100%",
  },
  popupContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  popupButton: {
    backgroundColor: Colors.white,
    alignSelf: "center",
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  iconcover: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,

    padding: 8,
    backgroundColor: Colors.PrimaryColor,
    borderRadius: 100,
  },
})
export default EditClientsDetails;
