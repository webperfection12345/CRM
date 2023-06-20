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

const MyClientsDetails = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();
  const [history, setHistory] = useState();
  const [note, setNote] = useState([]);
  const [task, setTask] = useState([]);
  const [leadType, setLeadType] = useState("");
  const [property, setProperty] = useState([]);
  const items = props.route.params;
  const isFocused = useIsFocused();

  const id = items.item.id;

  useEffect(() => {
    if (isFocused) {
      console.log("Page refreshed");
    }
    MyClientsDetails();
    allActivityHistory();
    MyTaskData();
    MyNoteData();
    MyDocsData();
  }, [isFocused]);

  const MyTaskData = () => {
    dispatch(getActivityData(id)).then((response) => {
      const taskData = response.payload.data;
      setTask(taskData);
    });
  };
  const MyClientsDetails = () => {
    dispatch(getClientDetails(id))
      .then((response) => {
        const clientData = response.payload.data;
        setData(clientData);
        const prop = clientData.map((item) => item.property_viewed);
        setProperty(prop);
        const url = clientData.map((item) => item.linked_id);
        const updatedLeadTypes = clientData.map((item) => {
          const url = item.linked_lead;
          const paramName = getParamNameFromUrl(url, "wpestate_crm_lead");
          return "Lead";
        });

        setLeadType(updatedLeadTypes);
        console.log(updatedLeadTypes);
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

  const allActivityHistory = () => {
    dispatch(activityHistory()).then((response) => {
      const history = response.payload.data;
      setHistory(history);
    });
  };
  const MyNoteData = () => {
    dispatch(getNoteData(id)).then((response) => {
      const noteData = response.payload.data;
      setNote(noteData);
    });
  };
  const MyDocsData = () => {
    dispatch(getDocument()).then((response) => {
      console.log(response, "note");
    });
  };

  const fogotPassword = () => {
    navigation.navigate("ForgotPassword");
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
  const newLocal = (
    <TouchableOpacity
      onPress={toggleModal}
      style={{
        justifyContent: "center",
        backgroundColor: Colors.PrimaryColor,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ height: 20, width: 20, resizeMode: "contain" }}
        source={require("../../../assets/plus.png")}
      ></Image>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        {/* <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: Colors.PrimaryColor,
            position: 'absolute',
            bottom: 20,
            right: 20,
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: Colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: Colors.PrimaryColor}}>$</Text>
          </TouchableOpacity>
        </View> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  borderWidth: 1,
                  width: "100%",
                  alignSelf: "center",
                  borderRadius: 5,
                  marginTop:0,
                  borderColor: Colors.gray,
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
                    <Text style={{ fontSize: 15, color: Colors.white }}>
                      Back
                    </Text>
                  </TouchableOpacity>
                  <Text style={{  fontSize: 19, fontWeight: "bold", color: Colors.white }}>
                    MyClientsDetails
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditClientsDetails", { item })
                    }
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
                      borderWidth:2,
                      borderColor: '#ddd',
                    }}
                  ></Image>
                  <View style={{ width: "60%", justifyContent: "center" }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 30,

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
                    borderBottomWidth: 1,
                    borderColor: Colors.gray,
                    marginTop: 20,
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
                    borderBottomWidth: 1,
                    borderColor: Colors.gray,
                    marginTop: 10,
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
                    borderBottomWidth: 1,
                    borderColor: Colors.gray,
                    marginTop: 10,
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

                {/* <View
              style={{
                height: 30,
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: Colors.gray,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 14,
                }}>
                Linkedin
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}>
                @biffthevs
              </Text>
            </View> */}
                {/* <View
              style={{
                height: 30,
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: Colors.gray,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 14,
                }}>
                Twitter
              </Text>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 16,
                }}>
                @biffy
              </Text>
            </View> */}
                <View
                  style={{
                    height: 30,
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    marginTop: 10,
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
                    onPress={() => navigation.navigate("AddActivity", { item })}
                    style={{
                      height: 52,
                      width: "25%",
                      borderRadius: 5,
                      borderColor: Colors.gray,
                      borderWidth: 0.5,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight:6
                    }}
                  >
                    <Text style={{ fontSize: 14, color: Colors.black }}>
                      🗓️ TASK
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("NewNote", { item })}
                    style={{
                      height: 52,
                      width: "25%",
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
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                Properties Viewed
              </Text>
              {/* <TouchableOpacity style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    color: Colors.PrimaryColor,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  See All
                </Text>
              </TouchableOpacity> */}
            </View>
            <View>
              <FlatList
                data={property}
                scrollEnabled={false}
                numColumns={5}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PropertiesViewed", { items })
                    }
                    style={{
                      height: 200,
                      width: "90%",
                      alignSelf: "center",
                      borderBottomWidth: index === 4 ? null : 1,
                      borderBottomColor: Colors.gray,
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 20,
                          backgroundColor: Colors.gray,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* <Image
            source={{ uri: item.prop_image }} // Replace `item.prop_image` with the actual property image URL from your API response
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
            }}
          /> */}
                      </View>
                    </View>
                    <View
                      style={{
                        width: "80%",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text>{item.prop_title}</Text>
                      </View>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 12,
                        }}
                      >
                        {/* {item.details} */}
                      </Text>

                      {/* <View
          style={{
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
        </View> */}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

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
                    fontWeight: "bold",
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
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                Document Portal
              </Text>
              {/* <TouchableOpacity style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    color: Colors.PrimaryColor,
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  See All
                </Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                height: 300,
                marginTop: 20,
              }}
            >
              <FlatList
                data={[]}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    //onPress={() => navigation.navigate('MyClientsDetails')}
                    style={{
                      height: 60,
                      width: "90%",
                      alignSelf: "center",
                      borderBottomWidth: index == 4 ? null : 1,
                      borderBottomColor: Colors.gray,
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 20,
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
                          {item.contact_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "80%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
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
                          {item.contact_name}
                        </Text>
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: 12,
                          }}
                        >
                          {/* {item.details} */}
                        </Text>
                      </View>
                      <View
                        style={{
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
                )}
                //   keyExtractor={(item) => item.id}
                //  ItemSeparatorComponent={this.renderSeparator}
                //   key={(item) => item.id}
              />
            </View>
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
                onPress={() => navigation.navigate("Documents")}
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
                    fontWeight: "bold",
                    color: Colors.white,
                  }}
                >
                  See all Documents
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
          >
            {/* <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginLeft: 15,
                }}
              >
                Activities
              </Text>
            </View> */}
            {/* <View
              style={{
                marginTop: 20,
              }}
            >
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditActivity")}
                    style={{
                      height: 60,
                      width: "90%",
                      marginTop: 8,
                      borderRadius: 5,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                      backgroundColor:
                        index % 2 == 0 ? "#f9fafa" : Colors.white,
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.PrimaryColor,
                            fontSize: 16,
                          }}
                        >
                          🗓️
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "80%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
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
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: 12,
                          }}
                        >
                          {item.details}
                        </Text>
                      </View> */}
            {/* <View
                        style={{
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
                      </View> */}
            {/* </View> */}
            {/* </TouchableOpacity>
                )}
                //   keyExtractor={(item) => item.id}
                //  ItemSeparatorComponent={this.renderSeparator}
                //   key={(item) => item.id}
              />
            </View> */}
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
                Activities
              </Text>
              {/* <TouchableOpacity
                onPress={toggleModal}
                style={{
                  justifyContent: "center",
                  backgroundColor: Colors.PrimaryColor,
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                  source={require("../../../assets/plus.png")}
                ></Image>
              </TouchableOpacity> */}
            </View>
            <View style={{ backgroundColor: Colors.white, marginTop: 20 }}>
              <FlatList
                data={task}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    //onPress={() => navigation.navigate('MyClientsDetails')}
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
                          {item.activity_content}
                        </Text>

                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: 12,
                          }}
                        >
                          {item.activity_notes}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                //   keyExtractor={(item) => item.id}
                //  ItemSeparatorComponent={this.renderSeparator}
                //   key={(item) => item.id}
              />
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
                Notes
              </Text>
              {/* <TouchableOpacity
                onPress={toggleModal}
                style={{
                  justifyContent: "center",
                  backgroundColor: Colors.PrimaryColor,
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                  source={require("../../../assets/plus.png")}
                ></Image>
              </TouchableOpacity> */}
            </View>
            <View style={{ backgroundColor: Colors.white, marginTop: 20 }}>
              <FlatList
                data={note}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    //onPress={() => navigation.navigate('MyClientsDetails')}
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
                //   keyExtractor={(item) => item.id}
                //  ItemSeparatorComponent={this.renderSeparator}
                //   key={(item) => item.id}
              />
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
              <FlatList
                data={history}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    //onPress={() => navigation.navigate('MyClientsDetails')}
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
                )}
                //   keyExtractor={(item) => item.id}
                //  ItemSeparatorComponent={this.renderSeparator}
                //   key={(item) => item.id}
              />
            </View>
            <View style={{ height: 50 }}></View>
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
                      //onChangeText={text => setID(text)}
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
                      // onChangeText={text => setNickname(text)}
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
                      // onChangeText={text => setLastName(text)}
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
                      //onChangeText={text => setMobile(text)}
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
              borderWidth: 1,
              width: "95%",
              alignSelf: "center",
              borderRadius: 5,
              marginTop: 30,
              borderColor: Colors.gray,
            }}
          ></View>
          <View
            style={{
              borderWidth: 1,
              width: "95%",
              alignSelf: "center",
              borderRadius: 5,
              marginTop: 30,
              borderColor: Colors.gray,
            }}
          ></View>
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

export default MyClientsDetails;
