import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Picker,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { transectioAddActivity } from "../../modules/transectionAddActivity";

import Colors from "../../utils/Colors";
import { ScrollView, TextInput } from "react-native-gesture-handler";
// import { Button } from "react-native-web";

const NewActivies = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");

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
          ></Image>
          <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
        </TouchableOpacity>
        <Text
          style={{ textAlign: "center", alignSelf: "center", color: "white" }}
        >
          New Activities
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewActivies")}
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
            <Picker
              selectedValue={selectedValue}
              onChangeText={setSelectedValue}
            >
              <Picker.Item label="Note" value="Note" />
              <Picker.Item label="call" value="call" />
              <Picker.Item label="In Person" value="In Person" />
              <Picker.Item label="Task" value="Task" />
              <Picker.Item label="Video" value="Video" />
            </Picker>
            <TouchableOpacity>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: "contain",
                  tintColor: "grey",
                }}
                source={require("../../../assets/arrowDown.png")}
              ></Image>
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
            <Text
              style={{
                fontSize: 14,
                margin: 5,
              }}
            >
              Activity
            </Text>
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
            onChangeText={(te) => te}
          />
          <Text
            style={{
              fontSize: 14,

              margin: 12,
            }}
          >
            Contact
          </Text>
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
            <TouchableOpacity>
              <Picker selectedValue={selectedValue} onChangeText={(te) => te}>
                <Picker.Item label="Note" value="Note" />
                <Picker.Item label="call" value="call" />
              </Picker>
            </TouchableOpacity>
            <TextInput style={{}} placeholder="" onChangeText={(te) => te} />

            <TouchableOpacity>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: "contain",
                  tintColor: "grey",
                }}
                source={require("../../../assets/arrowDown.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text style={{ margin: 10, fontSize: 14, marginRight: 10 }}>
            Due Date
          </Text>
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
              ></Image>
            </TouchableOpacity>
            <TextInput style={{}} placeholder="" onChangeText={(te) => te} />
          </View>
          <Text style={{ fontSize: 14, margin: 10 }}>Notes</Text>
          <TextInput
            style={{
              margin: 10,

              borderWidth: 1,
              padding: 30,
              borderColor: "grey",
              borderRadius: 15,
            }}
            placeholder=""
            onChangeText={(te) => te}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 14 }}>Owner</Text>
            <Text>Required</Text>
          </View>
          <TextInput
            style={{
              margin: 10,

              borderWidth: 1,
              padding: 15,
              borderColor: "grey",
              borderRadius: 15,
            }}
            placeholder=""
            onChangeText={(te) => te}
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              marginHorizontal: 10,
              marginBottom: 20,
            }}
          >
            <View
              style={{ backgroundColor: Colors.PrimaryColor, borderRadius: 10 }}
            >
              <Button
                title="Submit"
                onPress={onhandleClick}
                color={Colors.buttonColor}
              />
            </View>
            <View
              style={{
                backgroundColor: Colors.gray,
                borderRadius: 10,
                marginHorizontal: 20,
              }}
            >
              <Button
                title="Cancel"
                onPress={() => {
                  navigation.goBack();
                }}
                color={Colors.PrimaryColor}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewActivies;
