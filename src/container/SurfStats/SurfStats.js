import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import { getSearchFav } from "../../modules/getSearchFav";
import { getContactFav } from "../../modules/getContactFav";
import { useDispatch } from "react-redux";

const SurfStats = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [contactData, setContactData] = useState("");
  const [searchData, setSearchData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [modalData, setModalData] = useState(""); // Initialize an empty string as the initial value
  const [modal2Data, setModal2Data] = useState(""); // Initialize an empty string as the initial value
  const [showPopup2, setShowPopup2] = useState(false);

  const openPopup = () => {
    console.log(modalData);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const openPopup2 = () => {
    console.log(modal2Data);
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setToggle(!isEnabled);
  };
  const items = props.route.params;
  const id = items.item.id;

  useEffect(() => {
    getContact();
    getSearch();
  }, []);

  const getSearch = () => {
    dispatch(getSearchFav(id)).then((response) => {
      const contactsData = response.payload.data;
      setModal2Data(contactsData);
      if (contactsData === "Record not found!") {
        setSearchData("0");
      } else {
        const contactFav = contactsData.length;
        setSearchData(contactFav);
      }
    });
  };
  const getContact = () => {
    dispatch(getContactFav(id)).then((response) => {
      const contactsData = response.payload.data;
      setModalData(contactsData);
      const leadsCount = contactsData.length;
      setContactData(leadsCount);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
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
            onPress={() => navigation.navigate("Contact")}
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
          </TouchableOpacity>
          <Text
            style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
          >
            surf Stats
          </Text>
          <View style={styles.threeiconmain}>
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
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 12,
              backgroundColor: Colors.cream,
            }}
          >
            <View style={styles.maincover}>
              <View style={styles.clientinformation}>
                <View style={styles.clientinformationinner}>
                  <Text style={styles.username}>{items.item.contact_name}</Text>
                  <Text style={styles.clientid}>
                    Client ID: {items.item.id}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.maincovercolumns}>
              <View style={styles.covercolsingle}>
                <View style={styles.signlecolumn}>
                  <View style={styles.innermains}>
                    <Text style={styles.simplename}>Favorites</Text>
                    <TouchableOpacity style={styles.iconnextarrow}>
                      <Image
                        style={{
                          height: 15,
                          width: 15,
                          marginLeft: 20,
                          resizeMode: "contain",
                        }}
                        source={require("../../../assets/arrownext.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => openPopup()}>
                    <Text style={styles.boldname}>{contactData}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    marginTop: 10,
                    justifyContent: "center",
                    backgroundColor: Colors.cream,
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showPopup}
                    onRequestClose={closePopup}
                  >
                    <View style={{ justifyContent: "space-between" }}>
                      <FlatList
                        data={modalData}
                        numColumns={2}
                        ListFooterComponent={() => (
                          <View style={{ height: 200 }}></View>
                        )}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                              navigation.navigate("PropertiesDetails", {
                                id: item.property_id,
                              });
                              closePopup(); // Call the closepopup function after navigation
                            }}
                            style={{
                              height: 250,
                              margin: "2.5%",
                              width: "45%",
                            }}
                          >
                            <View
                              style={{
                                height: "75%",
                                justifyContent: "center",
                              }}
                            >
                              <Image
                                source={{ uri: item.property_image[0] }}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: 20,
                                  backgroundColor: Colors.gray,
                                }}
                              ></Image>
                            </View>
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
                                {item.property_id}
                              </Text>
                              <Text
                                style={{
                                  color: Colors.black,
                                  fontSize: 12,
                                }}
                              >
                                {item.prop_title}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                  </Modal>
                </View>
              </View>
              <View style={styles.covercolsingle}>
                <View style={styles.signlecolumn}>
                  <View style={styles.innermains}>
                    <Text style={styles.simplename}>Saved Searches</Text>
                    <TouchableOpacity style={styles.iconnextarrow}>
                      <Image
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: "contain",
                        }}
                        source={require("../../../assets/arrownext.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => openPopup2()}>
                    <Text style={styles.boldname}>{searchData}</Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showPopup2}
                  onRequestClose={closePopup2}
                >
                  <FlatList
                    data={modal2Data}
                    ListFooterComponent={<View style={{ height: 50 }}></View>}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          height: 80,
                          width: "97%",
                          alignSelf: "center",
                          borderWidth: 1,
                          borderColor: "#bbbbbb52",
                          alignItems: "center",
                          alignContent: "center",
                          flexDirection: "row",
                          backgroundColor: "#987e7e17",
                          marginBottom: 5,
                          padding: 12,
                          justifyContent: "space-between",
                          borderRadius: 6,
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                            //flexWrap:"wrap",
                            // width:"100%"
                            // Width: 70,
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              height: 50,
                              width: 50,
                              borderRadius: 100,
                              resizeMode: "cover",
                              marginRight: 7,
                              borderColor: Colors.white,
                              borderWidth: 1,
                            }}
                          ></Image>

                          <Text
                            style={{
                              color: Colors.black,
                              fontSize: 14,
                              fontWeight: "bold",
                              width: 100,
                              paddingHorizontal: 4,
                              //flexWrap:"wrap"
                            }}
                          >
                            {item.search_parameters}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                      <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text>No data found</Text>
                      </View>
                    }
                    keyExtractor={(item) => item.id}
                  />
                </Modal>
              </View>
            </View>
            <View style={styles.maincovercolumns}>
              <View style={styles.covercolsingle}>
                <View
                  style={[
                    styles.signlecolumn,
                    {
                      minHeight: 210,
                      justifyContent: "center",
                      position: "relative",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.simplename,
                      { marginBottom: 15, position: "absolute", top: 19 },
                    ]}
                  >
                    Engagement
                  </Text>
                  <Text style={styles.boldname}>00:13:53</Text>
                </View>
              </View>
              <View style={styles.covercolsingle}>
                <View style={styles.signlecolumn}>
                  <Text style={[styles.simplename, { marginBottom: 15 }]}>
                    Search Criteria
                  </Text>
                  <View style={styles.mainsimpleprog}>
                    <Text style={styles.progheading}>Boynton Beach</Text>
                    <View style={styles.progresscover}>
                      <View
                        style={[styles.inerprogcover, { width: "70%" }]}
                      ></View>
                    </View>
                    <Text style={styles.progresstext}>7,366</Text>
                  </View>
                  <View style={styles.mainsimpleprog}>
                    <Text style={styles.progheading}>4 Bedrooms</Text>
                    <View style={styles.progresscover}>
                      <View
                        style={[styles.inerprogcover, { width: "40%" }]}
                      ></View>
                    </View>
                    <Text style={styles.progresstext}>5,298</Text>
                  </View>
                  <View style={styles.mainsimpleprog}>
                    <Text style={styles.progheading}>Master of main Level</Text>
                    <View style={[styles.progresscover, {}]}>
                      <View
                        style={[
                          styles.inerprogcover,
                          { width: "60%", backgroundColor: "#eb9d22" },
                        ]}
                      ></View>
                    </View>
                    <Text style={styles.progresstext}>12,85</Text>
                  </View>
                  <View style={styles.mainsimpleprog}>
                    <Text style={styles.progheading}>Pickleball</Text>
                    <View style={[styles.progresscover, {}]}>
                      <View
                        style={[
                          styles.inerprogcover,
                          { width: "20%", backgroundColor: "#d4445c" },
                        ]}
                      ></View>
                    </View>
                    <Text style={styles.progresstext}>12,85</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.maincovercolumns}>
              <View style={styles.covercolsingle}>
                <View style={styles.signlecolumn}>
                  <Text style={[styles.simplename, , { marginBottom: 15 }]}>
                    Search Behaviour
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 130,
                        width: 130,
                        resizeMode: "contain",
                      }}
                      source={require("../../../assets/graphone.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.covercolsingle}>
                <View style={styles.signlecolumn}>
                  <Text style={[styles.simplename, , { marginBottom: 15 }]}>
                    Surf Level
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: 108,
                        width: 108,
                        resizeMode: "contain",
                      }}
                      source={require("../../../assets/grommet.png")}
                    />
                  </TouchableOpacity>
                  <Text style={styles.grommt}>Grommet</Text>
                </View>
              </View>
            </View>
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      </View>
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
  innermains: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 15,
  },
  progresscover: {
    width: "100%",
    height: 3,
    borderRadius: 22,
    backgroundColor: Colors.cream,
    position: "relative",
  },
  inerprogcover: {
    height: 3,
    borderRadius: 22,
    backgroundColor: "#2bbcee",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  progresstext: {
    textAlign: "right",
    fontSize: 7,
    marginTop: 4,
    color: "#979897",
  },
  bigtextone: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  grommt: { fontSize: 17, fontWeight: "bold" },
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

  boldphone: { fontWeight: "bold", fontSize: 14 },

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

  maincover: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 15,
  },
  clientinformation: { flexDirection: "column", alignItems: "center" },

  clientinformationinner: {
    paddingVertical: 12,
    textAlign: "center",
    alignItems: "center",
    paddingBottom: 7,
  },

  username: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },

  clientid: { fontSize: 14, marginBottom: 5 },
  covercolsingle: {
    width: "50%",
    height: "100%",
    backgroundColor: color.white,
  },
  signlecolumn: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
    paddingTop: 19,
    paddingBottom: 2,
    paddingBottom: 10,
  },
  //   iconnextarrow:{alignItems:"flex-end",
  // position:"absolute",
  // right:10,
  // top:10
  // },
  iconnextarrow: { position: "absolute", right: 0 },
  simplename: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  boldname: { color: "#0d8dba", fontWeight: "bold", fontSize: 30 },
  maincovercolumns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  mainsimpleprog: { width: "100%", marginBottom: 2 },
  progheading: { fontSize: 11, marginBottom: 4 },
});

export default SurfStats;
