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
  Modal,
  Linking,
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
  const [note, setActivityNote] = useState("");
  const [data, setData] = useState([]);
  const [futureActivity, setFutureActivity] = useState("");
  const [date, setDate] = useState("");
  const item = props.route.params.item;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [selectedSecondOption, setSelectedSecondOption] = useState(null);
  const [isThirdModalVisible, setThirdModalVisible] = useState(false);
  const [selectedThirdOption, setSelectedThirdOption] = useState(null);

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
  const openSecondModal = () => {
    setSecondModalVisible(true);
  };

  const closeSecondModal = () => {
    setSecondModalVisible(false);
  };
  const openThirdModal = () => {
    setThirdModalVisible(true);
  };

  const closeThirdModal = () => {
    setThirdModalVisible(false);
  };
  const handleThirdOptionSelect = (option) => {
    setSelectedThirdOption(option);
    closeThirdModal();
  };

  const handleSecondOptionSelect = (option) => {
    setSelectedSecondOption(option);
    closeSecondModal();
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
    fetch(
      `https://surf.topsearchrealty.com/wp-json/activity/currentdispositions?Contactid=${item.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDate(data.data[0].current_disposition);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleaddDisposition = () => {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const payload = {
      contact_id: data.id,
      contact_lead_id: data.contact_lead_id,
      activity_type: selectedOption,
      activity_disposition_notes: note,
      activity_next_disposition: selectedSecondOption,
      next_disposition_notes: futureActivity,
      next_disposition_date: selectedDate,
      contact_email: data.contact_email,
      agent_email: agentEmail,
      activity_publish_date: currentDateTime,
      activity_disposition: selectedThirdOption,
    };
    dispatch(addDisposition(payload)).then((response) => {
      navigation.goBack();
      console.log(response);
    });
  };
  const makePhoneCall = (item) => {
    let phoneNumber = data.contact_number;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const sendEmail = (item) => {
    let recipient = item;
    let subject = "Subject of email";
    let body = "Body of email";
    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  const sendSMS = (item) => {
    let phoneNumber = item;
    let message = "Hello from my app!";
    Linking.openURL(`sms:${phoneNumber}`);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 60,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MyClientsDetails", { item: item })
          }
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
          {/* <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text> */}
        </TouchableOpacity>
        <Text style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}>
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
              fontSize: 15,
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Colors.white,
          }}
        >
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
                borderWidth: 1,
                borderColor: Colors.gray,
              }}
            />

            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  position: "relative",
                  left: 12,
                }}
              >
                {data.contact_name}
              </Text>

              <View
                style={{
                  height: 80,
                  alignSelf: "flex-end",
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <TouchableOpacity
                  onPress={() => sendEmail(item.contact_email)}
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
                      marginRight: 12,
                    }}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => sendSMS(item.contact_number)}
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
                      marginRight: 12,
                    }}
                  ></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => makePhoneCall(item.contact_number)}
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
              Current Deposition : <Text>{date}</Text>
            </Text>
          </View>
          <View style={styles.activitytype}>
            <Text style={styles.label}>
              Activity DisPosition
              <Text style={styles.selectedValue}>
                {selectedThirdOption}
              </Text>{" "}
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                borderRadius: 100,
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={openThirdModal}>
                <Image
                  source={require("../../../assets/plus.png")}
                  style={{
                    height: 15,
                    width: 15,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.PrimaryColor,
                  }}
                />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={isThirdModalVisible}
                onRequestClose={closeThirdModal}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => handleThirdOptionSelect("ContactSigned")}
                    >
                      <Text style={styles.optionText}>Contact Signed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => handleThirdOptionSelect("Pending")}
                    >
                      <Text style={styles.optionText}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => handleThirdOptionSelect("prepare")}
                    >
                      <Text style={styles.optionText}>Prepare</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => handleThirdOptionSelect("Hold")}
                    >
                      <Text style={styles.optionText}>Hold</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>

          <View style={styles.activitytype}>
            <Text style={styles.label}>
              Activity Type
              <Text style={styles.selectedValue}>{selectedOption}</Text>{" "}
            </Text>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                borderRadius: 100,
                alignSelf: "center",
                flexDirection: "row",
                backgroundColor: Colors.PrimaryColor,
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
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={closeModal}
            >
              <Text style={styles.selectedValue}>{selectedOption}</Text>
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
                  //backgroundColor: "#e6e8ea",
                  borderColor: Colors.cream,
                  borderWidth: 1,
                  fontSize: 14,
                  padding: 2,
                  height: "100%",
                  verticalAlign: "top",
                  paddingTop: 12,
                }}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setActivityNote(text)}
              />
            </View>
          </View>
          <View style={styles.activitytype}>
            <Text style={styles.label}>
              Next Action
              <Text style={styles.selectedValue}>{selectedSecondOption}</Text>
            </Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                borderRadius: 100,
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={openSecondModal}>
                <Image
                  source={require("../../../assets/plus.png")}
                  style={{
                    height: 15,
                    width: 15,
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: Colors.PrimaryColor,
                    justifyContent: "center",
                  }}
                />
              </TouchableOpacity>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={isSecondModalVisible}
              onRequestClose={closeSecondModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleSecondOptionSelect("Call")}
                  >
                    <Text style={styles.optionText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleSecondOptionSelect("Message")}
                  >
                    <Text style={styles.optionText}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleSecondOptionSelect("Email")}
                  >
                    <Text style={styles.optionText}>Email</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
                // backgroundColor: Colors.gray,
                borderColor: Colors.cream,
                borderWidth: 1,
                fontSize: 14,
                paddingTop: 18,

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
                  //backgroundColor: "#e6e8ea",
                  borderColor: Colors.cream,
                  borderWidth: 1,
                  fontSize: 14,
                  padding: 2,
                  height: "100%",
                  verticalAlign: "top",
                  paddingTop: 12,
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

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownButton: {
    backgroundColor: Colors.PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 100,
    alignSelf: "center",
    flexDirection: "row",
  },
  plusIcon: {
    height: 15,
    width: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    width: 200,
  },
  optionButton: {
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedValue: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.PrimaryColor,
    textAlign: "center",
  },
  selectedValue: {
    //marginLeft: 10,
    paddingLeft:10
  },
});
