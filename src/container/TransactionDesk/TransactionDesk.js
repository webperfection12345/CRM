import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Switch,
} from "react-native";
import Checkbox from "expo-checkbox";
import Colors from "../../utils/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useIsFocused } from "@react-navigation/native";
const TransactionDesk = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setToggle(!isEnabled);
  };
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View
        style={{
          height: 60,
          paddingLeft:16,
          paddingRight:16,
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
          {/* <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text> */}
        </TouchableOpacity>
        <Text style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}>
          Transaction Desk
        </Text>
       

          <TouchableOpacity
            onPress={() => { }}
          >
            <Image
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                tintColor: Colors.white,
              }}
              source={require("../../../assets/plus.png")}
            />
          </TouchableOpacity>
      </View>
      <View
        style={{
          height: 80,
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: Colors.PrimaryColor,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.buttonColor,
            borderRadius: 5,
            width: "92%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              marginLeft: 10,
              height: 20,
              width: 20,
              resizeMode: "contain",
              tintColor: Colors.white,
            }}
            source={require("../../../assets/search.png")}
          />

          <TextInput
            allowFontScaling={false}
            placeholder="Search"
            placeholderTextColor={Colors.white}
            style={{
              color: Colors.white,
              fontSize: 15,
              marginLeft: 10,
              marginHorizontal: 10,
              height: "100%",
              width: "100%",
            }}
          />
        </View>
      </View>
      <ScrollView style={{ height: "100%", flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            height: "100%",
          }}
        >
          <View style={styles.maincover}>
            <View style={styles.firstcolnew}>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Activities</Text>
                </View>
                <View style={styles.activitycover}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#576ebd" : undefined}
                  />
                  <Image
                    source={require("../../../assets/share.png")}
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 12,
                      resizeMode: "contain",
                    }}
                  ></Image>
                  <Text style={styles.activityname}>Escrow Due</Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <View style={styles.mainheadingend}>
                  <Text style={styles.mainheadinginner}>Due Dates</Text>
                </View>
                <View style={styles.activitycoverone}>
                  <Text style={styles.activitydate}>4/04/2023 </Text>
                </View>
              </View>
            </View>
            <View style={styles.firstcol}>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Action</Text>
                </View>
                <View style={styles.activitycover}>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Preview</Text>
                </View>
                <View style={styles.activitycover}>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <Text style={styles.mainheadinginner}></Text>
                <View style={styles.activitycover}>
                  <Text style={styles.activityiconstoggle}>
                    <Switch
                      style={styles.mainbt}
                      trackColor={{ false: "#767577", true: "#576ebd" }}
                      thumbColor={"#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.maincover}>
            <View style={styles.firstcolnew}>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Activities</Text>
                </View>
                <View style={styles.activitycover}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#576ebd" : undefined}
                  />
                  <Image
                    source={require("../../../assets/share.png")}
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 12,
                      resizeMode: "contain",
                    }}
                  ></Image>
                  <Text style={styles.activityname}>Loan Approval Due</Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <View style={styles.mainheadingend}>
                  <Text style={styles.mainheadinginner}>Due Dates</Text>
                </View>
                <View style={styles.activitycoverone}>
                  <Text style={styles.activitydatered}>4/04/2023</Text>
                  <Text style={styles.activitydatered}>OVERDUE</Text>
                </View>
              </View>
            </View>
            <View style={styles.firstcol}>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Action</Text>
                </View>
                <View style={styles.activitycover}>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Preview</Text>
                </View>
                <View style={styles.activitycover}>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <Text style={styles.mainheadinginner}></Text>
                <View style={styles.activitycover}>
                  <Text style={styles.activityiconstoggle}>
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
            </View>
          </View>
          <View style={styles.maincover}>
            <View style={styles.firstcolnew}>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Activities</Text>
                </View>
                <View style={styles.activitycover}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#576ebd" : undefined}
                  />
                  <Image
                    source={require("../../../assets/share.png")}
                    style={{
                      height: 30,
                      width: 30,
                      marginLeft: 12,
                      resizeMode: "contain",
                    }}
                  ></Image>
                  <Text style={styles.activityname}>Appraisal Due</Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <View style={styles.mainheadingend}>
                  <Text style={styles.mainheadinginnerend}>Due Dates</Text>
                </View>
                <View style={styles.activitycoverone}>
                  <Text style={styles.activitydateyellow}>4/04/2023</Text>
                  <Text style={styles.activitydateyellow}>DUE TOMORROW</Text>
                </View>
              </View>
            </View>
            <View style={styles.firstcol}>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Action</Text>
                </View>
                <View style={styles.activitycover}>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}>Preview</Text>
                </View>
                <View style={styles.activitycover}>
                  <Text style={styles.activityicons}>
                    <Image
                      source={require("../../../assets/share.png")}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                      }}
                    ></Image>
                  </Text>
                </View>
              </View>
              <View style={styles.maincolumn}>
                <View style={styles.mainheading}>
                  <Text style={styles.mainheadinginner}></Text>
                </View>
                <View style={styles.activitycover}>
                  <Text style={styles.activityiconstoggle}>
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
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionDesk;

const styles = StyleSheet.create({
  maincover: {
    paddingHorizontal: 12,
    paddingTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    paddingBottom: 12,
    //height:"100%"
  },

  activitycover: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  activitycoverred: {
    flexDirection: "column",
    height: 40,
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
  },

  activityname: { marginLeft: 7, fontSize: 14, marginTop: -5 },
  activitydate: {
    textAlign: "right",
    alignItems: "flex-end",
    fontSize: 13,
    color: "green",
  },
  mainheadinginnerend: {
    fontWeight: "bold",
    fontSize: 16,
    //marginRight:-20,
    textAlign: "right",
    alignItems: "flex-end",
    //position:"relative",
    //left:27
  },
  activitydatered: {
    textAlign: "right",
    alignItems: "flex-end",
    fontSize: 13,
    color: "red",
    //position:"relative",
    //left:4
  },
  firstcol: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  firstcolnew: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
  },
  mainheadinginner: { fontWeight: "bold", fontSize: 16 },
  activityicons: { marginRight: 6, height: 40, marginTop: 6 },
  maincolumn: {
    paddingRight: 12,
    marginBottom: 12,

    justifyContent: "flex-end",
    textAlign: "right",
  },

  activitydateyellow: {
    textAlign: "right",
    alignItems: "flex-end",
    fontSize: 13,
    color: "orange",
  },
  // activityiconstoggle: { marginTop: 12, marginRight: 6 },
  mainheading: {
    alignItems: "flex-start",
  },
  activitycoverone: { marginTop: 10 },
  activitycover: { marginTop: 10, flexDirection: "row", alignItems: "center" },
});
