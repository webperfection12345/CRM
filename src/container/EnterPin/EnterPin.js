import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import Images from "../../utils/Images";
import Colors from "../../utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
export default function EnterPin(props) {
  const navigation = useNavigation();
  const emailAddress = props.route.params.email;
  const [pin, setPin] = useState("123456");
  const [oldPin, setOldPin] = useState("123456");
  const [password, setPassword] = useState("");
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const accessRequestAction = () => {
    if (pin == oldPin) {
      navigation.navigate("Dashboard");
    } else {
      Alert.alert("Please enter valid pin");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: Colors.PrimaryColor,
        }}
      >
        <View
          style={{
            height: 100,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, color: Colors.white, fontWeight: "bold" }}
          >
            Lokul CRM WIP
          </Text>
        </View>
        <View
          style={{
            height: 350,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontWeight: "500",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            We've sent a pin to {emailAddress}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontWeight: "500",
              marginTop: 10,
              textAlign: "center",
              width: "80%",
            }}
          >
            Check your spam folder if you don't receive it.
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter pin"
              placeholderTextColor={Colors.white}
              inputMode="numeric"
              maxLength={8}
              value={pin}
              secureTextEntry
              onChangeText={(pin) => setPin(pin)}
            />
          </View>
        </View>
        <View style={{ height: 200, width: "100%" }}>
          <AppButton
            onPress={() => accessRequestAction()}
            btnText={"Sign In"}
            textStyle={{ fontSize: 20, fontWeight: "500", color: Colors.white }}
            btnStyle={{ marginTop: "13%", borderRadius: 6 }}
          />
          <AppButton
            onPress={() => navigation.goBack()}
            btnText={"I need another pin"}
            textStyle={{ fontSize: 20, fontWeight: "500", color: Colors.white }}
            btnStyle={{ backgroundColor: "transparent" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PrimaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    height: 200,
    width: 200,
  },
  inputView: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 5,
    width: "90%",
    height: 50,
    marginTop: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: "center",
  },
  TextInput: {
    width: "90%",
    color: Colors.white,
    fontSize: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
