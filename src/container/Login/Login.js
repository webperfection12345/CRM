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
  SafeAreaView,
} from "react-native";
import Images from "../../utils/Images";
import Colors from "../../utils/Colors";
import AppButton from "../../components/AppButton";
import Activity from "../../components/Activity";
import { loginUser } from "../../modules/loginUser";
import { useSelector, useDispatch } from "react-redux";

import * as AuthSession from "expo-auth-session";
// For Add Google SignIn
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [activity, setActivity] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // GoogleSignin.configure({
    //   // Mandatory method to call before calling signIn()
    //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    //   // Replace with your webClientId
    //   // Generated from Firebase console
    //   webClientId:
    //     "395789572020-7rq94as2vajfqvr9vhrbdhpg166gdpqm.apps.googleusercontent.com",
    // });
  }, []);
  // const googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const { accessToken, idToken } = await GoogleSignin.signIn();
  //     const credential = auth.GoogleAuthProvider.credential(
  //       idToken,
  //       accessToken
  //     );
  //     await auth().signInWithCredential(credential);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       console.log("Signin Cancel");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("Signin in progress");
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("PLAY_SERVICES_NOT_AVAILABLE");
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const accessRequestAction = () => {};
  const go = () => {
    setActivity(true);
    userLogin();
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (reg.test(email) === true) {
    //   userLogin();
    // } else {
    //   if (email == '') {
    //     Alert.alert('Enter Email Address');
    //     console.log('Enter Email Address');
    //   } else {
    //     Alert.alert('Email is Invalid');
    //     console.log('Email is invalid');
    //   }
    // }
  };
  const userLogin = () => {
    let data = {
      username: email,
      password: password,
    };
    dispatch(loginUser(data)).then((response) => {
      console.log("res", response);
      if (response.payload.status) {
        if (response.payload.status) {
          navigation.navigate("EnterPin", { email: email });
          setTimeout(() => {
            setActivity(false);
          }, 3000);
        } else {
          navigation.navigate("AccessRequest", { email: email });
          setTimeout(() => {
            setActivity(false);
          }, 3000);
        }
      } else {
        Alert.alert("Please Check E-mail and Password");
        setActivity(false);
      }
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!activity ? (
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
              height: 400,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 70, color: Colors.white, fontWeight: "bold" }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: Colors.white,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Please enter your email address
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                autoCapitalize="none"
                placeholder="Email address"
                placeholderTextColor={Colors.white}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor={Colors.white}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View style={{ height: 200, width: "100%" }}>
            <AppButton
              onPress={() => go()}
              btnText={"Continue"}
              textStyle={{
                fontSize: 20,
                fontWeight: "500",
                color: Colors.black,
              }}
              btnStyle={{
                borderRadius: 6,
                backgroundColor: Colors.white,
              }}
            />
            <TouchableOpacity
              //onPress={() => googleLogin()}
              style={{
                width: "90%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.buttonColor,
                marginTop: "5%",
                borderRadius: 3,
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../../assets/google.png")}
                style={{ height: 20, width: 20 }}
              ></Image>
              <Text
                allowFontScaling={false}
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "500",
                  marginLeft: 10,
                }}
              >
                Sign in with google
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Activity />
      )}
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
