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

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import updateActivity from "../../modules/editAcitivity";

const EditActivity = (props) => {
  const navigation = useNavigation();
  const [ActivityType, setActivityType] = useState("");
  const [ActivityDispositionNotes, setActivityDispositionNotes] = useState("");
  const [ActivityNextDisposition, setActivityNextDisposition] = useState("");
  const [ActivityNextDispositionNote, setActivityNextDispositionNotes] =
    useState("");
  const [ActivityNextDispositionDate, setActivityNextDispositionDate] =
    useState("");
  const [ActivityDisposition, setActivityDisposition] = useState("");
  const [taskId, setTaskId] = useState("");
  const [date, setDate] = useState("");
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  console.log(props.route.params);
  const item = props.route.params.item;
  const isFocused = useIsFocused();
  useEffect(() => {
    setActivityType(item.activity_type);
    setActivityDispositionNotes(item.activity_notes);
    setActivityNextDisposition(item.activity_next_disposition);
    setActivityNextDispositionNotes(item.next_disposition_notes);
    setActivityNextDispositionDate(item.next_disposition_date);
    setActivityDisposition(item.activity_disposition);
    setTaskId(item.task_id);
  }, [item]);
  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);
  console.log(ActivityType, "tyope");
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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
  const onHandleClick = () => {
    const payload = {
      task_id: taskId,
      activity_type: ActivityType,
      activity_disposition: ActivityDisposition,
      activity_disposition_notes: ActivityDispositionNotes,
      activity_next_disposition: ActivityNextDisposition,
      next_disposition_notes: ActivityNextDispositionNote,
      next_disposition_date: ActivityNextDispositionDate,
    };

    updateActivity(payload)
      .then((response) => {
        console.log(response);
        navigation.goBack()
      })
      .catch((error) => {
        console.log('Error updating activity:', error);
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
            onPress={onHandleClick}
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
                Activity Type
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
                value={ActivityType}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setActivityType(text)}
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
                Activity Disposition
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
                value={ActivityDisposition}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setActivityDisposition(text)}
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
                Activity Notes
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
                value={ActivityDispositionNotes}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setActivityDispositionNotes(text)}
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
                Activity Next Disposition
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
                value={ActivityNextDisposition}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setActivityNextDisposition(text)}
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
                Next Disposition Date
              </Text>
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
                Next Disposition Notes
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
                value={ActivityNextDispositionNote}
                autoCorrect={false}
                returnKeyType="done"
                onChangeText={(text) => setActivityNextDispositionNotes(text)}
              />
            </View>
          </View>
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditActivity;
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
    marginLeft: 10,
  },
});
