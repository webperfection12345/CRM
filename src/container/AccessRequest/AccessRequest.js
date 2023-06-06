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
} from "react-native";

import Images from "../../utils/Images";
import Colors from "../../utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";

export default function AccessRequest(props) {
  const emailAddress = props.route.params.email;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backAction = () => {
    navigation.goBack();
  };
  const dashboardAction = () => {
    navigation.navigate("AccessRequestSent", { email: emailAddress });
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
            height: 300,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 40, color: Colors.white, fontWeight: "bold" }}
          >
            You need access
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.white,
              fontWeight: "500",
              marginTop: 10,
              width: "90%",
              textAlign: "center",
            }}
          >
            Request access, or switch to an account with access to sign in to
            this page.
          </Text>
          <View style={styles.inputView}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.white,
                fontWeight: "500",
                marginTop: 10,
                width: "90%",
                textAlign: "center",
              }}
            >
              {emailAddress}
            </Text>
          </View>
        </View>
        <View style={{ height: 400, width: "100%" }}>
          <AppButton
            onPress={() => dashboardAction()}
            btnText={"Request access"}
            textStyle={{ fontSize: 20, fontWeight: "500", color: Colors.black }}
            btnStyle={{
              marginTop: "13%",
              borderRadius: 6,
              backgroundColor: Colors.white,
            }}
          />
          <AppButton
            onPress={() => backAction()}
            btnText={"Back to sign in"}
            textStyle={{ fontSize: 20, fontWeight: "500", color: Colors.white }}
            btnStyle={{
              marginTop: "13%",
              borderRadius: 6,
              backgroundColor: Colors.buttonColor,
            }}
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
    width: "90%",
    marginTop: 30,
    alignItems: "center",
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
