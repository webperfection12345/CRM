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

const SingleClientDetail = (props) => {
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

  const [expandedActivityTypes, setExpandedActivityTypes] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const itemsToShow = showAllItems ? history.length : 5;
  const id = items.item.id;
  const [showAllNotes, setShowAllNotes] = useState(false);
  const notesToShow = showAllNotes ? note.length : 5;

  useEffect(() => {
    if (isFocused) {
      console.log("Page refreshed");
    }
    disPosition();
    MyClientsDetails();
    allActivityHistory();
    MyNoteData();
    currentDisposition();
    TodayDisPosition();
  }, [isFocused]);

  const MyClientsDetails = () => {
    dispatch(getClientDetails(id))
      .then((response) => {
        const clientData = response.payload.data;
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
      console.log(data);
    });
  };

  const TodayDisPosition = () => {
    dispatch(getTodayDipos(id)).then((response) => {
      const data = response.payload.data;
      setTodayDipo(data);
      console.log(data, "dfsdf");
    });
  };
  const currentDisposition = () => {
    dispatch(getCurrentDisposition(id)).then((response) => {
      const data = response.payload.data;
      setCurrentDisposition(data);
    });
  };
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
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
         <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: Colors.PrimaryColor,
                    paddingVertical:22
                  }}
                >
                  <TouchableOpacity 
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
                    <Text style={{ fontSize: 15, color: Colors.white }}>
                     
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: "bold",
                      color: Colors.white,
                    }}
                  >
                    My Clients Details 
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditClientsDetails", { item })}
                   
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Image
                      source={require("../../../assets/edit.png")}
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: "contain",
                        tintColor: Colors.white,
                      }}
                    ></Image>
                  </TouchableOpacity>
                </View>



           <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  borderRadius: 5,
                  marginTop: 0,
                  borderColor: Colors.gray,
                }}
              >
               
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    padding: 10,
                    marginTop: 20,
                  }}
                >
                  <Image
                    source={{ uri: item.contact_image }}
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 60,
                      borderWidth: 2,
                      borderColor: "#ddd",
                    }}
                  ></Image>
                  <View style={{ width: "60%", justifyContent: "center" }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 19,

                        fontWeight: "bold",
                        marginLeft: 20,
                      }}
                    >
                      {item.contact_name}{" "}
                    </Text>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 16,
                        marginTop: 5,
                        marginLeft: 20,
                      }}
                    >
                      {item.contact_name}{" "}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 60,
                    width: "60%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => makePhoneCall()}
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/phone.png")}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => sendEmail()}
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/mail.png")}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => sendSMS()}
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/chat.png")}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleShare()}
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 40,
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                  //  borderBottomWidth: 1,
                   // borderColor: Colors.gray,
                    marginTop: 6,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#8d8a8a",
                      fontSize: 14,
                    }}
                  >
                    Phone
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                    }}
                  >
                    {item.contact_number}
                  </Text>
                </View>
                <View
                  style={{
                    height: 30,
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                   // borderBottomWidth: 1,
                   // borderColor: Colors.gray,
                    marginTop: 6,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#8d8a8a",
                      fontSize: 14,
                    }}
                  >
                    Email
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      color: Colors.PrimaryColor,
                    }}
                  >
                    {item.contact_email}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    height: 30,
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                   // borderBottomWidth: 1,
                   // borderColor: Colors.gray,
                    marginTop: 6,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#8d8a8a",
                      fontSize: 14,
                    }}
                  >
                    Propertity Address
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                    }}
                  >
                    {item.property_address}{" "}
                  </Text>
                </View>

                <View
                  style={{
                    height: 30,
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    marginTop: 6,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#8d8a8a",
                      fontSize: 14,
                    }}
                  >
                    Client Type
                  </Text>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 16,
                      color: Colors.PrimaryColor,
                    }}
                  >
                    {leadType}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    height: 60,
                    marginTop: 20,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("DisPosition", { item })}
                    style={{
                      height: 42,
                      width: "30%",
                      borderRadius: 5,
                      borderColor: Colors.gray,
                      borderWidth: 0.5,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 6,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: Colors.black }}>
                      🗓️ TASK
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("NewNote", { item })}
                    style={{
                      height: 42,
                      width: "30%",
                      borderRadius: 5,
                      borderColor: Colors.gray,
                      borderWidth: 0.5,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 14, color: Colors.black }}>
                      📝 NOTE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View
            style={{
              width: "95%",
              alignSelf: "center",
              borderRadius: 5,
              marginTop: 2,
            }}
          >
            <View>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 20,

                 
                }}
              >
                Today's Activities 
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                alignSelf: "flex-start",
                alignItems: "flex-start",
                alignContent: "flex-start",
                flexDirection: "column",
                marginTop: 3,

                justifyContent: "space-between",
              }}
            >
              <View
                style={{

                  width: "100%",
                  alignSelf: "flex-start",
                  alignItems: "flex-start",
                  alignContent: "flex-start",
                  flexDirection: "column",
                  marginTop: 20,
                

                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    paddingRight: 20,
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    flexDirection: "row",
                  }}
                ></View>
                {typeof todayDipo === "string" ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      alignItems: "flex-start",
                      alignContent: "flex-start",
                      flexDirection: "column",
                      marginTop: 20,
                      
                    }}
                  >
                    {todayDipo}
                  </Text>
                ) : (
                  <FlatList
                    style={{
                      width: "100%",
                    }}
                    data={todayDipo}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <React.Fragment>
                        <TouchableOpacity
                          onPress={() => {
                            if (
                              selectedTodayActivityType ===
                              item.activity_disposition
                            ) {
                              setSelectedTodayActivityType(null);
                            } else {
                              setSelectedTodayActivityType(
                                item.activity_disposition
                              );
                            }
                          }}
                          style={{
                            flexDirection: "row",
                            width: "100%",
                          }}
                        >
                          <Text style={styles.subheadingmaintype}>
                            {item.activity_disposition}
                          </Text>
                         
                        </TouchableOpacity>
                        {selectedTodayActivityType ===
                          item.activity_disposition && (
                          <View
                            style={{
                              width: "100%",
                            }}
                          >
                            <View
                              style={{

                                borderColor: Colors.gray,
                                borderWidth: 1,
                                padding: 12,
                                width: "100%",
                                borderRadius:4,
                              
                                marginBottom: 20,backgroundColor:Colors.cream
                              }}
                            >
                              <View
                                style={{
                                  alignItems: "center",
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 20,
                                }}
                              >
                                <Text style={styles.headingmaintype}>
                                  Activity Disposition
                                </Text>
                                <Text style={styles.subheadingmaintypeinner}>
                                  {item.activity_disposition}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: "center",
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 20,
                                }}
                              >
                                <Text style={styles.headingmaintype}>
                                  Activity Type 
                                </Text>
                                <Text style={styles.subheadingmaintypeinner}>
                                  {item.activity_type}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: "center",
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 20,
                                }}
                              >
                                <Text style={styles.headingmaintype}>
                                  Activity Notes
                                </Text>
                                <Text style={styles.subheadingmaintypeinner}>
                                  {item.activity_notes}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: "center",
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 20,
                                }}
                              >
                                <Text style={styles.headingmaintype}>
                                  Next Disposition Date
                                </Text>
                                <Text style={styles.subheadingmaintypeinnerdate}>
                                  {item.next_disposition_date}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: "center",
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 20,
                                }}
                              >
                                <Text style={styles.headingmaintype}>
                                  Activity Next Disposition
                                </Text>
                                <Text style={styles.subheadingmaintypeinner}>
                                  {item.activity_next_disposition}
                                </Text>
                              </View>
                              <View
                                style={{
                                  alignItems: "center",
                                  width: "100%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginBottom: 20,
                                }}
                              >
                                <Text style={styles.headingmaintype}>
                                  Next Disposition Notes
                                </Text>
                                <Text style={styles.subheadingmaintypeinner}>
                                  {item.next_disposition_notes}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </React.Fragment>
                    )}
                  />
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              alignSelf: "center",
              borderRadius: 5,
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 5,

                  marginLeft: 10,
                }}
              >
                Activity Log
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignSelf: "flex-start",
                alignItems: "flex-start",
                alignContent: "flex-start",
                flexDirection: "column",
                marginTop: 3,
                paddingHorizontal: 8,
                justifyContent: "space-between",
                flexWrap: "wrap",
               
              }}
            >
              <ScrollView
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    flexDirection: "column",
                    marginTop: 20,

                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {typeof futureDipo === "string" ? (
                    <Text
                      style={{
                        alignSelf: "center",
                        alignItems: "flex-start",
                        alignContent: "flex-start",
                        flexDirection: "column",
                        marginTop: 20, 
                      }}
                    >
                      {futureDipo}
                    </Text>
                  ) : (
                    <FlatList
                      style={{
                        width: "100%",
                       
                      }}
                      data={futureDipo}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <React.Fragment>
                          <TouchableOpacity
                            onPress={() => {
                              if (
                                selectedActivityType ===
                                item.activity_disposition
                              ) {
                                setSelectedActivityType(null);
                              } else {
                                setSelectedActivityType(
                                  item.activity_disposition
                                );
                              }
                            }}
                            style={{
                              flexDirection: "row",
                              
                            }}
                          >
                            <Text style={styles.subheadingmaintype}>
                              {item.activity_disposition}
                            </Text>
                           
                          </TouchableOpacity>
                          {selectedActivityType ===
                            item.activity_disposition && (
                            <View
                              style={{
                                width: "100%",
                              }}
                            >
                              <View
                                style={{
                                  paddingRight: 20,
                                  borderColor: Colors.gray,
                                  borderWidth: 1,
                                  padding: 12,
                                  width: "100%",
                                  marginBottom: 20,
                                  borderRadius: 4,backgroundColor:Colors.cream
                                }}
                              >
                                <View
                                  style={{
                                    alignItems: "center",
                                   
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20,

                                  }}
                                >
                                  <Text style={styles.headingmaintype}>
                                    Activity Disposition
                                  </Text>
                                  <Text style={styles.subheadingmaintypeinner}>
                                    {item.activity_disposition}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    alignItems: "center",
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20,
                                  }}
                                >
                                  <Text style={styles.headingmaintype}>
                                    Activity Type
                                  </Text>
                                  <Text style={styles.subheadingmaintypeinner}>
                                    {item.activity_type}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    alignItems: "center",
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20,
                                  }}
                                >
                                  <Text style={styles.headingmaintype}>
                                    Activity Notes
                                  </Text>
                                  <Text style={styles.subheadingmaintypeinner}>
                                    {item.activity_notes}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    alignItems: "center",
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20,
                                  }}
                                >
                                  <Text style={styles.headingmaintype}>
                                    Next Disposition Date
                                  </Text>
                                  <Text style={styles.subheadingmaintypeinnerdate}>
                                    {formatDate(item.next_disposition_date)}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    alignItems: "center",
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20,
                                  }}
                                >
                                  <Text style={styles.headingmaintype}>
                                    Activity Next Disposition
                                  </Text>
                                  <Text style={styles.subheadingmaintypeinner}>
                                    {item.activity_next_disposition}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    alignItems: "center",
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20,
                                  }}
                                >
                                  <Text style={styles.headingmaintype}>
                                    Next Disposition Notes
                                  </Text>
                                  <Text style={styles.subheadingmaintypeinner}>
                                    {item.next_disposition_notes}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("EditActivity", {
                                      item,
                                    })
                                  }
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: 10,
                                    borderRadius:100,
                                   
                                    alignItems:"center",
                                    justifyContent:"center"
                                  }}
                                >
                                  <View style={{
                                      height: 40,
                                      width: 40,
                                      backgroundColor:Colors.white,
                                      alignItems:"center",
                                      justifyContent:"center",
                                      borderRadius:100
                                    }}>
                                  <Image
                                    source={require("../../../assets/edit.png")}
                                    style={{
                                      height: 15,
                                      width: 15,
                                      resizeMode: "contain",
                                      tintColor: Colors.PrimaryColor,
                                    }}
                                  ></Image>
                               
                                  </View>
                                  <Text style={styles.editactivity}>Edit Activity</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )}
                        </React.Fragment>
                      )}
                    />
                  )}
                </View>
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              width: "95%",
              alignSelf: "center",
              borderRadius: 5,
              marginTop: 20,
              borderColor: Colors.gray,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 25,
               marginBottom:15,
                  width:"100%",
                  textAlign:"center"
                 
                }}
              >
                Properties Viewed
              </Text>
            </View>
            {property.length === 0 ? (
              <Text style={styles.nodata}>No data found</Text>
            ) : (
              <View style={styles.propertydata}>
                {property.map((title, index) => (
                  <View key={index}>
                    <Text style={styles.mainpropertydata}>
                      {"\u2022"} {title}
                    </Text>
                  </View>
                ))}
              </View>
            )}
