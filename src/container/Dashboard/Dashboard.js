import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import RNSpeedometer from "react-native-speedometer";
import Activity from "../../components/Activity";
import { getContacts } from "../../modules/getContacts";
import { getMeterData } from "../../modules/getMeterValue";
import getLeads from "../../modules/getLeads";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const navigation = useNavigation();
  const [meterValue, setMeterValue] = useState();
  const [name, setName] = useState("");
  const [totalLeadValue, setTotalLeadValue] = useState("");
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [activity, setActivity] = useState(false);
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllContacts();
    getMeter();
    getLeadCount();
    if (isFocused) {
    }
  }, [isFocused]);
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const getMeter = () => {
    dispatch(getMeterData()).then((response) => {
      setMeterValue(response.payload.data);
    });
  };
  const getAllContacts = () => {
    dispatch(getContacts()).then((response) => {
      const contactsData = response.payload.data;
      setData(Object.values(contactsData));
      setLoading(false);
    });
  };

  // const getMeterImage = (value) => {
  //   switch (true) {
  //     case value >= 0 && value < 25:
  //       return require("../../../assets/menu.png");
  //     // case value >= 25 && value < 50:
  //     //   return require("../../../assets/menu.png");
  //     // case value >= 50 && value < 75:
  //     //   return require("path/to/thirdImage.png");
  //     // case value >= 75 && value <= 100:
  //     //   return require("path/to/fourthImage.png");
  //     // default:
  //     // return require("path/to/placeholderImage.png");
  //   }
  // };

  const meterImages = {
    0: require("../../assets/images/user.png"),
    25: require("../../../assets/level1.png"),
    50: require("../../../assets/level1.png"),
    75: require("../../../assets/level1.png"),
  };

  // Modify the getMeterImage function
  const getMeterImage = (value) => {
    let imageKey = 0;
    if (value >= 0 && value < 25) {
      imageKey = 0;
    } else if (value >= 25 && value < 50) {
      imageKey = 25;
    } else if (value >= 50 && value < 75) {
      imageKey = 50;
    } else if (value >= 75 && value <= 100) {
      imageKey = 75;
    }
    return meterImages[imageKey];
  };
  const getLeadCount = () => {
    dispatch(getLeads())
      .then(async (response) => {
        if (response && response.payload && response.payload.data) {
          const contactsData = response.payload.data;
          const leadsCount = contactsData.length;
          setTotalLeadValue(leadsCount);
          const name = await AsyncStorage.getItem("userDetails");
          const userDetails = JSON.parse(name);
          const displayName = `Welcome ${userDetails.display_name}!`;
          setName(displayName);
          setActivity(true);
        } else {
          console.error("Invalid response data:", response);
        }
      })
      .catch((error) => {
        console.error("Error retrieving leads:", error);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar />
      <Header label={name} />
      {activity ? (
        <ScrollView
          style={{
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              marginTop: 10,
              backgroundColor: Colors.white,
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.white,
              height: "100%",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Surf Level
            </Text>
            <TouchableOpacity onPress={openPopup}>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: Colors.white,
                  width: "100%",
                }}
              >
                <RNSpeedometer
                  value={meterValue}
                  size={180}
                  minValue={0}
                  maxValue={100}
                  allowedDecimals={0}
                  labels={[
                    {
                      name: "",
                      labelColor: "#ed2024",
                      activeBarColor: "#ec1a1e",
                    },
                    {
                      name: "",
                      labelColor: "#ee3323",
                      activeBarColor: "#ee3323",
                    },
                    {
                      name: "",
                      labelColor: "#f05622",
                      activeBarColor: "#f05622",
                    },
                    {
                      name: "",
                      labelColor: "#f36f21",
                      activeBarColor: "#f36f21",
                    },
                    {
                      name: "",
                      labelColor: "#f68620",
                      activeBarColor: "#f68620",
                    },
                    {
                      name: "",
                      labelColor: "#f99d1c",
                      activeBarColor: "#f99d1c",
                    },
                    {
                      name: "",
                      labelColor: "#fcb218",
                      activeBarColor: "#fcb218",
                    },
                    {
                      name: "",
                      labelColor: "#ffc907",
                      activeBarColor: "#ffc907",
                    },
                    {
                      name: "",
                      labelColor: "#fedf00",
                      activeBarColor: "#fedf00",
                    },
                    {
                      name: "",
                      labelColor: "#f7de00",
                      activeBarColor: "#f7de00",
                    },
                    {
                      name: "",
                      labelColor: "#e7dd1c",
                      activeBarColor: "#e7dd1c",
                    },
                    {
                      name: "",
                      labelColor: "#dadf26",
                      activeBarColor: "#dadf26",
                    },

                    {
                      name: "",
                      labelColor: "#c2d82f",
                      activeBarColor: "#c2d82f",
                    },
                    {
                      name: "",
                      labelColor: "#afd136",
                      activeBarColor: "#afd136",
                    },
                    {
                      name: "",
                      labelColor: "#9ccb3b",
                      activeBarColor: "#9ccb3b",
                    },
                    {
                      name: "",
                      labelColor: "#8bc63f",
                      activeBarColor: "#8bc63f",
                    },
                    {
                      name: "",
                      labelColor: "#7ac143",
                      activeBarColor: "#7ac143",
                    },
                    {
                      name: "",
                      labelColor: "#ffffff",
                      activeBarColor: "#5dba46",
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <Modal
              style={{}}
              animationType="fade"
              transparent={true}
              visible={showPopup}
              onRequestClose={closePopup}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                  <ScrollView
                    style={{
                      backgroundColor: Colors.cream,
                      height: "60%",
                    }}
                  >
                    <View
                      style={{
                        marginTop: 10,
                        width: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    ></View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          color: Colors.black,
                          fontWeight: "bold",
                          marginTop: 20,
                        }}
                      >
                        Your Surf Level
                      </Text>

                      <View
                        style={{
                          //marginTop: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <View>
                          <Image
                            style={{
                              height: 120,
                              width: 150,
                              resizeMode: "contain",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            source={require("../../../assets/level1.png")}
                          ></Image>
                        </View>
                        <Image
                          style={{
                            height: 150,
                            width: 200,
                            resizeMode: "contain",
                            alignSelf: "center",
                            marginTop: 20,
                          }}
                          source={require("../../../assets/grommet.png")}
                        ></Image>
                        <Text
                          style={{
                            fontSize: 30,
                            marginTop: 25,
                            color: Colors.black,
                            fontWeight: "bo400ld",
                            alignSelf: "center",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          Grommet
                        </Text>
                      </View>
                      <View style={styles.covermainpopup}>
                        <View style={styles.mainview}>
                          <Text style={styles.popupdes}>
                            You are only 5 points away from the
                          </Text>
                          <Text style={styles.popbigtext}>BIG CAHOUNA</Text>
                          <Text style={styles.popupdesdown}>
                            Here are 3 tips to get you the fast!
                          </Text>
                        </View>
                        <View style={styles.manimag}>
                          <Image
                            style={{
                              height: 250,
                              width: "100%",
                              resizeMode: "contain",
                              alignSelf: "flex-start",
                              marginTop: 50,
                              justifyContent: "flex-start",
                              marginRight: 12,
                              alignItems: "flex-start",
                              position: "absolute",
                              top: -80,
                            }}
                            source={require("../../../assets/rightman.png")}
                          ></Image>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                  {/* <Image
                    source={getMeterImage(meterValue)}
                    style={styles.meterImage}
                  /> */}

                  <TouchableOpacity
                    style={styles.popupButton}
                    onPress={closePopup}
                  >
                    <Text style={styles.popupButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={styles.maincoverop}>
              <View style={styles.boxcover}>
                <Text style={styles.smalltext}>Opportunites</Text>
                <Text style={styles.bigtext}>{totalLeadValue}</Text>
              </View>
              <View style={styles.boxcover}>
                <Text style={styles.smalltext}>Transactions</Text>
                <Text style={styles.bigtext}>$2.7MM</Text>
              </View>
              <View style={styles.boxcover}>
                <Text style={styles.smalltext}>Earnings</Text>
                <Text style={styles.bigtext}>$29.500</Text>
              </View>
              <View style={styles.boxcover}>
                <Text style={styles.smalltext}>Document</Text>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: "contain",
                    marginVertical: 6,
                    alignItems: "center",
                  }}
                  source={require("../../../assets/bluedocumnet.png")}
                ></Image>

                <Text style={styles.smalltext}>Portal</Text>
              </View>
              <View style={styles.boxcover}>
                <Text style={styles.smalltext}>Call</Text>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: "contain",
                    marginVertical: 6,
                    alignItems: "center",
                  }}
                  source={require("../../../assets/telephone-iconwhite.png")}
                ></Image>
                <Text style={styles.smalltext}>Center</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Activity />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  boxcover: {
    backgroundColor: Colors.darkblue,
    height: 130,
    width: 130,
    marginBottom: 30,
    borderRadius: 100,
    alignItems: "center",
    lineHeight: 130,
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  maincoverop: { marginTop: 50, marginBottom: 40 },
  smalltext: { color: Colors.white, fontWeight: 300, fontSize: 14 },
  bigtext: {
    fontSize: 28,
    color: Colors.white,
    lineHeight: 60,
    fontWeight: "bold",
  },
  popupContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center", //height:"100%"
    //height:"50%"
  },
  popupContent: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    width: "80%",
    // height:"100%"
    //maxHeight: "70%",
  },
  popupText: {
    fontSize: 16,
    marginBottom: 10,
  },
  popupButton: {
    backgroundColor: Colors.PrimaryColor,
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 12,
  },
  popupButtonText: {
    color: Colors.white,
    fontSize: 14,
  },
  manimag: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 200,
    width: "25%",
  },
  covermainpopup: {
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 22,
  },
  mainview: {
    textAlign: "center",
    width: "75%",
    lineHeight: 40,
    paddingRight: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  popbigtext: {
    textAlign: "center",
    fontSize: 15,
    paddingVertical: 5,
    fontWeight: "bold",
  },
  popupdes: { fontSize: 13, textAlign: "center" },
  popupdesdown: { fontSize: 13, textAlign: "center" },
});
