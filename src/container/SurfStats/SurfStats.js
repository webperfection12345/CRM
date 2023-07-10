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
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from 'react-native';
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";
import { getSearchFav } from "../../modules/getSearchFav";
import { getContactFav } from "../../modules/getContactFav";
import { useDispatch } from "react-redux";
import { getEngagement } from "../../modules/getEngagement";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import { getStatsData } from "../../modules/getStats";
import Activity from "../../components/Activity";


const SurfStats = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const [isEnabled, setIsEnabled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [contactData, setContactData] = useState("");
  const [searchData, setSearchData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [modalData, setModalData] = useState(""); // Initialize an empty string as the initial value
  const [modal2Data, setModal2Data] = useState(""); // Initialize an empty string as the initial value
  const [showPopup2, setShowPopup2] = useState(false);
  const [timeData, setTimeData] = useState("");
  const data = [{ 'label': 'Favorites', index: '0' }, { 'label': 'Saved Searches', index: '1' }, { 'label': 'Engagement', index: '2' }, { 'label': 'Search Criteria', index: '3' }, { 'label': 'Search Behaviour', index: '4' }, { 'label': 'Surf Level', index: '5' }];
  const [numberOfColumns, setNumberOfColumns] = useState(2)
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({})
  const [criteriaMax, setCriteriaMax] = useState(0)
  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setViewHeight(height)
  }

  const [viewHeight, setViewHeight] = useState(height)
  useEffect(() => {
    { width >= 768 ? setNumberOfColumns(3) : setNumberOfColumns(2) }
  }, [])
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
    // getContact();
    // getSearch();
    // getEngageTime();
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

  useEffect(() => {
    setLoading(true)
    dispatch(getStatsData('1078303')).then((response) => {
      console.log('Stats Data', response.payload.data)
      setStats(response.payload.data)


      setLoading(false)
    });
  }, [])
  const getContact = () => {
    dispatch(getContactFav(id)).then((response) => {
      const contactsData = response.payload.data;
      setModalData(contactsData);
      const leadsCount = contactsData.length;
      setContactData(leadsCount);
    });
  };
  const getEngageTime = () => {
    dispatch(getEngagement(id)).then((response) => {
      const contactsData = response.payload.data;
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.cream }}>

      {
        loading ? <Activity /> : <View style={{ flex: 1, backgroundColor: Colors.white }}>
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
              nestedScrollEnabled={true}
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

              <FlatList
                data={data}
                numColumns={width < 768 ? 2 : width === 768 ? 3 : width === 1024 ? 4 : width === 1440 ? 5 : 5}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.maincovercolumns}>
                      <View style={styles.covercolsingle(width < 768 ? width / 2 - 8 : width === 768 ? width / 3 - 8 : width === 1024 ? width / 4 - 8 : width === 1440 ? width / 5 - 8 : width / 5 - 8)}>
                        <View style={styles.signlecolumn(width < 768 ? width / 2 - 8 : width === 768 ? width / 3 - 8 : width === 1024 ? width / 4 - 8 : width === 1440 ? width / 5 - 8 : width / 5 - 8)}>
                          <View style={styles.innermains}>
                            <Text style={styles.simplename}>{item.label}</Text>
                            {
                              index === 0 || index === 1 ? <TouchableOpacity style={styles.iconnextarrow}>
                                <Image
                                  style={{
                                    height: 15,
                                    width: 15,
                                    marginLeft: 20,
                                    resizeMode: "contain",
                                  }}
                                  source={require("../../../assets/arrownext.png")}
                                ></Image>
                              </TouchableOpacity> : null
                            }
                          </View>
                          <TouchableOpacity  disabled={index === 5 && true} onPress={() => openPopup()}>
                            {
                              index === 0 || index === 1 || index === 2 ? <Text style={styles.boldname}>{index === 0 ? stats && stats.favorites.favcount : index === 1 ? stats && stats.save_search_data.searchdata.length : index === 2 ? stats.engagement_data.user_session_time : ''}</Text> :
                                index === 4 || index === 5 ? <TouchableOpacity
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",

                                  }}
                                >
                                  {
                                    index === 5 ? <Image
                                      style={{
                                        padding: 20,
                                        resizeMode: "stretch",
                                        height: '100%',
                                        width: '40%'
                                      }}
                                      source={index === 5 ? require("../../../assets/grommet.png") : null}
                                    /> : <View style={styles.maingraph}>
                                      <View >
                                        <Text style={styles.textleft}>80-</Text>
                                        <Text style={styles.textleft}>70-</Text>
                                        <Text style={styles.textleft}>60-</Text>
                                        <Text style={styles.textleft}>50-</Text>
                                        <Text style={styles.textleft}>40-</Text>
                                        <Text style={styles.textleft}>30-</Text>
                                        <Text style={styles.textleft}>20-</Text>
                                        <Text style={styles.textleft}>10-</Text>
                                        <Text style={styles.textleft}>0-</Text>
                                      </View>

                                      <View style={{ position: "absolute", width: "100%", height: "100%", }}>
                                        <View style={{ flexDirection: "row", position: "relative", width: "100%", height: "100%", justifyContent: "center" }}>
                                          <View style={styles.coverbg}>
                                            <View style={styles.mainbg}>
                                              <View style={styles.innermainbg}>

                                              </View>
                                            </View>
                                          </View>

                                          <View style={styles.coverbg}>
                                            <View style={styles.mainbg}>
                                              <View style={[styles.innermainbg, { height: "50%" }]}>

                                              </View>
                                            </View>
                                          </View>
                                          <View style={styles.coverbg}>
                                            <View style={styles.mainbg}>
                                              <View style={[styles.innermainbg, { height: "20%" }]}>

                                              </View>
                                            </View>
                                          </View>
                                          <View style={styles.coverbg}>
                                            <View style={styles.mainbg}>
                                              <View style={styles.innermainbg}>

                                              </View>
                                            </View>
                                          </View>
                                          <View style={styles.coverbg}>
                                            <View style={styles.mainbg}>
                                              <View style={[styles.innermainbg, { height: "50%" }]}>

                                              </View>
                                            </View>
                                          </View>
                                          <View style={styles.coverbg}>
                                            <View style={styles.mainbg}>
                                              <View style={styles.innermainbg}>

                                              </View>
                                            </View>
                                          </View>
                                          <View style={styles.coverbg}>
                                            <View style={styles.mainbg}>
                                              <View style={[styles.innermainbg, { height: "10%" }]}>

                                              </View>
                                            </View>
                                          </View>
                                        </View>


                                      </View>
                                      <View style={{ top: 22, position: "relative", justifyContent: "space-between", flexDirection: "row", width: "100%", paddingHorizontal: 16 }}>
                                        <Text style={styles.wknam}>M</Text>
                                        <Text style={styles.wknam}>T</Text>
                                        <Text style={styles.wknam}>W</Text>
                                        <Text style={styles.wknam}>TH</Text>
                                        <Text style={styles.wknam}>F</Text>
                                        <Text style={styles.wknam}>S</Text>
                                        <Text style={styles.wknam}>S</Text>
                                      </View>
                                    </View>

                                  }

                                </TouchableOpacity> :
                                
                                  <FlatList
                                    nestedScrollEnabled={true}
                                    data={stats.search_criteria.criteria_data}
                                    style={{ width: "100%" }}
                                    renderItem={({ item }) => {
                                      return (
                                        <View style={styles.mainsimpleprog}>
                                          <Text style={styles.progheading}>{item.search_name}</Text>
                                          <View style={styles.progresscover}>
                                            <View
                                              style={[styles.inerprogcover, { width: (100 * item.search_count) / stats.search_criteria.Criteria_Max + "%" }]}
                                            ></View>
                                          </View>
                                          <Text style={styles.progresstext}>{item.search_count}</Text>
                                        </View>
                                      )
                                    }}>

                                  </FlatList>
                                  
                            } 
                          </TouchableOpacity>
                        </View></View></View>
                  )
                }}>
              </FlatList>

              {/* <View style={styles.maincovercolumns}>
            <View style={styles.covercolsingle(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
              <View style={styles.signlecolumn(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
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
                  backgroundColor: Colors.cream,
                  width: "100%",
                }}
              >
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showPopup}
                  onRequestClose={closePopup}
                >
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      backgroundColor: Colors.cream,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.PrimaryColor,
                        height: 30,
                        width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                        marginRight: 12,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          closePopup();
                        }}
                      >
                        <Image
                          style={{
                            height: 12,
                            width: 12,
                            resizeMode: "contain",
                          }}
                          source={require("../../../assets/closewhite.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      backgroundColor: Colors.cream,
                      width: "100%",
                      height: "100%",
                    }}
                  >
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
                            height: 300,
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
                                backgroundColor: Colors.white,
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
                                fontSize: 14,
                              }}
                            >
                              {item.prop_title}
                            </Text>
                            <Text
                              style={{
                                color: Colors.PrimaryColor,
                                fontSize: 12,
                                fontWeight: "bold",
                                marginTop: 5,
                              }}
                            >
                              {item.property_id}
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
            <View style={styles.covercolsingle(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
              <View style={styles.signlecolumn(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
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
              <View
                style={{
                  backgroundColor: Colors.cream,
                  width: "100%",
                }}
              >
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showPopup2}
                  onRequestClose={closePopup2}
                >
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      backgroundColor: Colors.cream,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.PrimaryColor,
                        height: 30,
                        width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                        marginRight: 12,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          closePopup2();
                        }}
                      >
                        <Image
                          style={{
                            height: 12,
                            width: 12,
                            resizeMode: "contain",
                          }}
                          source={require("../../../assets/closewhite.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      backgroundColor: Colors.cream,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <FlatList
                      data={modal2Data}
                      ListFooterComponent={
                        <View style={{ height: 100 }}></View>
                      }
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={{
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            paddingHorizontal: 12,
                            marginBottom: 12,
                            paddingBottom: 7,
                            backgroundColor: Colors.white,
                            paddingTop: 7,
                            marginHorizontal: 12,
                            borderRadius: 5,
                            borderColor: "#ddd",
                            borderWidth: 1,
                          }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "flex-start",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              width: "100%",
                              position: "relative",
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.black,
                                fontSize: 16,
                                fontWeight: "bold",

                                flexWrap: "wrap",
                              }}
                            >
                              Search-Parameters: {item.search_parameters}
                            </Text>
                            <Image
                              style={styles.trashicon}
                              source={require("../../../assets/trash.png")}
                            ></Image>
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
                  </View>
                </Modal>
              </View>
            </View>
          </View> */}
              {/* <View style={styles.maincovercolumns}>
            <View style={styles.covercolsingle(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
              <View
                style={[
                  styles.signlecolumn(width >= 768 ? width / 3 - 16 : width / 2 - 16),
                  {
                    // minHeight: 210,
                    justifyContent: "center",
                    // position: "relative",
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
                <Text style={styles.boldname}>
                  {timeData.user_session_time}
                </Text>
              </View>
            </View>
            <View style={styles.covercolsingle(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
              <View style={styles.signlecolumn(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
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
            <View style={styles.covercolsingle(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
              <View style={styles.signlecolumn(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
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
            <View style={styles.covercolsingle(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
              <View style={styles.signlecolumn(width >= 768 ? width / 3 - 16 : width / 2 - 16)}>
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
          </View>  */}
              <View style={{ height: 50 }}></View>
            </ScrollView>
          </View>
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maingraph: {
    width: 150,
    height: 150,
    //backgroundColor: Colors.cream,
    borderBottomColor: "green",
    borderBottomWidth: 1,
  },
  innermainbg: { backgroundColor: Colors.PrimaryColor, height: 80, width: 15, position: "absolute", bottom: 0 },
  mainbg: { height: "100%", width: 15, position: "absolute", bottom: 0 },
  maincoverbars: { height: "100%", backgroundColor: "green", position: "relative" },
  weektext: { fontSize: 13, color: Colors.black, opacity: .5, position: "absolute", bottom: -17, left: 0, right: 0, paddingHorizontal: 4 },

  mainweeks: {
    flexDirection: "row", height: "100%",
  },

  coverbg: { height: "100%", position: "relative", width: 16 },
  wknam: { fontSize: 10, color: Colors.black, opacity: .5, paddingTop: 4, position: "relative", paddingHorizontal: 2 },
  textleft: { fontSize: 10, color: Colors.black, opacity: .5, paddingTop: 4, position: "relative", marginLeft: -8, marginTop: -1, zIndex: 99 },
  fullcoversize: {
    height: "100%", width: 16, backgroundColor: "pink",
  },
  fullactualcoversize: {
    height: "50%", width: 16, backgroundColor: "black",
  },

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
  trashicon: {
    height: 20,
    width: 20,
    position: "absolute",
    right: 10,
    tintColor: Colors.PrimaryColor,
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
  covercolsingle: width => ({
    width: width,
  }),
  signlecolumn: width => ({
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    height: width,
    alignContent:"center",
    overflow: 'hidden',
  }),
  //   iconnextarrow:{alignItems:"flex-end",
  // position:"absolute",
  // right:10,
  // top:10
  // },
  iconnextarrow: { position: "absolute", right: 0 },
  simplename: { fontSize: 12, fontWeight: "bold", textAlign: "center", justifyContent: 'center' },
  boldname: { color: "#0d8dba", fontWeight: "bold", fontSize: 30, height: '100%', textAlign: 'center', alignContent: 'center' },
  maincovercolumns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  mainsimpleprog: { width: "100%", marginBottom: 2 },
  progheading: { fontSize: 11, marginBottom: 4, width: '100%' },
});

export default SurfStats;