<View
              style={{
                flexDirection: "row",
                width: "90%",
                height: 60,
                marginTop: 20,
                alignSelf: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Properties")}
                style={{
                  height: 35,
                  width: "45%",
                  borderRadius: 5,
                  backgroundColor: Colors.PrimaryColor,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,

                    color: Colors.white,
                  }}
                >
                  See all Properties 
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: "95%",
              alignSelf: "center",
              borderRadius: 5,
              marginTop: 20,
              borderColor: Colors.gray,
            }}
          ></View>
          <View
            style={{
              borderWidth: 1,
              width: "95%",
              alignSelf: "center",
              borderRadius: 5,
              marginTop: 20,
              borderColor: Colors.gray,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                width: "90%",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Notes
              </Text>
             
            </View>
            <View style={{ backgroundColor: Colors.white, marginTop: 20 }}>
              {note && note.length > 0 ? (
                <>
                  <FlatList
                    data={note.slice(0, notesToShow)}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
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
                              {item.note_content}
                            </Text>

                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 12,
                              }}
                            >
                              {item.created_date}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />

                  {note.length > 5 && (
                    <TouchableOpacity
                      onPress={() => setShowAllNotes(!showAllNotes)}
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
                      <Text
                        style={{
                          color: Colors.PrimaryColor,
                          fontSize: 14,
                          textAlign:"center",
                          width:"100%",
                          fontWeight: "bold",
                        }}
                      >
                        {showAllNotes ? "Show Less" : "Show More"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Text style={styles.nodata}>No Notes found.</Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                width: "90%",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                History
              </Text>
            </View>
            <View style={{ backgroundColor: Colors.white, marginTop: 20 }}>
              {history && history.length > 0 ? (
                <>
                  <FlatList
                    data={history.slice(0, itemsToShow)}
                    scrollEnabled={false}
                    renderItem={renderHistoryItem}
                  />
                  {history.length > 5 && (
                    <TouchableOpacity
                      onPress={() => setShowAllItems(!showAllItems)}
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
                      <Text
                        style={{
                          color: Colors.PrimaryColor,
                          fontSize: 14,
                          fontWeight: "bold",
                          alignSelf: "center",
                          marginTop: 20,

                        }}
                      >
                        {showAllItems ? "Show Less" : "Show More"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Text style={styles.nodata}>No activity history found.</Text>
              )}
            </View>
           
          </View>

          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <View
              style={{
                height: "75%",
                width: "100%",
                alignItems: "center",
                alignContent: "center",
                backgroundColor: Colors.white,
                position: "absolute",
                bottom: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: Colors.gray,
              }}
            >
              <View
                style={{
                  height: 60,
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                {...panResponder.panHandlers}
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
                  <Text style={{ fontSize: 15, color: Colors.gray }}></Text>
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      height: 5,
                      width: 50,
                      borderRadius: 8,
                      backgroundColor: Colors.gray,
                    }}
                  ></TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: Colors.black,
                      marginTop: 10,
                    }}
                  >
                    Add item
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                      tintColor: Colors.black,
                      transform: [{ rotate: "45deg" }],
                    }}
                    source={require("../../../assets/plus.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: Colors.gray,
                  marginTop: 10,
                  justifyContent: "center",
                }}
              ></View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ width: "95%" }}
              >
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: Colors.black }}>
                      Activity Type
                    </Text>
                    <Text style={{ fontSize: 12, color: Colors.black }}></Text>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      allowFontScaling={false}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        height: "100%",
                        paddingHorizontal: 15,
                        color: Colors.black,
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        fontSize: 14,
                        padding: 2,
                      }}
                      autoCorrect={false}
                      returnKeyType="done"
                     
                    />
                  </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: Colors.black }}>
                      Activity Descripition
                    </Text>
                    <Text style={{ fontSize: 12, color: Colors.black }}></Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      allowFontScaling={false}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        height: "100%",
                        paddingHorizontal: 15,
                        color: Colors.black,
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        fontSize: 14,
                        padding: 2,
                      }}
                      autoCorrect={false}
                      returnKeyType="done"
                    />
                  </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: Colors.black }}>
                      Due Date
                    </Text>
                    <Text style={{ fontSize: 12, color: Colors.black }}></Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      allowFontScaling={false}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        height: "100%",
                        paddingHorizontal: 15,
                        color: Colors.black,
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        fontSize: 14,
                        padding: 2,
                      }}
                      keyboardType="email-address"
                      autoCorrect={false}
                      returnKeyType="done"
                      onChangeText={(text) => setEmail(text)}
                    />
                  </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.black,
                      marginTop: 15,
                    }}
                  >
                    Notes
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      allowFontScaling={false}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        height: "100%",
                        paddingHorizontal: 15,
                        color: Colors.black,
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        fontSize: 14,
                        padding: 2,
                      }}
                      autoCorrect={false}
                      returnKeyType="done"
                      
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: "95%",
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: Colors.gray,
                    marginTop: 30,
                    marginBottom: 20,
                  }}
                ></View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.black,
                      marginTop: 15,
                    }}
                  >
                    Completed Date
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
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
                      {items.item.contact_email}
                    </Text>
                  </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.black,
                      marginTop: 15,
                    }}
                  >
                    Owner
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      allowFontScaling={false}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        height: "100%",
                        paddingHorizontal: 15,
                        color: Colors.black,
                        borderWidth: 1,
                        borderColor: Colors.gray,
                        fontSize: 14,
                        padding: 2,
                      }}
                      autoCorrect={false}
                      returnKeyType="done"
                      placeholder="biff@bowser.com"
                      placeholderTextColor={Colors.black}
                     
                    />
                  </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: Colors.black,
                      marginTop: 15,
                    }}
                  >
                    Contact
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      allowFontScaling={false}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        height: "100%",
                        paddingHorizontal: 15,
                        color: Colors.black,
                        borderWidth: 1,
                        borderColor: Colors.gray,
                        fontSize: 14,
                        padding: 2,
                      }}
                      keyboardType="number-pad"
                      autoCorrect={false}
                      returnKeyType="done"
                      placeholderTextColor={Colors.black}
                     
                    />
                  </View>
                </View>

                <View style={{ height: 20 }}></View>
              </ScrollView>
              <View style={{ height: 100, width: "100%" }}>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: Colors.gray,
                    marginTop: 10,
                    justifyContent: "center",
                  }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    height: 60,
                    marginTop: 20,
                    alignSelf: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      height: 35,
                      width: "45%",
                      borderRadius: 5,
                      borderColor: Colors.gray,
                      borderWidth: 0.5,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "700" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      height: 35,
                      width: "45%",
                      borderRadius: 5,
                      backgroundColor: Colors.PrimaryColor,

                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: Colors.white,
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

         
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              marginTop: 30,
            }}
          ></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headingmaintype: {
    color: "black",
    fontSize: 14,

    marginBottom: 3,

    //  width: "100%",
  },
  subheadingmaintype: {
    color: "black",
    fontSize: 14,

    marginBottom: 15,
    width: "100%",
    fontWeight: "bold",
    textTransform: "capitalize",
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 12,
    paddingVertical: 16,
  },
  subheadingmaintypeinner: {
    color: "black",
    fontSize: 14,

    marginBottom: 3,
    // width: "100%",
    width: 130,
    textAlign: "right",
  },
  subheadingmaintypeinnerdate: {
    color: "black",
    fontSize: 14,

    marginBottom: 3,
    // width: "100%",
    width: 100,
    textAlign: "right",
  },
  nodata:{textAlign:"center"},
  mainpropertydata:{textAlign:"left",width:"100%",
paddingLeft:12,marginBottom:9},
  editactivity:{marginLeft:12,
  color:Colors.PrimaryColor,
fontSize:14,fontWeight:"bold"},
});
export default MyClientsDetails;
