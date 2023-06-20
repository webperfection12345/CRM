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
import "react-native-gesture-handler";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { getPropertiesDetails } from "../../modules/getPropertiesDetails";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../../components/Activity";
const PropertiesDetails = (props) => {
  const navigation = useNavigation();
  const id = props.route.params.id;
  const dispatch = useDispatch();
  const [activity, setActivity] = useState(false);
  useEffect(() => {
    getPropertiesDetailsApiCall();
  }, []);
  console.log("details", id);
  const [data, setdata] = useState([]);
  const getPropertiesDetailsApiCall = () => {
    dispatch(getPropertiesDetails(id)).then((response) => {
      console.log("data hai ki nhi", response);
      setdata(response.payload);
      setActivity(true);
    });
  };
  const makePhoneCall = () => {
    let phoneNumber = data.listagentpreferredphone;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const sendEmail = () => {
    let recipient = data.listagentemail;
    let subject = "Subject of email";
    let body = "Body of email";
    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  const sendSMS = () => {
    let phoneNumber = data.listagentpreferredphone;
    let message = "Hello from my app!";
    Linking.openURL(`sms:${phoneNumber}`);
  };
  console.log(data);
  const goToMap = () => {
    const latitude = data.property_latitude;
    const longitude = data.property_longitude;

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.canOpenURL(mapUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(mapUrl);
        } else {
          console.log("Map URL scheme is not supported");
        }
      })
      .catch((error) => {
        console.log("Error opening map URL:", error);
      });
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
                source={require("../../../assets/back.png")}
              ></Image>
              <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15, color: Colors.white }}>
              {data.property_address}
            </Text>
            <TouchableOpacity></TouchableOpacity>
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
              {/* <View style={{ marginTop: 20 }}>
                <Image
                  source={{ uri: data.featured_image_src }}
                  style={{ height: 120, width: 120, borderRadius: 60 }}
                ></Image>
              </View> */}
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
                  $ {data.originallistprice}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => goToMap()}
              style={{
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              {/* <MapView
                provider={PROVIDER_GOOGLE}
                style={{
                  height: 250,
                  width: "100%",
                }}
                region={{
                  latitude: parseFloat(data.property_latitude),
                  longitude: parseFloat(data.property_longitude),
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(data.property_latitude),
                    longitude: parseFloat(data.property_longitude),
                  }}
                />
              </MapView> */}
            </TouchableOpacity>
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
                Size (sq/FT)
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {data.property_size}
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
                Bedrooms
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {data.property_bedrooms}
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
                Bathrooms
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {data.bathroomsfull}
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
                Last Price Change
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {data.modified}
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
                Previous Price
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                $ {data.originallistprice}
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
                $ {data.originallistprice}
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
              <Text style={{ fontSize: 16, color: Colors.black }}>Status</Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {data.status}
              </Text>
            </View>
            <View
              style={{
                width: "95%",
                height: 60,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: Colors.black }}>
                Days On Market
              </Text>
              <Text style={{ fontSize: 16, color: Colors.black }}>
                {data.yearbuilt}
              </Text>
            </View>

            <View style={{ width: "95%", height: 80, alignSelf: "center" }}>
              <Text
                style={{ fontSize: 15, color: Colors.black, marginTop: 15 }}
              >
                Listing Agent
              </Text>
              <Text style={{ fontSize: 18, color: Colors.black, marginTop: 5 }}>
                {data.listagentfullname}
              </Text>
            </View>
            <View
              style={{
                height: 80,
                width: "96%",
                alignSelf: "flex-end",

                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "70%",
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
                    }}
                  >
                    Phone
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {data.listagentpreferredphone}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => sendSMS()}
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
                onPress={() => makePhoneCall()}
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
                width: "96%",
                alignSelf: "flex-end",

                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "80%",
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
                    }}
                  >
                    Email
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {data.listagentemail}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => sendEmail()}
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
            </View>

            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      ) : (
        <Activity />
      )}
    </SafeAreaView>
  );
};

export default PropertiesDetails;
