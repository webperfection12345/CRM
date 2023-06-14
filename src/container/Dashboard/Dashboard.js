import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import RNSpeedometer from "react-native-speedometer";
import { getDashboardData } from "../../modules/getDashboardData";
import Activity from "../../components/Activity";
import { getContacts } from "../../modules/getContacts";
import { getMeterData } from "../../modules/getMeterValue";
export default function Dashboard() {
  const navigation = useNavigation();
  const [meterValue, setMeterValue] = useState();
  const [meter2Value, setMeter2Value] = useState(60);
  const [totalLeadValue, setTotalLeadValue] = useState("");
  const [underContarct, setUnderContarct] = useState("");
  const [loading, setLoading] = useState(true);

  const [soldValue, setSoldValue] = useState("");
  const [underContractValue, setUnderContarctValue] = useState("");
  const [activity, setActivity] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getDashboardDataApiCall();
    getAllContacts();
    getMeter();
  }, []);
  const getDashboardDataApiCall = () => {
    dispatch(getDashboardData()).then((response) => {
      setActivity(true);
      // setMeterValue(response.payload.data[0].under_contract_percent);
      // setMeter2Value(response.payload.data[0].sold_percent);
    });
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

  const handleRefresh = () => {
    if (!loading) {
      setLoading(true);
      getAllContacts();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <StatusBar />
      <Header label={"Dashboard"} />

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
          >
            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Current Clients Online
            </Text>
            <View
              style={{
                height: 60,
                marginTop: 20,
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <FlatList
                data={data}
                horizontal={true}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    //onPress={() => makePhoneCall()}
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: 10,
                      borderRadius: 25,
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "green",
                    }}
                  >
                    <Text style={{ fontSize: 16, color: Colors.white }}>
                      {item.contact_name.charAt(0)}
                    </Text>
                  </TouchableOpacity>
                )}
                //   keyExtractor={(item) => item.id}
                //  ItemSeparatorComponent={this.renderSeparator}
                //   key={(item) => item.id}
              />
            </View>
          </View>
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
                fontSize: 20,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              My Surf Level
            </Text>

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
                //needleImage={Images.meter}
                // wrapperStyle={}
                //outerCircleStyle={{height: 80}}
                // halfCircleStyle={}
                //imageWrapperStyle={{resizeMode: 'contain', height: 100, width: 100}}
                //innerCircleStyle={{width: 130, borderRadius: 65}}
                // labelWrapperStyle={}
                // labelStyle={}
                // labelNoteStyle={}
              />
              <Image
                style={{
                  height: 120,
                  width: 120,
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginTop: 50,
                }}
                source={require("../../../assets/fastGun.png")}
              ></Image>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 10,
                  color: Colors.black,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Fast Gun
              </Text>
            </View>
            {/* <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: Colors.gray,
                marginTop: 10,
              }}
            ></View> */}
            {/* <AnimatedCircularProgress
            size={250}
            width={25}
            fill={180}
            style={{
              transform: [{rotate: '180deg'}],
              marginTop: 20,
              borderRadius: 20,
            }}
            tintColor={Colors.PrimaryColor}
            fillLineCap="10"
            backgroundColor={Colors.buttonColor}
            arcSweepAngle={160}>
            {fill => (
              <View
                style={{
                  transform: [{rotate: '180deg'}],
                  position: 'absolute',
                  bottom: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Colors.black,
                    fontWeight: 'bold',
                    marginTop: 20,
                  }}>
                  69%
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.gray,
                  }}>
                  $506.000.00
                </Text>
              </View>
            )}
          </AnimatedCircularProgress> */}
            {/* <View
              style={{
                height: 60,
                width: "96%",
                alignSelf: "flex-end",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                backgroundColor: Colors.white,
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
                      color: Colors.gray,
                      fontSize: 16,
                    }}
                  >
                    Toatl Lead Value
                  </Text>
                  <Text
                    style={{
                      color: Colors.gray,
                      fontSize: 16,
                    }}
                  >
                    $734.000.00
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Images.mail}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: "contain",
                  }}
                ></Image>
              </TouchableOpacity>
            </View> */}
            {/* <View
              style={{
                height: 60,
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
                      color: Colors.gray,
                      fontSize: 16,
                    }}
                  >
                    Under Contract
                  </Text>
                  <Text
                    style={{
                      color: Colors.gray,
                      fontSize: 16,
                    }}
                  >
                    1
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Images.phone}
                  style={{
                    height: 40,
                    width: 40,
                    marginLeft: "5%",
                    resizeMode: "contain",
                  }}
                ></Image>
              </TouchableOpacity>
            </View> */}
            {/* <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                color: Colors.black,
                fontWeight: "bold",
              }}
            >
              Active Pipeline
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "green",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              $ 6,511,000
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Under Contract
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "green",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              $ 829,000
            </Text> */}
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: Colors.gray,
                marginTop: 10,
              }}
            ></View>
            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Document Portal
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                style={{
                  height: 120,
                  width: 120,
                  resizeMode: "contain",
                }}
                source={require("./../../assets/images/documentPortal.png")}
              ></Image>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Most Recent
            </Text>

            <FlatList
              data={data}
              scrollEnabled={false}
              style={{ width: "100%" }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ContactsDetails", { item: item })
                  }
                  style={{
                    height: 60,
                    width: "90%",
                    alignSelf: "center",
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
                      <Image
                        source={{ uri: item.contact_image }}
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 20,
                        }}
                      ></Image>
                      <Text
                        style={{
                          color: Colors.PrimaryColor,
                          fontSize: 12,
                        }}
                      >
                        {item.name}
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
                        {item.details}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={require("../../../assets/more.png")}
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: "contain",
                        }}
                      ></Image>
                      <Image
                        source={require("../../../assets/leftArrow.png")}
                        style={{
                          height: 13,
                          width: 13,
                          marginLeft: 10,
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

            {/* <View
              style={{
                marginTop: 10,
                backgroundColor: Colors.white,
                width: "100%",
              }}
            >
              <RNSpeedometer
                value={meter2Value}
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
                //needleImage={Images.meter}
                // wrapperStyle={}
                //outerCircleStyle={{height: 80}}
                // halfCircleStyle={}
                //imageWrapperStyle={{resizeMode: 'contain', height: 100, width: 100}}
                //innerCircleStyle={{width: 130, borderRadius: 65}}
                // labelWrapperStyle={}
                // labelStyle={}
                // labelNoteStyle={}
              />
            </View> */}
            <View
              style={{
                height: 100,
                width: "96%",
                alignSelf: "flex-end",
                backgroundColor: Colors.white,
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
              }}
            ></View>
          </View>
        </ScrollView>
      ) : (
        <Activity />
      )}
    </SafeAreaView>
  );
}
