import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { getMyClientList } from "../../modules/getMyClientList";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../../components/Activity";

const MyClients = () => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [activity, setActivity] = useState(false);

  useEffect(() => {
    // setLoading(false);
    getMyClientListApiCall();
  }, []);

  const getMyClientListApiCall = () => {
    dispatch(getMyClientList()).then((response) => {
      console.log(response.payload);
      //const newData = [...data, ...response.payload];
      setData(response.payload);
      setActivity(true);
    });
  };

  const getUserInitials = (fullName) => {
    const sentence = fullName;
    const words = sentence.split(" ");
    const firstLetters = [];

    words.forEach((word) => {
      firstLetters.push(word.charAt(0));
    });

    console.log(firstLetters); // Output: ["h", "w", "i"]
    return firstLetters;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <Header label={"My Clients"} plusButton={true} />
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
            borderRadius: 10,
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
            onChangeText={(email) => setEmail(email)}
            style={{
              color: Colors.white,
              fontSize: 18,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          ></TextInput>
        </View>
      </View>

      {activity ? (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MyClientsDetails")}
                  style={{
                    height: 80,
                    width: "96%",
                    alignSelf: "flex-end",
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.gray,
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "20%" }}>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: Colors.gray,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.PrimaryColor,
                          fontSize: 12,
                        }}
                      >
                        {getUserInitials(item.firstname)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "75%",
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
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {item.firstname}
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 12,
                        }}
                      >
                        {item.email}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../../../assets/leftArrow.png")}
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: "contain",
                        }}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            //   keyExtractor={(item) => item.id}
            //  ItemSeparatorComponent={this.renderSeparator}
            //   key={(item) => item.id}
          />
        </View>
      ) : (
        <Activity />
      )}
    </SafeAreaView>
  );
};

export default MyClients;
