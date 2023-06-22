import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Linking,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getContacts } from "../../modules/getContacts";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../../components/Activity";

const Contact = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const searchFilter = (text) => {
    setSearchText(text);
    const filteredItems = data.filter((item) =>
      item.contact_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
    setIsSearching(true);
  };

  useEffect(() => {
    getAllContacts();
    if (isFocused) {
      // Perform the refresh logic here
    }
  }, [isFocused]);

  const getAllContacts = () => {
    dispatch(getContacts()).then((response) => {
      const contactsData = response.payload.data;
      setData(Object.values(contactsData));
      setLoading(false);
    });
  };

  const handleRefresh = () => {
    if (!loading) {
      setLoading(true);
      getAllContacts();
    }
  };
  const makePhoneCall = (item) => {
    let phoneNumber = item;
    Linking.openURL(`tel:${phoneNumber}`);
  };  
  const sendEmail = (item) => {
    let recipient = item;
    let subject = "Subject of email";
    let body = "Body of email";
    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  const sendSMS = (item) => {
    let phoneNumber = item;
    let message = "Hello from my app!";
    Linking.openURL(`sms:${phoneNumber}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View
          style={{
            height: 40,
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
            Contacts
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddContacts")}
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
              source={require("../../../assets/plus.png")}
            ></Image>
          </TouchableOpacity>
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
            ></Image>
            <TextInput
              allowFontScaling={false}
              placeholder="Search"
              placeholderTextColor={Colors.white}
              onChangeText={searchFilter}
              style={{
                color: Colors.white,
                fontSize: 15,
                marginLeft: 10,
              }}
            ></TextInput>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}></View>
        <View style={{ flex: 1, marginTop: 12 }}>
          {loading ? (
            <Activity />
          ) : (
            <FlatList
              data={isSearching ? filteredData : data}
              ListFooterComponent={<View style={{ height: 50 }}></View>}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MyClientsDetails", { item: item })
                  }
                  style={{
                    height: 80,
                    width: "97%",
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: "#bbbbbb52",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    backgroundColor: "#987e7e17",
                    marginBottom: 5,
                    padding: 12,
                    justifyContent: "space-between",
                    borderRadius: 6,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.contact_image }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 30,
                        resizeMode: "cover",
                      }}
                    ></Image>

                    <Text
                      style={{
                        color: Colors.PrimaryColor,
                        fontSize: 12,
                      }}
                    ></Text>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 14,
                        fontWeight: "bold",
                        Width: 200,
                        paddingHorizontal: 4,
                      }}
                    >
                      {item.contact_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 12,
                        }}
                      >
                        {item.post_title}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 80,
                        alignSelf: "flex-end",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "row",

                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => sendEmail(item.contact_email)}
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../../assets/mail.png")}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => sendSMS(item.contact_number)}
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../../assets/chat.png")}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => makePhoneCall(item.contact_number)}
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../../assets/phone.png")}
                          style={{
                            height: 40,
                            width: 40,
                            marginLeft: "5%",
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                        marginLeft: 10,
                      }}
                    >
                      <Image
                        source={require("../../../assets/leftArrow.png")}
                        style={{
                          height: 10,
                          width: 10,
                          resizeMode: "contain",
                        }}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Text>No data found</Text>
                </View>
              }
              onRefresh={handleRefresh}
              refreshing={loading}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contact;
