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
  Linking,
  Platform,
  StyleSheet
} from "react-native";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { useNavigation, useIsFocused } from "@react-navigation/native";
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
  const isFocused = useIsFocused();
  const [soldValue, setSoldValue] = useState("");
  const [underContractValue, setUnderContarctValue] = useState("");
  const [activity, setActivity] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getDashboardDataApiCall();
    getAllContacts();
    getMeter();
    if (isFocused) {
      // Perform the refresh logic here
    }
  }, [isFocused]);
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
      <Header label={"Welcome John!"} />
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
            {/* <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Current Clients Online
            </Text> */}
            {/* <View
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
                    style={{
                      width: 50,
                      height: 50,
                      marginHorizontal:2,
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
              />
            </View> */}
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
                fontSize: 17,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Surf Level
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
              />
              {/* <Image
                style={{
                  height: 120,
                  width: 120,
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginTop: 50,
                }}
                source={require("../../../assets/fastGun.png")}
              ></Image> */}
              {/* <Text
                style={{
                  fontSize: 20,
                  marginTop: 10,
                  color: Colors.black,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Fast Gun
              </Text> */}
            </View>

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
                fontSize: 17,
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
                fontSize: 17,
                color: "green",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              $ 829,000
            </Text> */}
            {/* <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: Colors.gray,
                marginTop: 30,
              }}
            ></View>
            <Text
              style={{
                fontSize: 20,
                color: Colors.black,
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 15,
              }}
            >
              Document Portal
            </Text> */}
            {/* <TouchableOpacity
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
                marginTop: 30,
                marginBottom: 20,
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
                    width: "100%",
                    alignSelf: "center",
                    borderBottomColor: Colors.gray,
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    paddingHorizontal: 12,
                  }}
                >
                  <View style={{ width: 45, marginRight: 2 }}>
                    <Image
                      source={{ uri: item.contact_image }}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: Colors.gray,
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
                  <View
                    style={{
                      width: "85%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 6,
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
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        {item.contact_name}
                      </Text>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 14,
                          marginTop: 2,
                          marginLeft: 0,
                        }}
                      >
                        {item.contact_email}{" "}
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
             
            /> */}
<View style={styles.maincoverop}>
  <View style={styles.boxcover}>
    <Text style={styles.smalltext}>Opportunites</Text>
    <Text style={styles.bigtext}>142</Text>
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
            style={{ height: 40, width: 40,  resizeMode: "contain",marginVertical:6,alignItems:"center" }}
            source={require("../../../assets/menu.png")}
          ></Image>
    <Text style={styles.smalltext}>Portal</Text>
  </View>
  <View style={styles.boxcover}>
    <Text style={styles.smalltext}>Call</Text>
    <Image
            style={{ height: 40, width: 40,  resizeMode: "contain",marginVertical:6,alignItems:"center" }}
            source={require("../../../assets/menu.png")}
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
  boxcover:{
    backgroundColor:Colors.darkblue,
    height:130,
    width:130,
    marginBottom:30,
    borderRadius:100,
    alignItems:"center",
    lineHeight:130,
justifyContent:"center",
shadowColor: Colors.black,
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 2},
  shadowRadius: 10,
  elevation: 3,


  },
  maincoverop:{marginTop:50,
  marginBottom:40},
  smalltext:{color:Colors.white,fontWeight:300,fontSize:14},
  bigtext:{fontSize:28,color:Colors.white,lineHeight:60,
  fontWeight:"bold"},
});