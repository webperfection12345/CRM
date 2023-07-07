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

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../utils/Colors";
import { Switch } from 'react-native-switch';

const Client = () => {
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        setToggle(!isEnabled);
      };
 
    return(
<SafeAreaView style={{ backgroundColor:Colors.gray, height:"100%",alignItems:"center",justifyContent:"center"}}>

<ScrollView style={{paddingHorizontal: 16,height:"100%",}}>
                    <View style={styles.topmain}>
                    <View style={styles.maincover}>
                        <View style={styles.mainco}>
                            <Text style={styles.mainclient}>Client</Text>
                            <Image
                            style={{
                              height: 20,
                              width: 20,
                              resizeMode: "contain",
                              position:"absolute",
                              right:0
                            }}
                source={require("../../../../assets/arrownext.png")}
              ></Image>
                        </View>
                        <View style={styles.clientinformation}>
                       <View style={{flexDirection:"row",alignItems:"center",width:"100%",alignItems:"center"}}> 
                        <View style={styles.imagewithdot}>
                            <View>
                        <Image
                            style={{
                              height: 100,
                              width: 100,
                              resizeMode: "cover",
                              borderRadius: 100,
                              borderColor:Colors.PrimaryColor,
                              borderWidth:1
                            }}
                source={require("../../../../assets/user.png")}
              ></Image>
                          <Text style={styles.onlinedot}></Text></View>
                        </View>
                        <View style={{height:30,width:70,borderRadius:20,position:"absolute",right:0}}>
                          <Switch
                            activeText='Loan'
                            inActiveText="Cash"
                            outerCircleStyle={{ width: 40 }}
                            switchRightPx={60}
                            backgroundActive={Colors.PrimaryColor}
                            backgroundInactive={Colors.boderColor}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            // value={isEnabled}

                          />
                          </View>
                          </View>
                          
                        <View style={styles.clientinformationinner}>
                         <Text style={styles.useername}> jessica Kent </Text>
                          <Text style={styles.useername}> 334343423423423423
                          </Text>
                         
                        </View>
                      </View>

                     
                    </View>
                    <View style={styles.informationicons}>
                      <View style={styles.maininfoicons}>
                        <TouchableOpacity
                          style={styles.iconcover} >
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../../assets/whitecall.png")}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.iconcover}>
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../../assets/messengerwhite.png")}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconcover}>
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../../assets/paperwhite.png")}
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
                            source={require("../../../../assets/videowhite.png")}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconcover}
                        >
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              resizeMode: "contain",
                              tintColor: Colors.white,
                            }}
                            source={require("../../../../assets/pencilwhite.png")}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    </View>
                   
                  
                  </ScrollView>
      </SafeAreaView>

    )
}
export default Client;
const styles = StyleSheet.create({
    clientinformation: { flexDirection: "column", alignItems: "center" },
    imagewithdot: { position: "relative",marginBottom:12,width:"100%",alignItems:"center"},
    informationicons: { alignItems: "center", marginBottom: 25 },
    maininfoicons: { flexDirection: "row", alignItems: "center" },  iconcover: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2,
        backgroundColor: Colors.PrimaryColor,
        height: 48,
        width: 48,
        borderRadius: 100,
      },
      mainco:{alignItems:"center",flexDirection:"row",justifyContent:"center",position:"relative"},
      clientinformationinner:{textAlign:"center",justifyContent:"center",marginBottom:6},
      useername:{textAlign:"center",paddingBottom:6,fontSize:15,fontWeight:300},
      onlinedot: {
        height: 15,
        width: 15,
        backgroundColor: "#08d007",
        borderRadius: 100,
        left: -1,
        top: 10,
        position: "absolute",
      },
      mainclient:{fontSize: 19, paddingVertical:12,fontWeight:"800"},
      topmain:{backgroundColor:Colors.white,padding:12,borderRadius:12,alignItems:"center",justifyContent:"center",
       marginVertical:12
    }
});