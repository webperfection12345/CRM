import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList
} from "react-native";
import Colors from "../../utils/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const tablists = [
  {
    label: 'Client'
  },
  {
    label: 'Disposition Log'
  },
  {
    label: 'Live Chat'
  },
  {
    label: 'Assigned Realtor'
  },
  {
    label: 'Scripts'
  },
]
const CallCenter = () => {
  const navigation = useNavigation();
    return(
<SafeAreaView style={{ flex: 1, height: "100%" ,backgroundColor:Colors.gray}}>
      {/* <View style={styles.headermain}>
        <View style={styles.leftheader}>
      <Text style={styles.questext}>In Queue</Text>
      <View style={styles.whitephone}>
      <Image style={styles.iconsmain}
            source={require("../../../assets/callblack.png")}
          ></Image>
         <Text style={styles.textcall}>Phone</Text>
        <Text>0</Text>
      </View>
    <View style={styles.whitephone}>
      <Image style={styles.iconsmain} 
            source={require("../../../assets/blackchat.png")}
          ></Image>
          <Text style={styles.textcall}>Call</Text>
        <Text>4</Text>
          </View>
          </View>
         <Text style={styles.centertext}>Call Center</Text>

          <View styles={styles.covericons}>
         <TouchableOpacity>
          <Image style={styles.plusimage}
            source={require("../../../assets/notificationwhite.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.plusimage}
            source={require("../../../assets/notificationwhite.png")}
          ></Image>
        </TouchableOpacity>
        </View>
        
      </View> */}
      <ScrollView>
      <FlatList style={styles.maincoverup}
                          data={tablists}
                          renderItem={(item, index) => {
                            return (
                              <View style={styles.maincoverop}>
                                <TouchableOpacity
                                  style={styles.boxcover}
                                  onPress={() => navigation.navigate("Client")}
                                >
                                  <Text style={styles.bigtextone}>{item.item.label}</Text>
                                </TouchableOpacity>
                              </View>
                            )
                          }}></FlatList>
                     
      </ScrollView>
      </SafeAreaView>

    )
}
export default CallCenter;
const styles = StyleSheet.create({
  headermain:{flexDirection:"row",justifyContent:"space-between",backgroundColor:Colors.PrimaryColor,alignItems:"center",
paddingHorizontal:12,paddingVertical:6},
leftheader:{alignItems:"center",flexDirection:"row"},
questext:{color:Colors.white,fontSize:12,},
whitephone:{backgroundColor:Colors.white,borderRadius:5,alignItems:"center",justifyContent:"center",paddingHorizontal:4,paddingVertical:5,margin:3,width:40
},
iconsmain:{width:13,height:13},
centertext:{fontSize: 15, fontWeight: "bold", color: Colors.white },
plusimage: {
  height: 15,
  width: 15,
  resizeMode: "contain",
  tintColor: Colors.white,
},
covericons:{flexDirection:"row",alignItems:"center"},
textcall:{fontSize:12},
maincoverop:{padding:17,backgroundColor:Colors.white,marginBottom:12,borderRadius:5},
maincoverup:{marginTop:15,marginHorizontal:12},
bigtextone:{fontSize:15}
});