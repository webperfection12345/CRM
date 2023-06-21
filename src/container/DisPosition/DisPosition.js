import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  FlatList,
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import addDisposition from "../../modules/addDisposition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const DisPosition = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [agentEmail, setAgentEmail] = useState("");
  const [note,setActivityNote] = useState("")
  const [data, setData] = useState([]);
  const [futureActivity,setFutureActivity]=useState("")
  const [date,setDate] =useState("");
  const item = props.route.params.item;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    getData();
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    closeModal();
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
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  const getData = async () => {
    setData(item);
    const userDetails = await AsyncStorage.getItem("userDetails");
    const parsedUserDetails = JSON.parse(userDetails);
    const email = parsedUserDetails.user_email;
    setAgentEmail(email);
  };
  const handleaddDisposition = () => {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(currentDateTime, "date1");
    setDate(currentDateTime);
    console.log(data);
    const payload = {
      contact_id: data.id,
      contact_lead_id: data.contact_lead_id,
      activity_type: "fgdf",
      activity_content_disposition: "g",
      activity_disposition_date_: "g",
      activity_disposition_notes: note,
      activity_next_disposition: "gh",
      next_disposition_notes: futureActivity,
      next_disposition_date: selectedDate,
      contact_email: data.contact_email,
      agent_email: agentEmail,
      activity_publish_date: date,
    };
    dispatch(addDisposition(payload)).then((response) => {
      console.log(response);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text
              style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
            >
              DisPosition
            </Text>
            <Text></Text>
          </View>
          <View
            style={{
              height: 80,
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: Colors.PrimaryColor,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.buttonColor,
                borderRadius: 5,
                width: "92%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/search.png")}
                style={{
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  tintColor: Colors.white,
                }}
              />
              <TextInput
                allowFontScaling={false}
                placeholder="Search"
                placeholderTextColor={Colors.white}
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 12,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 12,
            }}
          >
            <Image
              source={{ uri: data.contact_image }}
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
                marginRight: 12,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {data.contact_name}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: Colors.black,
                  marginBottom: 5,
                }}
              >
                {data.contact_number}{" "}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.PrimaryColor,
                }}
              >
                {data.contact_email}{" "}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              marginTop: 12,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                backgroundColor: Colors.PrimaryColor,
                paddingHorizontal: 12,
                paddingVertical: 6,
                color: Colors.white,
                borderRadius: 6,
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              Current Deposition : <Text>4</Text>
            </Text>
          </View>

          <View style={styles.activitytype}>
            <Text style={styles.label}>Activity Type</Text>
            <View
              style={{
                backgroundColor: Colors.PrimaryColor,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                borderRadius: 100,
                alignSelf: "center",
                flexDirection: "row",
              }}
            > 
             <TouchableOpacity onPress={openModal}>
              <Image
                source={require("../../../assets/plus.png")}
                style={{
                  height: 15,
                  width: 15,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              </TouchableOpacity>
              <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect("Call")}
            >
              <Text style={styles.optionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect("Message")}
            >
              <Text style={styles.optionText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect("Email")}
            >
              <Text style={styles.optionText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Activity Notes</Text>
            <View
              style={{
                width: "100%",
                height: 100,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: 100,
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: "#e6e8ea",
                  fontSize: 14,
                  padding: 2,
                  height: "100%",
                }}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setActivityNote(text)}
              />
            </View>
          </View>
          <View style={styles.activitytype}>
            <Text style={styles.label}>Next Action</Text>
            <View
              style={{
                backgroundColor: Colors.PrimaryColor,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                borderRadius: 100,
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              
              <Image
                source={require("../../../assets/plus.png")}
                style={{
                  height: 15,
                  width: 15,
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
             =
            </View>
       
          </View>
          <View style={styles.activitytype}>
            <Text style={styles.label}>Due Date</Text>
          
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                width: "100%",
                borderRadius: 8,
                height: "100%",
                paddingVertical: 9,
                color: Colors.black,
                borderColor: Colors.PrimaryColor,
                backgroundColor: Colors.gray,
                fontSize: 14,
                padding: 2,
                marginTop: 12,
                paddingHorizontal: 15,
                height: 55,
              }}
            >
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {selectedDate ? formatDate(selectedDate) : "None"}{" "}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
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
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Next Deposite Message</Text>
            <View
              style={{
                width: "100%",
                height: 100,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  width: "100%",
                  borderRadius: 8,
                  height: 100,
                  paddingHorizontal: 15,
                  color: Colors.black,
                  borderColor: Colors.PrimaryColor,
                  backgroundColor: "#e6e8ea",
                  fontSize: 14,
                  padding: 2,
                  height: "100%",
                }}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setFutureActivity(text)}
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
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: "45%",
                borderRadius: 5,
                backgroundColor: Colors.PrimaryColor,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleaddDisposition}
            >
              <Text
                style={{
                  fontSize: 14,

                  color: Colors.white,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default DisPosition;

const styles = StyleSheet.create({
  activitytype: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  inputContainer: { paddingHorizontal: 12, marginTop: 15 },
});
