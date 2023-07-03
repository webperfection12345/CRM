import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  SafeAreaView,
  Modal,
  StyleSheet,
  PanResponder,
  Share,
  Switch,
} from "react-native";

import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getClientDetails } from "../../modules/getMyClientDetails";
import { activityHistory } from "../../modules/activityHistory";
import { getActivityData } from "../../modules/getActivityTask";
import { getNoteData } from "../../modules/getNoteData";
import { getDocument } from "../../modules/getDocument";
import { getDisposition } from "../../modules/getDisposition";
import { getTodayDipos } from "../../modules/getTodayDipos";
import { getCurrentDisposition } from "../../modules/currentDisposition";
import Activity from "../../components/Activity";

const MyClientsDetails = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState([]);
  const [task, setTask] = useState([]);
  const [leadType, setLeadType] = useState("");
  const [property, setProperty] = useState([]);
  const items = props.route.params;
  const isFocused = useIsFocused();
  const [showAll, setShowAll] = useState(false);
  const [todayDipo, setTodayDipo] = useState("");
  const [futureDipo, setFutureDipo] = useState([]);
  const [currentDipo, setCurrentDisposition] = useState([]);
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const [selectedTodayActivityType, setSelectedTodayActivityType] =
    useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [activity, setActivity] = useState(false);

  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setToggle(!isEnabled);
  };

  const [expandedActivityTypes, setExpandedActivityTypes] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const itemsToShow = showAllItems ? history.length : 5;
  const id = items.item.id;
  const [showAllNotes, setShowAllNotes] = useState(false);
  const notesToShow = showAllNotes ? note.length : 5;

  useEffect(() => {
    if (isFocused) {
      disPosition();
      MyClientsDetails();
      allActivityHistory();
      MyNoteData();
      TodayDisPosition();
    }
    // disPosition();
    // MyClientsDetails();
    // allActivityHistory();
    // MyNoteData();
    // currentDisposition();
    // TodayDisPosition();
  }, [isFocused]);

  const MyClientsDetails = () => {
    dispatch(getClientDetails(id))
      .then((response) => {
        const clientData = response.payload.data;
        console.log(clientData);
        setData(clientData);
        const propTitles = clientData.flatMap((item) =>
          item.property_viewed
            .map((property) => property.prop_title)
            .filter((title) => title)
        );
        setProperty(propTitles);
        const url = clientData.map((item) => item.linked_id);
        const updatedLeadTypes = clientData.map((item) => {
          const url = item.linked_lead;
          const paramName = getParamNameFromUrl(url, "wpestate_crm_lead");
          return "Lead";
        });

        setLeadType(updatedLeadTypes);
        setActivity(true);
      })
      .catch((error) => {
        console.log("Error fetching client details:", error);
      });
    const getParamNameFromUrl = (url, paramKey) => {
      const regex = new RegExp(`[?&](${paramKey}=([^&#]*)|&|#|$)`);
      const match = url.match(regex);
      if (match) {
        return match[1].split("=")[0];
      }
      return "";
    };
  };
  const disPosition = () => {
    dispatch(getDisposition(id)).then((response) => {
      const data = response.payload.data;
      setFutureDipo(data);
    });
  };

  const TodayDisPosition = () => {
    dispatch(getTodayDipos(id)).then((response) => {
      const data = response.payload.data;
      setTodayDipo(data);
    });
  };
  // const currentDisposition = () => {
  //   dispatch(getCurrentDisposition(id)).then((response) => {
  //     const data = response.payload.data;
  //     setCurrentDisposition(data);
  //   });
  // };
  const allActivityHistory = () => {
    dispatch(activityHistory()).then((response) => {
      const history = response.payload.data;
      setHistory(history);
    });
  };
  const handleShowMoreLess = () => {
    setShowAllNotes(!showAllNotes);
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: 60,
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          width: "100%",
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
            {item.activity_type}
          </Text>

          <Text
            style={{
              color: Colors.black,
              fontSize: 12,
            }}
          >
            {item.activity_date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const MyNoteData = () => {
    dispatch(getNoteData(id)).then((response) => {
      const noteData = response.payload.data;
      setNote(noteData);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical gestures (swipe down)
        return Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 0) {
          setModalVisible(false);
        }
      },
    })
  ).current;
  // const getUserInitials = (fullName) => {
  //   const [firstName, lastName] = fullName.split(" ");
  //   return `${firstName.charAt(0)} ${lastName.charAt(0)}`;
  // };
  const makePhoneCall = () => {
    let phoneNumber = items.item.contact_number;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const sendEmail = () => {
    let recipient = items.item.contact_email;
    let subject = "Subject of email";
    let body = "Body of email";
    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };
  const handleAPICall = () => {
    fetch("https://surf.topsearchrealty.com/webapi/v1/twilio/voice_call.php")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const sendSMS = () => {
    let phoneNumber = items.item.contact_number;
    let message = "Hello from my app!";
    Linking.openURL(`sms:${phoneNumber}`);
  };
  const handleShare = () => {
    Share.share({
      message: "Check out this cool article I found!",
      url: "https://example.com/article",
      title: "Cool Article",
    });
  };

  const _pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then((response) => {
      let source = { uri: response.path };
      setAvatarSource(source);
      seturiResponse(response.path);
      console.warn("mkm", avatarSource);
      console.warn("uri", uriResponse);
    });
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      {activity ? (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingVertical: 22,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: Colors.PrimaryColor,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 10,
                  }}
                  onPress={() => navigation.goBack()}
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
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: "bold",
                    color: Colors.white,
                    marginLeft: 60,
                  }}
                >
                  {item.contact_name}{" "}
                </Text>
                <View style={styles.threeiconmain}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                    onPress={handleAPICall}
                  >
                    <Image
                      style={{
                        height: 22,
                        width: 22,
                        resizeMode: "contain",
                        tintColor: Colors.white,
                      }}
                      source={require("../../../assets/whitecall.png")}
                    />
                  </TouchableOpacity>
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
                        height: 22,
                        width: 22,
                        resizeMode: "contain",
                        tintColor: Colors.white,
                      }}
                      source={require("../../../assets/messengerwhite.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("")}
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Image
                      style={{
                        height: 22,
                        width: 22,
                        resizeMode: "contain",
                        tintColor: Colors.white,
                      }}
                      source={require("../../../assets/paperwhite.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <ScrollView>
            <FlatList
              data={data}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, marginTop: 15 }}>
                  <ScrollView
                    style={{
                      flex: 1,
                      paddingHorizontal: 12,
                      backgroundColor: Colors.white,
                    }}
                  >
                    <View style={styles.maincover}>
                      <View style={styles.speedcover}>
                        <Image
                          style={{
                            height: 100,
                            width: 100,
                            resizeMode: "contain",
                          }}
                          source={require("../../../assets/speed3.png")}
                        />
                      </View>
                      <View style={styles.clientinformation}>
                        <View style={styles.imagewithdot}>
                          <Image
                            style={{
                              height: 100,
                              width: 100,
                              resizeMode: "cover",
                              borderRadius: 100,
                            }}
                            source={{ uri: item.contact_image }}
                          />
                          <Text style={styles.onlinedot}></Text>
                        </View>
                        <View style={styles.clientinformationinner}>
                          <Text style={styles.username}>
                            {" "}
                            {item.contact_name}{" "}
                          </Text>
                          <Text style={styles.phonenumber}>
                            {" "}
                            {item.contact_number}
                          </Text>
                          <Text style={styles.clientid}>
                            Client ID: {item.contact_lead_id}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <Text style={styles.switchermain}>
                          {" "}
                          <Switch
                            style={{ marginRight: 12 }}
                            trackColor={{ false: "#767577", true: "#576ebd" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                          />
                        </Text>
                      </View>
                    </View>
                    <View style={styles.informationicons}>
                      <View style={styles.maininfoicons}>
                        <TouchableOpacity
                          style={styles.iconcover}
                          onPress={() => makePhoneCall()}
                        >
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../assets/whitecall.png")}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.iconcover}
                          onPress={() => sendSMS()}
                        >
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../assets/messengerwhite.png")}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconcover}
                          onPress={() => sendEmail()}
                        >
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../assets/emailwhite.png")}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconcover}>
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../assets/videowhite.png")}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconcover}>
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../assets/pencilwhite.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.pendingdetail}>
                      <Text style={styles.phonenumber}>
                        <Text style={styles.boldphone}> Phone: </Text>
                        {item.contact_number}
                      </Text>
                    </View>
                    <View style={styles.pendingdetail}>
                      <Text style={styles.phonenumber}>
                        <Text style={styles.boldphone}> Email: </Text>
                        {item.contact_email}
                      </Text>
                    </View>
                    <View style={styles.pendingdetailaddress}>
                      <Text style={styles.boldphoneadd}>Main Address: </Text>
                      {item.property_address ? (
                        <Text style={styles.phonenumberadd}>
                          {item.property_address}
                        </Text>
                      ) : (
                        <Text style={styles.phonenumberadd}>
                          No address found
                        </Text>
                      )}
                    </View>

                    <View style={styles.mainareacover}>
                      <Text style={styles.boldphone}>Note</Text>
                      <View
                        style={{
                          width: "100%",
                          height: 150,
                          marginTop: 10,
                          alignSelf: "center",
                        }}
                      >
                        <TextInput
                          style={{
                            width: "100%",
                            borderRadius: 8,
                            height: "100%",
                            paddingHorizontal: 15,
                            paddingVertical: 15,
                            color: Colors.black,
                            borderColor: Colors.PrimaryColor,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            fontSize: 14,
                            padding: 2,
                            alignItems: "flex-start",
                            textAlignVertical: "top",
                          }}
                          autoCorrect={false}
                          returnKeyType="done"
                          multiline={true}
                          placeholder="Enter your note here...."
                          onChangeText={(text) => setNote(text)}
                        />
                      </View>
                    </View>
                    <View style={styles.transactionmain}>
                      <Text style={styles.transactionheading}>
                        Transactions
                      </Text>
                      <View style={styles.iconcover}>
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                            resizeMode: "contain",
                            tintColor: Colors.white,
                          }}
                          source={require("../../../assets/plus.png")}
                        />
                      </View>
                    </View>
                    <View style={styles.maincoverid}>
                      <View style={styles.mainheadingid}>
                        <Text style={styles.idheading}>ID</Text>
                        <Text style={styles.idinnerbold}>23456</Text>
                      </View>
                      <View style={styles.mainheadingid}>
                        <Text style={styles.idheading}>Property Address</Text>
                        <Text style={styles.idinnerbold}>
                          047 Jefferson Street City Kettlersville 047 Jeffe St.
                          City Kettlersville
                        </Text>
                      </View>
                    </View>
                    <View style={styles.maincoverid}>
                      <View style={styles.mainheadingid}>
                        <Text style={styles.idheading}>ID</Text>
                        <Text style={styles.idinnerbold}>23456</Text>
                      </View>
                      <View style={styles.mainheadingid}>
                        <Text style={styles.idheading}>Property Address</Text>
                        <Text style={styles.idinnerbold}>
                          047 Jefferson Street City Kettlersville 047 Jeffe St.
                          City Kettlersville
                        </Text>
                      </View>
                    </View>
                    <View style={styles.maincoverid}>
                      <View style={styles.mainheadingid}>
                        <Text style={styles.idheading}>ID</Text>
                        <Text style={styles.idinnerbold}>23456</Text>
                      </View>
                      <View style={styles.mainheadingid}>
                        <Text style={styles.idheading}>Property Address</Text>
                        <Text style={styles.idinnerbold}>
                          047 Jefferson Street City Kettlersville 047 Jeffe St.
                          City Kettlersville
                        </Text>
                      </View>
                    </View>
                    <View style={styles.transactionmaindis}>
                      <Text style={styles.transactionheading}>
                        Dispositions
                      </Text>
                    </View>
                    <View style={styles.dispos}>
                      <View style={styles.activitycol}>
                        <Image
                          style={{
                            height: 25,
                            width: 25,
                            resizeMode: "contain",
                            marginRight: 5,
                            tintColor: Colors.PrimaryColor,
                          }}
                          source={require("../../../assets/viewtel.png")}
                        />
                        <Text style={styles.activityheading}>
                          Last Activity
                        </Text>
                      </View>
                      <View style={styles.activitycolnew}>
                        <TouchableOpacity style={styles.iconcoverlatest}>
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.PrimaryColor,
                              marginRight: 5,
                            }}
                            source={require("../../../assets/messengerwhite.png")}
                          />
                        </TouchableOpacity>
                        <Text style={styles.activityheading}>
                          ChatGPT Handoff
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dispos}>
                      <View style={styles.activitycol}>
                        <Image
                          style={{
                            height: 25,
                            width: 25,
                            resizeMode: "contain",
                            marginRight: 5,
                            tintColor: Colors.PrimaryColor,
                          }}
                          source={require("../../../assets/viewtel.png")}
                        />
                        <Text style={styles.activityheading}>
                          Last Activity
                        </Text>
                      </View>
                      <View style={styles.activitycol}>
                        <TouchableOpacity style={styles.iconcoverlatest}>
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.PrimaryColor,
                              marginRight: 5,
                            }}
                            source={require("../../../assets/whitecall.png")}
                          />
                        </TouchableOpacity>
                        <Text style={styles.activityheading}>
                          ChatGPT Handoff
                        </Text>
                        <TouchableOpacity style={styles.iconcoverlatest}>
                          <Image
                            style={{
                              height: 12,
                              width: 12,
                              resizeMode: "contain",
                              tintColor: Colors.black,
                              marginLeft: 5,
                              marginTop: 5,
                            }}
                            source={require("../../../assets/downarrow.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.dispos}>
                      <View style={styles.activitycol}>
                        <Image
                          style={{
                            height: 25,
                            width: 25,
                            resizeMode: "contain",
                            marginRight: 5,
                            tintColor: Colors.PrimaryColor,
                          }}
                          source={require("../../../assets/viewtel.png")}
                        />
                        <Text style={styles.activityheading}>Next Up</Text>
                      </View>
                      <View style={styles.activitycol}>
                        <TouchableOpacity style={styles.iconcoverlatest}>
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.PrimaryColor,
                              marginRight: 5,
                            }}
                            source={require("../../../assets/emailwhite.png")}
                          />
                        </TouchableOpacity>
                        <Text style={styles.activityheading}>
                          Drip Campaign Initiated
                        </Text>
                        <TouchableOpacity style={styles.iconcoverlatest}>
                          <Image
                            style={{
                              height: 12,
                              width: 12,
                              resizeMode: "contain",
                              tintColor: Colors.black,
                              marginLeft: 5,
                              marginTop: 5,
                            }}
                            source={require("../../../assets/downarrow.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.maincoverop}>
                      <View style={styles.boxcover}>
                        <Text style={styles.bigtextone}>Documents</Text>
                      </View>
                      <View style={styles.boxcover}>
                        <Text style={styles.bigtextone}>Partner Contacts</Text>
                      </View>
                      <View style={styles.boxcover}>
                        <Text style={styles.bigtextone}>Transactions</Text>
                      </View>
                      <View style={styles.boxcover}>
                        <Text style={styles.bigtextone}>Activities Log</Text>
                      </View>
                      <View style={styles.boxcover}>
                        <Text style={styles.bigtextone}>
                          Start Transactions
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              )}
            />
          </ScrollView>
        </View>
      ) : (
        <Activity />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxcover: {
    backgroundColor: Colors.darkblue,
    height: 170,
    width: 170,
    marginBottom: 30,
    borderRadius: 100,
    alignItems: "center",
    lineHeight: 170,
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  bigtextone: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  switchermain: { marginTop: 30 },
  addrewd: { width: "100%", flexDirection: "column" },
  dispos: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  activityheading: { fontSize: 13 },
  activitycol: { flexDirection: "row", alignItems: "center", width: "43%" },
  activitycolnew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "53%",
  },
  transactionheading: { fontSize: 20, fontWeight: "bold" },
  transactionmain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  transactionmaindis: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 20,
  },
  phonenumber: { paddingVertical: 7, fontSize: 14 },
  phonenumberadd: {
    paddingVertical: 7,
    fontSize: 14,
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingTop: 2,
  },
  boldphone: { fontWeight: "bold", fontSize: 14 },

  pendingdetail: {
    flexDirection: "row",
    textAlign: "left",
    justifyContent: "flex-start",
    marginBottom: 4,
  },
  threeiconmain: {
    flexDirection: "row",
    alignItems: "center",
  },
  boldphoneadd: {
    fontWeight: "bold",
    fontSize: 14,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  maincoverop: { marginTop: 40, marginBottom: 40, alignItems: "center" },
  maincoverid: {
    borderBottomColor: Colors.cream,
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  idheading: { fontWeight: "bold", fontSize: 15, marginBottom: 7 },
  mainheadingid: { paddingVertical: 6, marginBottom: 12 },
  pendingdetailaddress: { flexDirection: "column", marginBottom: 4 },
  maincover: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  onlinedot: {
    height: 15,
    width: 15,
    backgroundColor: "#08d007",
    borderRadius: 100,
    left: -1,
    top: 10,
    position: "absolute",
  },
  imagewithdot: { position: "relative" },
  clientinformation: { flexDirection: "column", alignItems: "center" },
  speedcover: {
    width: "20%",
  },

  idinnerbold: { fontSize: 14, lineHeight: 22 },
  clientinformationinner: {
    paddingVertical: 12,
    textAlign: "center",
    alignItems: "center",
    paddingBottom: 7,
  },
  mainareacover: { marginHorizontal: 7 },
  iconcover: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: Colors.PrimaryColor,
    height: 48,
    width: 48,
    borderRadius: 100,
  },
  informationicons: { alignItems: "center", marginBottom: 25 },
  maininfoicons: { flexDirection: "row", alignItems: "center" },
  username: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  phonenumber: { marginBottom: 5, fontSize: 15 },
  clientid: { fontSize: 14, marginBottom: 5 },
  switcher: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], // Adjust the scale of the thumb to match the track size
    width: 60,
  },
  track: {
    height: 30, // Customize the height of the track
    width: 60, // Customize the width of the track
    borderRadius: 100, // Customize the border radius to achieve rounded corners
    backgroundColor: "#81b0ff", // Customize the color of the track
    justifyContent: "center",
  },
  texton: {
    position: "absolute",
    color: Colors.white,
    fontSize: 12,
    marginLeft: 7,
    marginTop: 5,
  },
});
export default MyClientsDetails;
