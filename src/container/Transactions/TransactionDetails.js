import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
} from "react-native";
import Colors from "../../utils/Colors";

const TransactionDetails = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const Submit = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#576ebd",
          width: "100%",
          height: "10%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
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
            style={{ textAlign: "center", alignSelf: "center",  fontSize: 19, fontWeight: "bold", color: Colors.white }}
          >
            TransactionDetails
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate("NewActivies")}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                // tintColor: Colors.white,
                tintColor: "white",
              }}
              source={require("./../../assets/images/bin.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2, backgroundColor: "white" }}>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16 }}>Activity Type</Text>
          <Text>Required</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
            alignItems: "center",
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 15,
          }}
        >
          {/* <Image
            style={{
              height: 50,
              width: 50,
              resizeMode: "contain",
              borderRadius: 100,
              //   tintColor: Colors.white,
            }}
            source={require("./../../assets/images/notePad.jpeg")}
          ></Image> */}
          <TextInput
            style={{ fontSize: 16 }}
            placeholder="Note"
            onChangeText={(tex) => tex}
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
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16, margin: 10 }}>Subject</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 30,
            margin: 10,
          }}
          placeholder="Test"
          onChangeText={(tex) => tex}
        />

        <Text style={{ margin: 10, fontSize: 14 }}>Due Date</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            margin: 10,

            borderWidth: 0.5,
            padding: 15,
            // borderColor: "grey",
            borderRadius: 10,
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
        <Text style={{ margin: 10, fontSize: 14 }}>Result</Text>
        <TextInput
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 30,
            margin: 10,
          }}
          placeholder="hello"
          onChangeText={(te) => te}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ margin: 10, fontSize: 16 }}>Completed</Text>
          <View>
            <Switch
              style={{ height: 30, width: 50 }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={Submit}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default TransactionDetails;
