import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import Colors from "../../utils/Colors";
import getLeads from "../../modules/getLeads";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const Leads = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    getAllContacts();
    if (isFocused) {
      // Perform the refresh logic here
      console.log("Page refreshed");
    }
  }, [isFocused]);
  const getAllContacts = () => {
    dispatch(getLeads()).then((response) => {
      const contactsData = response.payload.data;
      setData(Object.values(contactsData));
      setLoading(false);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
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
            Leads
          </Text>
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
        <FlatList
          data={data}
          ListFooterComponent={<View style={{ height: 50 }}></View>}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: Colors.cream,
                width: "100%",
                height: "100%",
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: Colors.gray,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#bdbdbd",
                }}
              >
                <Text
                  style={{
                    color: "#8d8a8a",
                    fontSize: 14,
                  }}
                >
                  Type
                </Text>
                <Text
                  style={{
                    color: Colors.black,

                    color: Colors.PrimaryColor,
                  }}
                >
                  {item.type === "Email" ? (
                    <Image
                      source={require("../../../assets/mail.png")}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: "contain",
                      }}
                    />
                  ) : item.type === "message" ? (
                    <Image
                      source={require("../../../assets/mail.png")}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: "contain",
                      }}
                    />
                  ) : null}
                </Text>
              </View>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: Colors.gray,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#bdbdbd",
                }}
              >
                <Text
                  style={{
                    color: "#8d8a8a",
                    fontSize: 14,
                  }}
                >
                  Message
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 14,
                    textAlign: "right",
                  }}
                >
                  {item.content}
                </Text>
              </View>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: Colors.gray,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#bdbdbd",
                }}
              >
                <Text
                  style={{
                    color: "#8d8a8a",
                    fontSize: 14,
                  }}
                >
                  Property Key
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 14,
                  }}
                >
                  {item.property_key}
                </Text>
              </View>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "center",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: Colors.gray,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: "#bdbdbd",
                }}
              >
                <Text
                  style={{
                    color: "#8d8a8a",
                    fontSize: 14,
                  }}
                >
                  Date Created
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 14,
                  }}
                >
                  {item.created_date}
                </Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leads;
