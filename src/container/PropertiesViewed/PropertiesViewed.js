import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { getProperties } from "../../modules/getProperties";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../../components/Activity";
const PropertiesViewed = (props) => {
  const navigation = useNavigation();
  //const id = props.route.params.id;
  const dispatch = useDispatch();
  const [activity, setActivity] = useState(true);
  useEffect(() => {
    //getPropertiesViewedApiCall();
  }, []);
  //console.log('details', id);
  const [data, setdata] = useState([]);
  const getPropertiesViewedApiCall = () => {
    dispatch(getProperties(id)).then((response) => {
      console.log("data hai ki nhi", response);
      setdata(response.payload);
      setActivity(true);
    });
  };
  const makePhoneCall = () => {
    let phoneNumber = "512458790";
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const sendEmail = () => {
    let recipient = "example@example.com";
    let subject = "Subject of email";
    let body = "Body of email";
    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  const sendSMS = () => {
    let phoneNumber = "512458790";
    let message = "Hello from my app!";
    Linking.openURL(`sms:${phoneNumber}`);
  };
  const goToMap = () => {
    let latitude = data.property_latitude;
    let longitude = data.property_longitude;
    let label = "San Francisco";
    Linking.openURL(`geo:${latitude},${longitude}?q=${label}`);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      {activity ? (
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
                source={Images.back}
              ></Image>
              <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15, color: Colors.white }}>
              5686 Enclave Drive | Mangonia Park
            </Text>
            <View
              // onPress={() => navigation.navigate('DeletePropertiy')}
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
              ></Image>
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <View style={{ marginTop: 20 }}>
                <Image
                  //source={{uri: data.featured_image_src}}
                  source={Images[1]}
                  style={{ height: 120, width: 120, borderRadius: 60 }}
                ></Image>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {data.title}
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
                    marginTop: 10,
                  }}
                >
                  $ 4,499,000
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "95%",
                height: 60,
                borderBottomWidth: 1,
                borderColor: Colors.gray,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.black }}>
                Favorited on
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                2023-01-20 8:03:34
              </Text>
            </View>
            <View
              style={{
                width: "95%",
                height: 60,
                borderBottomWidth: 1,
                borderColor: Colors.gray,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.black }}>
                Days on Market
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>319</Text>
            </View>
            <View
              style={{
                width: "95%",
                height: 60,
                borderBottomWidth: 1,
                borderColor: Colors.gray,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.black }}>
                Current Price
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                $ 4,499,000
              </Text>
            </View>
            <View
              style={{
                width: "95%",
                height: 60,
                borderBottomWidth: 1,
                borderColor: Colors.gray,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.black }}>
                Original Price
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                $ 4,599,000
              </Text>
            </View>
            <View
              style={{
                width: "95%",
                height: 60,
                borderBottomWidth: 1,
                borderColor: Colors.gray,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.black }}>
                Link to property
              </Text>
              <Text
                onPress={() =>
                  Linking.openURL("https://surf.topsearchrealty.com/")
                }
                style={{ fontSize: 16, color: Colors.PrimaryColor }}
              >
                https://surf.topsearchrealty.com/
              </Text>
            </View>

            <TouchableOpacity
              //onPress={() => navigation.navigate('PropertiesViewedByLeads')}
              style={{
                height: 35,
                width: "90%",
                borderRadius: 5,
                marginTop: 20,
                backgroundColor: Colors.PrimaryColor,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: Colors.white,
                }}
              >
                Transaction Contacts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              //onPress={() => navigation.navigate('PropertiesViewedByLeads')}
              style={{
                height: 35,
                width: "90%",
                borderRadius: 5,
                marginTop: 20,
                backgroundColor: Colors.PrimaryColor,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: Colors.white,
                }}
              >
                Prepare Contracts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              //onPress={() => navigation.navigate('PropertiesViewedByLeads')}
              style={{
                height: 35,
                width: "90%",
                borderRadius: 5,
                marginTop: 20,
                backgroundColor: Colors.PrimaryColor,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: Colors.white,
                }}
              >
                Transaction Coordinator
              </Text>
            </TouchableOpacity>

            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      ) : (
        <Activity />
      )}
    </SafeAreaView>
  );
};

export default PropertiesViewed;
