import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Colors from "../../utils/Colors";
import { ScrollView } from "react-native-gesture-handler";
const Transaction = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <ScrollView>
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
              Transactions
            </Text>
            <TouchableOpacity
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
                  tintColor: Colors.white,
                }}
                source={require("../../../assets/edit.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomColor: Colors.gray,
              borderBottomWidth: 1,
              paddingBottom: 25,
            }}
          >
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                2 Sheldrake Lane
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Closing Date
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                05/30/2023
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Commission
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                $6,480
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Transaction Side
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                Buyer
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Transaction Desk View
              </Text>
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: Colors.PrimaryColor,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: "contain",
                    tintColor: Colors.white,
                  }}
                  source={require("../../../assets/fav.png")}
                ></Image>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: Colors.gray,
              borderBottomWidth: 1,
              paddingBottom: 25,
            }}
          >
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                2 Sheldrake Lane
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Closing Date
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                05/30/2023
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Commission
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                $6,480
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Transaction Side
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}
              >
                Buyer/Seller
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "90%",
                alignSelf: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#8d8a8a",
                  fontSize: 14,
                }}
              >
                Transaction Desk View
              </Text>
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: Colors.PrimaryColor,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: "contain",
                    tintColor: Colors.white,
                  }}
                  source={require("../../../assets/fav.png")}
                ></Image>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
