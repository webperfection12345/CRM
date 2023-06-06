import React from "react";
import { Text, View, ImageBackground } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../utils/Images";
import Colors from "../utils/Colors";
const Splash = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        style={{ height: "100%", width: "100%", justifyContent: "center" }}
        source={Images.dummySplash}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 30, color: Colors.white, fontWeight: "bold" }}
          >
            Lokul CRM WIP
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;
