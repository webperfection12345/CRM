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

const Settings = () => {
  const navigation = useNavigation();

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
           Settings
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
                source={require("../../../assets/notificationwhite.png")}
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
                source={require("../../../assets/calendarwhite.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

      
          <ScrollView
            style={{lex: 1,backgroundColor: Colors.cream,width:"100%"}}>
           <View style={styles.overviewcover}>
            <Text style={styles.overviewtext}>Overview</Text>
           </View>

  <View style={styles.leadcover}>
  <Text style={styles.leadheading}>Lead Distribution</Text> 
  <View style={styles.uppercover}>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/leadsicon.png")}/><Text>Lead Flow</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/group-icon.png")}/><Text>Groups</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/ponds-icon.png")}/><Text>Ponds</Text></View>
 </View>
  </View>  

  <View style={styles.leadcover}>
 <Text style={styles.leadheading}>Follow Up</Text>
  <View style={styles.uppercover}>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/action-plans.png")}/><Text>Action Plans </Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/automation-icon.png")}/><Text>Automations</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/email-icon.png")}/><Text>Email Templates</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/text-icon.png")}/><Text>Text Templates</Text></View>
  </View>
  </View>

  <View style={styles.leadcover}>
 <Text style={styles.leadheading}>Account Info & Additions</Text>
  <View style={styles.uppercover}>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/agent-icon.png")}/><Text>Inside Agents</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/realtors.png")}/><Text>Realtors</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/corporat.png")}/><Text>Corporate</Text></View>
  </View>
  </View>

  <View style={styles.leadcover}>
 <Text style={styles.leadheading}>Tools</Text>
  <View style={styles.uppercover}>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/stages.png")}/><Text>Stages</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/tags.png")}/><Text>Tags</Text></View>
  <View style={styles.covermain}><Image style={styles.imagedes}source={require("../../../assets/scheduler.png")}/><Text>Scheduler</Text></View>
  </View>
  </View>
            
          </ScrollView>
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  threeiconmain: {
    flexDirection: "row",
    alignItems: "center",
  },
  covermain:{alignItems:"center",flexDirection:"row", backgroundColor:Colors.white, height:55, paddingHorizontal:20, borderRadius:8, marginHorizontal:3,marginBottom:6,shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,},
  overviewcover:{backgroundColor:Colors.white,textAlign:"center",paddingVertical:20,marginBottom:20,},
  overviewtext:{fontSize:16,fontWeight:"bold"},
  leadcover:{paddingHorizontal:12,marginBottom:30,},
  leadheading:{fontSize:17,paddingVertical:20,marginHorizontal:3},
  imagedes:{height: 22,width: 22,resizeMode: "contain",
  marginRight:5
  },
  uppercover:{flexDirection:"row",flexWrap:"wrap"}
});

export default Settings;
