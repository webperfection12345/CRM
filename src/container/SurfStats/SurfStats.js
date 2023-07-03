import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";

const SurfStats = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setToggle(!isEnabled);
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
                  <Text style={styles.username}>Jessica Kent</Text>
                  <Text style={styles.clientid}>Client ID: 76867</Text>
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
                  <Text style={styles.boldname}>124</Text>
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
                  <Text style={styles.boldname}>8</Text>
                </View>
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
