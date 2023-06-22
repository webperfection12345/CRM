import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Colors from "../../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import { transectioActivity } from "../../modules/transectionActivity";
import { ScrollView } from "react-native-gesture-handler";

const Transactions = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [pastData, setPastData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  const [filteredPastData, setFilteredPastData] = useState([]);
  const [filteredUpcomingData, setFilteredUpcomingData] = useState([]);
  const [filteredCompletedData, setFilteredCompletedData] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllContacts();
  }, []);

  const searchFilter = (text) => {
    setSearchText(text);
    const filteredPastItems = pastData.filter((item) =>
      item.contact_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPastData(filteredPastItems);

    const filteredUpcomingItems = upcomingData.filter((item) =>
      item.contact_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUpcomingData(filteredUpcomingItems);

    const filteredCompletedItems = completedData.filter((item) =>
      item.contact_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCompletedData(filteredCompletedItems);

    setIsSearching(true);
  };
  const getAllContacts = () => {
    dispatch(transectioActivity()).then((response) => {
      const transictionData = response.payload.data[0];
      setPastData(transictionData.Past_today_activity);
      setUpcomingData(transictionData.Upcoming_activity);
      setCompletedData(transictionData.Completed_activity);
    });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#576ebd",
            width: "100%",
            height: "6%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              margin: 15,
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
              />
              <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
            </TouchableOpacity>
            <Text
              style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
            >
              Transactions
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewActivies")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              {/* <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: "contain",
                  tintColor: Colors.white,
                }}
                source={require("../../../assets/plus.png")}
              ></Image> */}
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
                style={{
                  marginLeft: 10,
                  height: 20,
                  width: 20,
                  resizeMode: "contain",
                  tintColor: Colors.white,
                }}
                source={require("../../../assets/search.png")}
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
                  marginHorizontal: 10,
                  height: "100%",
                  width: "100%",
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: Colors.white }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
              color: "black",
              marginTop: 10,
              marginLeft: 10,
              alignSelf: "center",
            }}
          >
            All Activities
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              marginLeft: 10,
              alignSelf: "center",
              fontWeight: "700",
            }}
          >
            Past Due & Today's Activities
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
              marginTop: 30,
            }}
          >
            <Text style={{ fontWeight: "700", marginHorizontal: 10 }}>
              Activity
            </Text>
            <Text style={{ fontWeight: "700" }}>Contact</Text>
            <Text style={{ fontWeight: "700" }}>Due Date & Time</Text>
          </View>
          <FlatList
            data={isSearching ? filteredPastData : pastData}
            ListFooterComponent={<View style={{ height: 50 }}></View>}
            renderItem={({ item }) => (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 8,
                    borderRadius: 10,
                    borderBottomWidth: 3,
                    borderBottomColor: Colors.gray,
                  }}
                  onPress={() => {
                    navigation.navigate("TransactionDetails");
                  }}
                >
                  <Image
                    style={{
                      marginLeft: 10,
                      height: 50,
                      width: 50,
                      resizeMode: "contain",
                      borderRadius: 30,
                      marginBottom: 5,
                    }}
                    source={{ uri: item.contact_image }}
                  />

                  <Text>{item.contact_name}</Text>
                  <Text>{item.activity_date}</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text>No data found</Text>
              </View>
            }
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              marginLeft: 10,
              alignSelf: "center",
              fontWeight: "900",
            }}
          >
            Upcoming
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
              marginTop: 30,
            }}
          >
            <Text style={{ fontWeight: "700", marginHorizontal: 10 }}>
              Activity
            </Text>
            <Text style={{ fontWeight: "700" }}>Contact</Text>
            <Text style={{ fontWeight: "700" }}>Due Date & Time</Text>
          </View>
          <FlatList
            data={isSearching ? filteredUpcomingData : upcomingData}
            // data={upcomingData}
            ListFooterComponent={<View style={{ height: 50 }}></View>}
            renderItem={({ item }) => (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 8,
                    borderRadius: 10,
                    borderBottomWidth: 3,
                    borderBottomColor: Colors.gray,
                  }}
                  onPress={() => {
                    navigation.navigate("TransactionDetails");
                  }}
                >
                  <Image
                    style={{
                      marginLeft: 10,
                      height: 50,
                      width: 50,
                      resizeMode: "contain",
                      borderRadius: 30,
                      marginBottom: 5,
                    }}
                    source={{ uri: item.contact_image }}
                  />

                  <Text>{item.contact_name}</Text>
                  <Text>{item.activity_date}</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text>No data found</Text>
              </View>
            }
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              marginLeft: 10,
              alignSelf: "center",
              fontWeight: "900",
            }}
          >
            Completed
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
              marginTop: 30,
            }}
          >
            <Text style={{ fontWeight: "700", marginHorizontal: 10 }}>
              Activity
            </Text>
            <Text style={{ fontWeight: "700" }}>Contact</Text>
            <Text style={{ fontWeight: "700" }}>Due Date & Time</Text>
          </View>
          <FlatList
            data={isSearching ? filteredCompletedData : completedData}
            ListFooterComponent={<View style={{ height: 50 }}></View>}
            renderItem={({ item }) => (
              <View style={{}}>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 8,
                    borderRadius: 10,
                    borderBottomWidth: 3,
                    borderBottomColor: Colors.gray,
                  }}
                  onPress={() => {
                    navigation.navigate("TransactionDetails");
                  }}
                >
                  <Image
                    style={{
                      marginLeft: 10,
                      height: 50,
                      width: 50,
                      resizeMode: "contain",
                      borderRadius: 30,
                      marginBottom: 5,
                    }}
                    source={{ uri: item.contact_image }}
                  />

                  <Text>{item.contact_name}</Text>
                  <Text>{item.activity_date}</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text>No data found</Text>
              </View>
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Transactions;
