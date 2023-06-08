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

const Transactions = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = () => {
    dispatch(transectioActivity()).then((response) => {
      const transictionData = response.payload.data[0];
      setData(Object.values(transictionData), "sdsdfsd");
      if ((data = null)) {
        setLoading(true);
      } else {
        setLoading(false);
        console.log(data, "rrrrrrrrrrr");
      }
    });
  };

  return (
    <FlatList
      data={[]}
      ListFooterComponent={<View style={{ height: 50 }}></View>}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#576ebd",
              width: "100%",
              height: "30%",
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
                ></Image>
                <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
              </TouchableOpacity>
              <Text style={{ color: "white" }}>Transactions</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("NewActivies")}
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
            <Text
              style={{
                fontSize: 40,
                color: "white",
                margin: 10,
                marginVertical: 25,
                // fontStyle: "italic",
              }}
            >
              Transactions
            </Text>

            <View
              style={{
                backgroundColor: Colors.buttonColor,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: 10,
                // marginTop: 5,

                borderRadius: 10,

                width: "92%",
                height: 50,
              }}
            >
              <TouchableOpacity>
                <Image
                  style={{
                    marginLeft: 10,
                    height: 20,
                    width: 20,
                    resizeMode: "contain",
                    tintColor: Colors.white,
                  }}
                  source={require("../../../assets/search.png")}
                ></Image>
              </TouchableOpacity>
              <TextInput
                allowFontScaling={false}
                placeholder="Search"
                placeholderTextColor={Colors.white}
                onChangeText={(email) => email}
                style={{
                  // backgroundColor: "#dbdbdb",
                  color: Colors.white,
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: "bold",
                  marginHorizontal: 10,
                }}
              ></TextInput>
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
                // fontWeight: "800",
                marginLeft: 10,
                alignSelf: "center",
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
              <Text style={{ fontWeight: "600", marginHorizontal: 10 }}>
                Activity
              </Text>
              <Text style={{ fontWeight: "600" }}>Contact</Text>
              <Text style={{ fontWeight: "600" }}>Due Date & Time</Text>
            </View>
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
                    // tintColor: Colors.white,
                    borderRadius: 30,
                    marginBottom: 5,
                  }}
                  source={require("../../../assets/profilePic.png")}
                />

                <Text style={{}}> Rahul Sharma</Text>

                {/* <TextInput style={{}} placeholder="" onChangeText={(tr) => tr} /> */}
                <Text>26-11-2023</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                marginTop: 1,
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
                  // tintColor: Colors.white,
                  borderRadius: 30,
                  marginBottom: 5,
                  backgroundColor: Colors.gray,
                }}
                source={require("../../../assets/account.png")}
              />

              <Text style={{}}> Ajay Chauhan</Text>

              {/* <TextInput style={{}} placeholder="" onChangeText={(tr) => tr} /> */}
              <Text>12-07-2024</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 8,
                borderRadius: 10,
                borderBottomWidth: 3,
                borderBottomColor: Colors.gray,
                marginBottom: 130,
              }}
              onPress={() => {
                navigation.navigate("TransactionDetails");
              }}
            >
              <Image
                style={{
                  marginTop: -5,
                  marginLeft: 10,
                  height: 50,
                  width: 50,
                  resizeMode: "contain",
                  // tintColor: Colors.white,
                  borderRadius: 30,
                  marginBottom: 5,
                  backgroundColor: Colors.gray,
                }}
                source={require("./../../assets/images/usee.png")}
              />

              <Text style={{}}> sassy test</Text>

              {/* <TextInput style={{}} placeholder="" onChangeText={(tr) => tr} /> */}
              <Text>09-02-2024</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

export default Transactions;
