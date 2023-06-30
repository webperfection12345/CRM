import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Switch,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const SingleClientDetail = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setToggle(!isEnabled);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
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
            Jessica Kent
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
                    source={require("../../../assets/1.jpg")}
                  />
                  <Text style={styles.onlinedot}></Text>
                </View>
                <View style={styles.clientinformationinner}>
                  <Text style={styles.username}>Jessica Kent</Text>
                  <Text style={styles.phonenumber}>323-6556-6565</Text>
                  <Text style={styles.clientid}>Client ID: 76867</Text>
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
                <TouchableOpacity style={styles.iconcover}>
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
                <TouchableOpacity style={styles.iconcover}>
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
                <TouchableOpacity style={styles.iconcover}>
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
                <Text style={styles.boldphone}> Phone: </Text>(305) 824-5549
              </Text>
            </View>
            <View style={styles.pendingdetail}>
              <Text style={styles.phonenumber}>
                <Text style={styles.boldphone}> Email: </Text>jkent@habitat.org
              </Text>
            </View>
            <View style={styles.pendingdetailaddress}>
              <Text style={styles.boldphoneadd}> Main Address: </Text>
              <Text style={styles.phonenumberadd}>
                302 Delaware Rd. Smallville, KS 58123 302 Delaware Rd.
                Smallville, KS 58123
              </Text>
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
              <Text style={styles.transactionheading}>Transactions</Text>
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
                  047 Jefferson Street City Kettlersville 047 Jeffe St. City
                  Kettlersville
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
                  047 Jefferson Street City Kettlersville 047 Jeffe St. City
                  Kettlersville
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
                  047 Jefferson Street City Kettlersville 047 Jeffe St. City
                  Kettlersville
                </Text>
              </View>
            </View>
            <View style={styles.transactionmaindis}>
              <Text style={styles.transactionheading}>Dispositions</Text>
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
                <Text style={styles.activityheading}>Last Activity</Text>
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
                <Text style={styles.activityheading}>ChatGPT Handoff</Text>
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
                <Text style={styles.activityheading}>Last Activity</Text>
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
                <Text style={styles.activityheading}>ChatGPT Handoff</Text>
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
                <Text style={styles.bigtextone}>Start Transactions</Text>
              </View>
            </View>
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
export default SingleClientDetail;
