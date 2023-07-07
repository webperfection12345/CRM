import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Colors from "../../utils/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const CallCenter = () => {
    return(
<SafeAreaView style={{ flex: 1, height: "100%" ,backgroundColor:Colors.gray}}>
      <View style={styles.headermain}>
        <View style={styles.leftheader}>
      <Text style={styles.questext}>In Queue</Text>
      <View style={styles.whitephone}>
      <Image style={styles.iconsmain}
            source={require("../../../assets/callblack.png")}
          ></Image>
        <Text>Phone</Text>
        <Text>0</Text>
      </View>
    <View style={styles.whitephone}>
      <Image style={styles.iconsmain} 
            source={require("../../../assets/blackchat.png")}
          ></Image>
          <Text>Call</Text>
        <Text>4</Text>
          </View>
          </View>
         <Text style={styles.centertext}>Call Center</Text>
         <View>
          <View styles={styles.covericons}>
         <TouchableOpacity
          style={styles.plusiconcover}
        >
          <Image style={styles.plusimage}
            source={require("../../../assets/notificationwhite.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.plusiconcover}
        >
          <Image style={styles.plusimage}
            source={require("../../../assets/notificationwhite.png")}
          ></Image>
        </TouchableOpacity>
        </View>
         </View>
      </View>
      </SafeAreaView>

    )
}
export default CallCenter;
const styles = StyleSheet.create({
  headermain:{flexDirection:"row",justifyContent:"space-between",backgroundColor:Colors.PrimaryColor,alignItems:"center",
paddingHorizontal:12,paddingVertical:6},
leftheader:{alignItems:"center",flexDirection:"row"},
questext:{color:Colors.white,fontSize:14,},
whitephone:{backgroundColor:Colors.white,borderRadius:5,alignItems:"center",justifyContent:"center",paddingHorizontal:8,paddingVertical:5,margin:3,width:40
},
iconsmain:{width:15,height:15},
centertext:{fontSize: 19, fontWeight: "bold", color: Colors.white },
plusimage: {
  height: 17,
  width: 17,
  resizeMode: "contain",
  tintColor: Colors.white,
},
covericons:{flexDirection:"row",alignItems:"center"}
});