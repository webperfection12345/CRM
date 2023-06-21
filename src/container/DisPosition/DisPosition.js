import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../utils/Colors";
const DisPosition = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
          >
            DisPosition
          </Text>
          <Text></Text>
        </View>
        <View
          style={{
            height: 80,
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: Colors.PrimaryColor,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              width: "92%",
              height: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/search.png")}
              style={{
                height: 20,
                width: 20,
                marginLeft: 10,
                tintColor: Colors.white,
              }}
            />
            <TextInput
              allowFontScaling={false}
              placeholder="Search"
              placeholderTextColor={Colors.white}
              style={{
                color: Colors.white,
                fontSize: 12,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 12,
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 12,
          }}
        >
          <Image
            source={require("../../../assets/profilePic.png")}
            style={{
              height: 120,
              width: 120,
              borderRadius: 100,
              marginRight: 12,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              John Doe
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: Colors.black,
                marginBottom: 5,
              }}
            >
              999-6785-56745
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Colors.PrimaryColor,
              }}
            >
              johndoe@gmail.com
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 12,
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{
              backgroundColor: Colors.PrimaryColor,
              paddingHorizontal: 12,
              paddingVertical: 6,
              color: Colors.white,
              borderRadius: 6,
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Current Deposition : <Text>4</Text>
          </Text>
        </View>

        <View style={styles.activitytype}>
          <Text style={styles.label}>Activity Type</Text>
          <View
            style={{
              backgroundColor: Colors.PrimaryColor,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              width: 40,
              borderRadius: 100,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../../assets/plus.png")}
              style={{
                height: 15,
                width: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Activity Notes</Text>
          <View
            style={{
              width: "100%",
              height: 100,
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                borderRadius: 8,
                height: 100,
                paddingHorizontal: 15,
                color: Colors.black,
                borderColor: Colors.PrimaryColor,
                backgroundColor: "#e6e8ea",
                fontSize: 14,
                padding: 2,
                height: "100%",
              }}
            />
          </View>
        </View>
        <View style={styles.activitytype}>
          <Text style={styles.label}>Next Action</Text>
          <View
            style={{
              backgroundColor: Colors.PrimaryColor,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              width: 40,
              borderRadius: 100,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../../assets/plus.png")}
              style={{
                height: 15,
                width: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        </View>
        <View style={styles.activitytype}>
          <Text style={styles.label}>Due Date</Text>
          <View
            style={{
              backgroundColor: Colors.PrimaryColor,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              width: 40,
              borderRadius: 100,
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../../assets/plus.png")}
              style={{
                height: 15,
                width: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
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
            {/* <TouchableOpacity
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
            /> */}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Next Deposite Message</Text>
          <View
            style={{
              width: "100%",
              height: 100,
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                borderRadius: 8,
                height: 100,
                paddingHorizontal: 15,
                color: Colors.black,
                borderColor: Colors.PrimaryColor,
                backgroundColor: "#e6e8ea",
                fontSize: 14,
                padding: 2,
                height: "100%",
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            height: 60,
            marginTop: 20,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 35,
              width: "45%",
              borderRadius: 5,
              backgroundColor: Colors.PrimaryColor,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,

                color: Colors.white,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisPosition;

const styles = StyleSheet.create({
  activitytype: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  inputContainer: { paddingHorizontal: 12, marginTop: 15 },
});
