import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
// import ImagePicker from "react-native-image-crop-picker";
import CustomAlert from "../../components/CustomAlert";

const DeletePropertiy = () => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);

  const handlePress = () => {
    setShowAlert(true);
  };

  const onCancel = () => {
    setShowAlert(false);
  };

  const onDelete = () => {
    setShowAlert(false);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
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
          <Text style={{ fontSize: 15, color: Colors.white }}></Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: Colors.white }}>Done</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handlePress()}
          style={{ alignSelf: "center", marginTop: 30 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
            Delete Item
          </Text>
        </TouchableOpacity>
        <CustomAlert
          title="Are you sure you want to delete this item?"
          message="This action cannot be undone"
          firstName={"Cancel"}
          secondName={"Delete"}
          visible={showAlert}
          onCancel={() => onCancel()}
          onDelete={() => onDelete()}
        />
        <View style={{ height: 50 }}></View>
      </View>
    </SafeAreaView>
  );
};

export default DeletePropertiy;
