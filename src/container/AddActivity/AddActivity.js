import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addActivityTask } from "../../modules/addActivityTask";
import Colors from "../../utils/Colors";
import { Picker } from "@react-native-picker/picker";
import getMyClientDetails from "../../modules/getMyClientDetails";

const AddActivity = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("note");
  const [login, setLogin] = useState("");
  const [notes, setNotes] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userDetails = await AsyncStorage.getItem("userDetails");
    const parsedUserDetails = JSON.parse(userDetails);
    const email = parsedUserDetails.user_email;
    setAgentEmail(email);
  };

  const addActivity = () => {
    const payload = {
      client_id: props.route.params.item.id,
      contact_lead_id: props.route.params.item.contact_lead_id,
      activity_type: selectedOption,
      activity_content: login,
      activity_date: selectedDate,
      activity_notes: notes,
      contact_email: props.route.params.item.contact_email,
      agent_email: agentEmail,
    };
    dispatch(addActivityTask(payload)).then((response) => {
      navigation.goBack();
    });
  };

  const onHandleClick = () => {
    addActivity();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{  fontSize: 19, fontWeight: "bold", color: Colors.white }}>New Activity</Text>
        <TouchableOpacity onPress={onHandleClick}>
          <Text style={styles.headerText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Activity Type</Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <Picker
                selectedValue={selectedOption}
                onValueChange={handleOptionChange}
                style={{
                  borderRadius: 8,
                  backgroundColor: Colors.gray,
                  width: "100%",
                  height: "100%",
                  paddingHorizontal: 15,
                  color: Colors.black,
                  backgroundColor: Colors.gray,
                  fontSize: 14,
                  padding: 2,
                  borderColor:  Colors.gray,
                }}
              >
                <Picker.Item label="Note" value="note" />
                <Picker.Item label="Call" value="call" />
                <Picker.Item label="In-person" value="inperson" />
                <Picker.Item label="Task" value="task" />
                <Picker.Item label="Video call" value="videocall" />
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Activity</Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                onChangeText={setLogin}
                value={login}
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
            <Text style={styles.label}>Due Date</Text>
            <View
              style={{
               width: "100%",
                borderRadius: 8,
                height: "100%",
                paddingVertical:9,
                color: Colors.black,
                borderColor: Colors.PrimaryColor,
                backgroundColor: Colors.gray,
                fontSize: 14,
                padding: 2,
                marginTop:12,
                paddingHorizontal:15,
                height:55,
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
            <Text style={styles.label}>Notes</Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                onChangeText={setNotes}
                value={notes}
                multiline={true}
                numberOfLines={4}
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
            <Text style={styles.label}>Contact Email</Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                value={props.route.params.item.contact_email}
                editable={false}
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
            <Text style={styles.label}>Owner</Text>
            <View
              style={{
                width: "100%",
                height: 50,
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TextInput
                onChangeText={setAgentEmail}
                value={agentEmail}
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
      </ScrollView>
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

export default AddActivity;
