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
                numColumns={width < 768 ? 2 : width === 768 ? 3 : width === 1024 ? 4 : width === 1440 ? 5 : 5} renderItem={({ item, index }) => {
                  return (
                 <TouchableOpacity onPress={()=>{index === 0 ? navigation.navigate('Favorites',{item:stats.favorites})
                  : index === 1 ? navigation.navigate('SavedSearch',{item:stats.save_search_data})
                  : index === 3 ? navigation.navigate('SearchCreteria',{item:stats.search_criteria}) : null}}>
                     <View style={styles.maincoverupper}>
                      <View
                        style={styles.covercolsinglemain(
                          width < 768 ? width / 2.1 - 8 : width === 768 ? width / 3.1 - 8 : width === 1024 ? width / 4.1 - 8 : width === 1440 ? width / 5.1 - 8 : width / 5.1 - 8
                        )}
                      >
                        <View
                          style={styles.textcover}
                        >
                          <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>

                          {/* <Image
                            style={styles.rightarrowtext}
                            source={require("../../../assets/arrownext.png")}
                          ></Image> */}
                        </View>
                        {
                          index === 0 || index === 1 || index === 2 ?
                            <Text style={styles.centertext}
                            >
                              {index === 0 ? stats && stats.favorites.favcount : index === 1 ? stats && stats.save_search_data.searchdata.length : index === 2 ? stats.engagement_data.user_session_time : ''}
                            </Text> : index === 5 ? <Image
                              style={{
                                height: "100%",
                                width: "100%",
                                resizeMode: "contain",
                                marginTop: 20
                              }}
                              source={require("../../../assets/grommet.png")}
                            /> : index === 3 ?
                              <View style={{ marginTop: 16, marginBottom: 16, width: '95%', overflow: 'hidden', height: width < 768 ? width / 2 - 50 : width === 768 ? width / 3 - 50 : width === 1024 ? width / 4 - 50 : width === 1440 ? width / 5 - 50 : width / 5 - 50 }}>
                                <FlatList
                                  data={stats.search_criteria.criteria_data}
                                  style={{ width: "100%", paddingTop: 16, height: "auto" }}
                                  renderItem={({ item }) => {
                                    return (
                                      <View style={styles.mainsimpleprog}>
                                        <Text style={styles.progheading}>{item.search_name}</Text>
                                        <View style={styles.progresscover}>
                                          <View
                                            style={[styles.inerprogcover(item.search_count >= 60 ? '#2bbcee' : item.search_count < 60 && item.search_count > 25 ? '#EBA029' : item.search_count <= 25 ? '#DA6576' : '#2bbcee'), { width: (100 * item.search_count) / stats.search_criteria.Criteria_Max + "%" }]}
                                          ></View>
                                        </View>
                                        <Text style={styles.progresstext}>{item.search_count}</Text>
                                      </View>
                                    )
                                  }}>
                                </FlatList>
                              </View> :
                             <View style={{position:"relative",height:"100%",width:"100%",flexDirection:"row",alignItems:"flex-end"}}>

                             <View style={{position:"relative",height:"90%",width:"90%",marginTop:12,paddingHorizontal:12,alignItems:"flex-end",justifyContent:"flex-start",paddingVertical:12,flexDirection:"row",paddingLeft:1}}>
                             
                             <View style={styles.leftnum}>
                             <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 1) } -</Text>
                             <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 2) } -</Text>
                             <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 3) } -</Text>
                             <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 4) } -</Text>
                             <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 5) } -</Text>
                             <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 6) } -</Text>
                             <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 7)} -</Text>
                                 <Text style={styles.nummain}>{Math.round(stats.search_behavior.Max / 8) } -</Text>
                                 <Text style={styles.nummain}>0 -</Text>
                               </View>
                               <View style={{justifyContent:"space-between",flexDirection:"row",height:"80%",width:"100%"}}>
                             
                               <View style={styles.mainlymain}>
                                 <View style={styles.covertop}>
                                   <View style={{backgroundColor:100 * stats.search_behavior.behavior_data[5].total_count /stats.search_behavior.Max >= 50 ? Colors.PrimaryColor : 100 * stats.search_behavior.behavior_data[5].total_count /stats.search_behavior.Max > 25 && 100 * stats.search_behavior.behavior_data[5].total_count /stats.search_behavior.Max < 50 ? '#545455' : Colors.gray,height:(100 * stats.search_behavior.behavior_data[5].total_count /stats.search_behavior.Max)+ "%"}}></View>
                                 </View>
                                 <Text style={styles.maincoverbar} >{stats.search_behavior.behavior_data[5].Day}</Text>
                               </View>
                               <View style={styles.mainlymain}>
                                 <View style={styles.covertop}>
                                   <View style={{backgroundColor:100 * stats.search_behavior.behavior_data[6].total_count /stats.search_behavior.Max >= 50 ? Colors.PrimaryColor : 100 * stats.search_behavior.behavior_data[6].total_count /stats.search_behavior.Max > 25 && 100 * stats.search_behavior.behavior_data[6].total_count /stats.search_behavior.Max < 50 ? '#545455' : Colors.gray,height:(100 * stats.search_behavior.behavior_data[6].total_count /stats.search_behavior.Max)+"%"}}></View>
                                 </View>
                                 <Text style={styles.maincoverbar} >{stats.search_behavior.behavior_data[6].Day}</Text>
                               </View>
                               <View style={styles.mainlymain}>
                                 <View style={styles.covertop}>
                                   <View style={{backgroundColor:100 * stats.search_behavior.behavior_data[0].total_count /stats.search_behavior.Max >= 50 ? Colors.PrimaryColor : 100 * stats.search_behavior.behavior_data[0].total_count /stats.search_behavior.Max > 25 && 100 * stats.search_behavior.behavior_data[0].total_count /stats.search_behavior.Max < 50 ? '#545455' : Colors.gray,height:(100 * stats.search_behavior.behavior_data[0].total_count /stats.search_behavior.Max)+"%"}}></View>
                                 </View>
                                 <Text style={styles.maincoverbar} >{stats.search_behavior.behavior_data[0].Day}</Text>
                               </View>
                               <View style={styles.mainlymain}>
                                 <View style={styles.covertop}>
                                   <View style={{backgroundColor:100 * stats.search_behavior.behavior_data[1].total_count /stats.search_behavior.Max >= 50 ? Colors.PrimaryColor : 100 * stats.search_behavior.behavior_data[1].total_count /stats.search_behavior.Max > 25 && 100 * stats.search_behavior.behavior_data[1].total_count /stats.search_behavior.Max < 50 ? '#545455' : Colors.gray,height:(100 * stats.search_behavior.behavior_data[1].total_count /stats.search_behavior.Max)+"%"}}></View>
                                 </View>
                                 <Text style={styles.maincoverbar} >{stats.search_behavior.behavior_data[1].Day}</Text>
                               </View>
                               <View style={styles.mainlymain}>
                                 <View style={styles.covertop}>
                                   <View style={{backgroundColor:100 * stats.search_behavior.behavior_data[2].total_count /stats.search_behavior.Max >= 50 ? Colors.PrimaryColor : 100 * stats.search_behavior.behavior_data[2].total_count /stats.search_behavior.Max > 25 && 100 * stats.search_behavior.behavior_data[2].total_count /stats.search_behavior.Max < 50 ? '#545455' : Colors.gray,height:(100 * stats.search_behavior.behavior_data[2].total_count /stats.search_behavior.Max)+"%"}}></View>
                                 </View>
                                 <Text style={styles.maincoverbar} >{stats.search_behavior.behavior_data[2].Day}</Text>
                               </View>
                               <View style={styles.mainlymain}>
                                 <View style={styles.covertop}>
                                   <View style={{backgroundColor:100 * stats.search_behavior.behavior_data[3].total_count /stats.search_behavior.Max >= 50 ? Colors.PrimaryColor : 100 * stats.search_behavior.behavior_data[3].total_count /stats.search_behavior.Max > 25 && 100 * stats.search_behavior.behavior_data[3].total_count /stats.search_behavior.Max < 50 ? '#545455' : Colors.gray,height:(100 * stats.search_behavior.behavior_data[3].total_count /stats.search_behavior.Max)+"%"}}></View>
                                 </View>
                                 <Text style={styles.maincoverbar} >{stats.search_behavior.behavior_data[3].Day}</Text>
                               </View>
                               <View style={styles.mainlymain}>
                                 <View style={styles.covertop}>
                                   <View style={{backgroundColor:100 * stats.search_behavior.behavior_data[4].total_count /stats.search_behavior.Max >= 50 ? Colors.PrimaryColor : 100 * stats.search_behavior.behavior_data[4].total_count /stats.search_behavior.Max >= 25 && 100 * stats.search_behavior.behavior_data[4].total_count /stats.search_behavior.Max < 50 ? '#545455' : Colors.gray,height:(100 * stats.search_behavior.behavior_data[4].total_count /stats.search_behavior.Max)+"%"}}></View>
                                 </View>
                                 <Text style={styles.maincoverbar} >{stats.search_behavior.behavior_data[4].Day}</Text>
                               </View>
                               </View> 
                               </View>  
                             </View>   
                        }
                      </View>
                    </View>
                 </TouchableOpacity>
                  )
                }}>
              </FlatList>
              <View style={{ height: 50 }}></View>
            </ScrollView>
          </View>
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincoverbar:{fontSize:8,textAlign:"center"},
  nummain:{fontSize:8,textAlign:"center",},
  leftnum:{
   // position:"absolute",
   // backgroundColor:"red",
    height:"80%",
    justifyContent:"space-between",
   // bottom:6
  },
  mainlymain:{position:"relative",width:12,marginHorizontal:2},
  covertop:{height:"100%",justifyContent:"flex-end",position:"relative"},
  
  textcover: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    top: 0,
    paddingTop: 12,
    //height: 22
  },
  rightarrowtext: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    position: "absolute",
    right: 3,
    top: 16
  },
  centertext: {
    color: Colors.PrimaryColor,
    fontSize: 30,
    fontWeight: "bold",
    top: '45%',
    position: 'absolute'
  },
  covercolsinglemain: (width) => ({
    width: width,
    height: width,
    backgroundColor: Colors.white,
    alignItems: "center",
    // justifyContent: "center",
    position: "relative",
    borderRadius: 8,
    overflow: 'hidden',
  }),
  maincoverupper: { flexDirection: "row", padding: 4 },
  maingraph: {
    width: 150,
    height: 150,
    //backgroundColor: Colors.cream,
    borderBottomColor: "green",
    borderBottomWidth: 1,
  },
  innermainbg: {
    backgroundColor: Colors.PrimaryColor,
    height: 80,
    width: 15,
    position: "absolute",
    bottom: 0,
  },
  mainbg: { height: "100%", width: 15, position: "absolute", bottom: 0, backgroundColor: Colors.gray },
  maincoverbars: {
    height: "100%",
    backgroundColor: "green",
    position: "relative",
  },
  weektext: {
    fontSize: 13,
    color: Colors.black,
    opacity: 0.5,
    position: "absolute",
    bottom: -17,
    left: 0,
    right: 0,
    paddingHorizontal: 4,
  },

  mainweeks: {
    flexDirection: "row",
    height: "100%",
  },

  coverbg: { height: "100%", position: "relative", width: 20, alignItems: "center", justifyContent: "center" },
  wknam: {
    fontSize: 6,
    color: Colors.black,
    opacity: 0.5,
    paddingTop: 4,
    position: "relative",
    paddingHorizontal: 2,
    textAlign: "center", width: 20
  },
  textleft: {
    fontSize: 6,
    color: Colors.black,
    opacity: 0.5,
    // paddingTop: 4,
    position: "relative",
    //marginLeft: -8,
    // marginTop: -1,
    // zIndex: 99,
    // paddingBottom:4
  },
  fullcoversize: {
    height: "100%",
    width: 16,
    backgroundColor: "pink",
  },
  fullactualcoversize: {
    height: "50%",
    width: 16,
    backgroundColor: "black",
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
  inerprogcover: (backgroundColor) => (
    {
      height: 3,
      borderRadius: 22,
      backgroundColor: backgroundColor,
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
    }
  ),
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
  covercolsingle: (width) => ({
    width: width,
  }),

  signlecolumn: (width) => ({
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    height: width,
    alignContent: "center",
    overflow: "hidden",
  }),
  //   iconnextarrow:{alignItems:"flex-end",
  // position:"absolute",
  // right:10,
  // top:10
  // },
  iconnextarrow: { position: "absolute", right: 0 },
  simplename: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  boldname: {
    color: "#0d8dba",
    fontWeight: "bold",
    fontSize: 30,
    height: "100%",
    textAlign: "center",
    alignContent: "center",
  },
  maincovercolumns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  mainsimpleprog: { width: "100%", marginBottom: 2 },
  progheading: { fontSize: 11, marginBottom: 4, width: "100%" },
});

export default SurfStats;
