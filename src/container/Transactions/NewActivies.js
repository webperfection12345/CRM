import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Picker,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getContacts } from "../../modules/getContacts";
import { transectioAddActivity } from "../../modules/transectionAddActivity";
import Colors from "../../utils/Colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const NewActivities = ({ navigation }) => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValu, setSelectedValu] = useState("");
  const getAllContacts = () => {
    dispatch(getContacts()).then((response) => {
      const contactsData = response.payload.data;
      setContact(contactsData);
    });
  };

  const addNewActivity = () => {
    const payload = {
      // client_id: items.item.id,
      // contact_lead_id: items.item.contact_lead_id,
      // activity_type: activity,
      // activity_content: login,
      // activity_date: date,
      // activity_notes: notes,
      // contact_email: items.item.contact_email,
      // agent_email: agentEmail,
    };
    dispatch(transectioAddActivity(payload)).then((response) => {
      navigation.goBack();
      console.log(response, "response");
    });
  };

  const onhandleClick = () => {
    addNewActivity();
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#576ebd",
          width: "100%",
          height: "10%",
          flexDirection: "row",
          justifyContent: "space-between",
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
          />
          <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
        </TouchableOpacity>
        <Text
          style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
        >
          New Activities
        </Text>
        <TouchableOpacity
          // onPress={() => navigation.navigate("NewActivities")}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        ></TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ backgroundColor: "white", margin: 2 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              margin: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, margin: 5 }}>Activity Type</Text>
            <Text style={{ fontSize: 14 }}>Required</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              borderWidth: 1,
              padding: 15,
              borderColor: "grey",
              borderRadius: 15,
              justifyContent: "space-between",
            }}
          >
            {/* <Picker
              selectedValue={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
            >
              <Picker.Item label="Note" value="Note" />
              <Picker.Item label="Call" value="Call" />
              <Picker.Item label="In Person" value="In Person" />
              <Picker.Item label="Task" value="Task" />
              <Picker.Item label="Video" value="Video" />
            </Picker> */}
            <TouchableOpacity>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: "contain",
                  tintColor: "grey",
                }}
                source={require("../../../assets/arrowDown.png")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 14, margin: 5 }}>Activity</Text>
            <Text style={{ fontSize: 14, alignSelf: "center" }}>Required</Text>
          </View>
          <TextInput
            style={{
              margin: 10,
              marginTop: 1,
              borderWidth: 1,
              padding: 15,
              borderColor: "grey",
              borderRadius: 15,
            }}
            placeholder=""
            onChangeText={(text) => text}
          />
          <Text style={{ fontSize: 14, margin: 10 }}>Contact</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
              borderWidth: 1,
              padding: 15,
              borderColor: "grey",
              borderRadius: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                borderWidth: 1,
                padding: 15,
                borderColor: "grey",
                borderRadius: 15,
              }}
            >
              {/* <Picker
                selectedValue={selectedValu}
                onValueChange={(value) => setSelectedValu(value)}
              >
                {contact.map((contacts) => (
                  <Picker.Item
                    key={contacts.id}
                    label={contacts.contact_name}
                    value={contacts.id}
                  />
                ))}
              </Picker> */}
              <TouchableOpacity>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: "contain",
                    tintColor: "grey",
                  }}
                  source={require("../../../assets/arrowDown.png")}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={{ flex: 1 }}
              placeholder=""
              onChangeText={(text) => text}
            />

            <TouchableOpacity>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: "contain",
                  tintColor: "grey",
                }}
                source={require("../../../assets/arrowDown.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ margin: 10, fontSize: 14 }}>Due Date</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              margin: 10,
              borderWidth: 1,
              padding: 15,
              borderColor: "grey",
              borderRadius: 15,
            }}
          >
            <TouchableOpacity>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: "contain",
                  tintColor: "grey",
                }}
                source={require("./../../assets/images/calendar.png")}
              />
            </TouchableOpacity>
            <TextInput
              style={{ flex: 1 }}
              placeholder=""
              onChangeText={(text) => text}
            />
          </View>
          <Text style={{ fontSize: 14, margin: 10 }}>Notes</Text>
          <TextInput
            style={{
              margin: 10,
              marginTop: 1,
              borderWidth: 1,
              padding: 15,
              borderColor: "grey",
              borderRadius: 15,
            }}
            multiline={true}
            numberOfLines={4}
            placeholder=""
            onChangeText={(text) => text}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.themeColor,
              margin: 10,
              height: 40,
              borderRadius: 15,
            }}
            onPress={onhandleClick}
          >
            <Text style={{ color: "black" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewActivities;
