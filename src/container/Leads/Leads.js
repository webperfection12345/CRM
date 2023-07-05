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
import { getLeads } from "../../modules/getLeads";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Activity from "../../components/Activity";

const Leads = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [activity, setActivity] = useState(false);

  useEffect(() => {
    getAllContacts();
    if (isFocused) {
      // Perform the refresh logic here
    }
  }, [isFocused]);

  const getAllContacts = async () => {
    try {
      const response = await dispatch(getLeads());
      console.log(response, "response");
      if (response && response.payload && response.payload.data) {
        const contactsData = response.payload.data;
        setData(contactsData);
        setLoading(false);
        setActivity(true);
      } else {
        console.error("Invalid response data:", response);
        // Handle the error case here, such as displaying an error message or taking appropriate action
      }
    } catch (error) {
      console.error("Error retrieving leads:", error);
      // Handle the error case here, such as displaying an error message or taking appropriate action
    }
  };

  const searchFilter = (text) => {
    setSearchText(text);
    console.log(data);
    const filteredItems = data.filter((item) =>
      item.property_key.includes(text)
    );
    setFilteredData(filteredItems);
    setIsSearching(true);
  };
  const handleUsernameClick = (item) => {
    navigation.navigate("MyClientsDetails", { item: item });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
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
          onPress={() => navigation.navigate("Home")}
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
          {/* <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text> */}
        </TouchableOpacity>
        <Text style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}>
          Opportunities
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
            onChangeText={searchFilter}
            style={{
              color: Colors.white,
              fontSize: 15,
              marginLeft: 10,
            }}
          ></TextInput>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {activity ? (
          <FlatList
            data={isSearching ? filteredData : data}
            ListFooterComponent={<View style={{ height: 50 }}></View>}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: Colors.cream,
                  width: "100%",

                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                }}
              >
                {/* Render the content for each item */}
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    height: 50,
                  }}
                >
                  {/* Render the Type */}
                  <Text
                    style={{
                      color: "#8d8a8a",
                      fontSize: 14,
                      height: 50,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                      marginTop: 25,
                    }}
                  >
                    Type
                  </Text>
                  {/* Render the icon based on the item type */}

                  {item.type === "Email" ? (
                    <Image
                      source={require("../../../assets/mail.png")}
                      style={{
                        height: 35,
                        width: 35,
                        alignSelf: "center",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "row",
                        resizeMode: "contain",
                      }}
                    />
                  ) : item.type === "Message" ? (
                    <Image
                      source={require("../../../assets/chat.png")}
                      style={{
                        height: 35,
                        width: 35,
                        alignSelf: "center",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "row",
                        resizeMode: "contain",
                        marginTop: 12,
                      }}
                    />
                  ) : null}
                </View>
                {/* Render the Message */}
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={{ color: "#8d8a8a", fontSize: 14 }}>
                    Username
                  </Text>
                  <TouchableOpacity onPress={() => handleUsernameClick(item)}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 14,
                        textAlign: "right",
                      }}
                    >
                      {item.username}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "#8d8a8a", fontSize: 14 }}>Mobile</Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 14,
                      textAlign: "right",
                      width: "60%",
                    }}
                  >
                    {item.Phone}
                  </Text>
                </View>

                {/* Render the Property Key */}
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "#8d8a8a", fontSize: 14 }}>
                    Property Key
                  </Text>
                  <Text style={{ color: Colors.black, fontSize: 14 }}>
                    {item.property_key}
                  </Text>
                </View>
                {/* Render the Date Created */}
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "#8d8a8a", fontSize: 14 }}>
                    Date Created
                  </Text>

                  <Text style={{ color: Colors.black, fontSize: 14 }}>
                    {new Date(item.created_date).toLocaleDateString("en-US")}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text>No data found</Text>
              </View>
            }
          />
        ) : (
          <Activity />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Leads;
