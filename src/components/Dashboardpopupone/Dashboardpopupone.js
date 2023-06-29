
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
   Image,
StyleSheet
} from "react-native";

import Colors from "../../utils/Colors";

export default function Dashboard() {

  return (
    <SafeAreaView style={{ flex: 1,  }}>
      
        <ScrollView
          style={{
            backgroundColor: Colors.cream
          }}
        >
          <View
            style={{
              marginTop: 10,
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
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
              Your Surf Level
            </Text>

            <View
              style={{
                //marginTop: 10,
             justifyContent:"center",
             alignItems:"center",
                width: "100%",
              }}
            >
 <View><Image
                style={{
                  height: 120,
                  width: 150,
              resizeMode:"contain",
              alignItems:"center",
              justifyContent:"center"
                }}
                source={require("../../../assets/level1.png")}
              ></Image> 
              </View>
          <Image
                style={{
                  height: 150,
                  width: 200,
                  resizeMode: "contain",
                  alignSelf: "center",
                  marginTop: 20,
                }}
                source={require("../../../assets/grommet.png")}
              ></Image> 
         <Text
                style={{
                  fontSize: 30,
                  marginTop: 25,
                  color: Colors.black,
                  fontWeight: "bo400ld",
                  alignSelf: "center",
                  width:"100%",
                  textAlign:"center"
                }}
              >
               Grommet
              </Text> 
            </View>
<View style={styles.covermainpopup}>
    <View style={styles.mainview}>
    <Text style={styles.popupdes}>You are only 5 points away from the</Text>
        <Text style={styles.popbigtext}>BIG CAHOUNA</Text>
     <Text style={styles.popupdesdown}>Here are 3 tips to get you the fast!</Text>
     </View>
       <View style={styles.manimag}>
        <Image
                style={{
                  height: 250,
                  width: "100%",
                  resizeMode: "contain",
                  alignSelf: "flex-start",
                  marginTop: 50,
                  justifyContent:"flex-start",
                  marginRight:12,
                  alignItems:"flex-start",
                 position:"absolute",
                 top:-80
                }}
                source={require("../../../assets/rightman.png")}
              ></Image> 
              </View>
           
          </View>
          </View>
        </ScrollView>
 
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    manimag:{ 
        alignSelf: "flex-end",
        justifyContent:"flex-end",
        alignItems:"flex-end",
        height: 200,
        width: "25%",    
    },
    covermainpopup:{
      alignItems:"flex-start",
      flexDirection:"row" ,
      paddingHorizontal:12, 
      justifyContent:"space-between",
      width:"100%",
      marginVertical:22
    },
    mainview:{
    textAlign:"center",
width:"75%",
lineHeight:40,
paddingRight:12,
backgroundColor:Colors.white,
borderRadius:12,
paddingHorizontal:12,
paddingVertical:8
},
    popbigtext:{
textAlign:"center",
fontSize:15,
paddingVertical:5,
fontWeight:"bold"
},
popupdes:{fontSize:13,textAlign:"center",},
popupdesdown:{fontSize:13,
textAlign:"center"
},
});