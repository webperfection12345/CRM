import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";
import { getProperties } from "../../modules/getProperties";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addContact } from "../../modules/addContact";
import { Picker } from "@react-native-picker/picker";
import { getContacts } from "../../modules/getContacts";
const AddContacts = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const [meetingType, setMeetingType] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [avatarSource, setAvatarSource] = useState(null);
  const [uriResponse, setUriResponse] = useState(null);
  const [comment, setComment] = useState("");
  const [agentId, setAgentId] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const contactTypes = [
    "Buyer",
    "Seller",
    "Associated",
    "Lender",
    "Insurance",
    "Inspector",
    "Real Estate Agent",
    "Title Co",
    "Attorney",
    "Escrow Agent",
    "Appraiser",
    "Contractor",
    "Other",
  ];
  const [selectedContactType, setSelectedContactType] = useState("");

  const handleContactTypeChange = (itemValue) => {
    console.log(itemValue, "item");
    setSelectedContactType(itemValue);
  };
  const handleConfirm = (date) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setSelectedDate(formattedDate);
    hideDatePicker();
  };
  useEffect(() => {
    getAllProperties();
    getData();
  }, []);
  const getAllProperties = () => {
    dispatch(getProperties()).then((response) => {
      setDropdownData(response.payload);
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
      setUriResponse(base64Image);
    }
  };
  const getData = async () => {
    const userDetails = await AsyncStorage.getItem("userDetails");
    const parsedUserDetails = JSON.parse(userDetails);
    const id = parsedUserDetails.ID;
    setAgentId(id);
  };
  const formatDate = (date) => {
    return date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata", // Set the desired timezone
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const handleAddContact = () => {
    const payload = {
      user_email: email,
      user_first_name: name,
      user_last_name: lastName,
      user_mobile: phone,
      agentid: agentId,
      schedule_mode: meetingType,
      comment: comment,
      propid: selectedValue,
      contactimg: uriResponse,
    };
    dispatch(addContact(payload)).then((response) => {
      getContacts();
      navigation.goBack();
    });
  };

  const onHandleClick = () => {
    handleAddContact();
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
            onPress={handleAddContact}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
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
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setName(text)}
              />
            </View>
          </View>
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
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setLastName(text)}
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
                keyboardType="number-pad"
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setPhone(text)}
              />
            </View>
          </View>
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
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: Colors.gray,
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
              Properties
            </Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                style={{
                  width: "98%",
                  marginLeft: 13,
                  borderRadius: 8,
                  backgroundColor: Colors.gray,
                }}
              >
                <Picker.Item label="Select an option" value="" />
                {dropdownData.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.property_address}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Comments
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
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setComment(text)}
              />
            </View>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.datePickerText}>
                  {selectedDate ? formatDate(selectedDate) : "None"}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          <View>
            <Picker
              selectedValue={selectedContactType}
              onValueChange={handleContactTypeChange}
            >
              {contactTypes.map((contactType) => (
                <Picker.Item
                  key={contactType}
                  label={contactType}
                  value={contactType}
                />
              ))}
            </Picker>
          </View>
          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}>
              Schedule Mode
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
              onPress={() => setMeetingType("in_person")}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor:
                    meetingType === "in_person"
                      ? Colors.PrimaryColor
                      : Colors.gray,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {meetingType === "in_person" && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: Colors.PrimaryColor,
                    }}
                  />
                )}
              </View>
              <Text>In Person</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
              onPress={() => setMeetingType("video_call")}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor:
                    meetingType === "video_call"
                      ? Colors.PrimaryColor
                      : Colors.gray,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {meetingType === "video_call" && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: Colors.PrimaryColor,
                    }}
                  />
                )}
              </View>
              <Text>Video Call</Text>
            </TouchableOpacity>
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
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.PrimaryColor,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexGrow: 1,
    margin: 10,
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 3,
  },
  picker: {
    height: 40,
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 3,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
  },
  datePickerButton: {
    paddingVertical: 10,
  },
  datePickerText: {
    fontSize: 14,
  },
});

export default AddContacts;
