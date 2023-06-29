import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text,StyleSheet,ScrollView } from "react-native";
import Colors from "../utils/Colors";
import Images from "../utils/Images";
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const { label, plusButton } = props;
  const navigation = useNavigation();
  return (

  
    <View
      style={{
       
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal:2,
       
        
      }}
    >
      <View style={styles.onlinepeoples}>
      <ScrollView horizontal={true} style={styles.maincent}>
      <Image
            style={styles.icons}
            source={require("../../assets/profilePic.png")}
          ></Image>
           <Image
            style={styles.icons}
            source={require("../../assets/profilePic.png")}
          ></Image>
        <Image
            style={styles.icons}
            source={require("../../assets/profilePic.png")}
          ></Image>
       <Text style={styles.noimage}>TS</Text>
      <Image
            style={styles.icons}
            source={require("../../assets/profilePic.png")}
          ></Image>
          </ScrollView>
      </View>
      
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems:"center",
          borderTopColor:"#ddd",
       borderTopWidth:1,
  
       paddingVertical:17,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ width: 50, marginLeft: 10 }}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../../assets/menublack.png")}
          ></Image>
        </TouchableOpacity>
        <Text
        allowFontScaling={false}
        style={{
          color: Colors.black,
          fontSize: 19,
          fontWeight: "bold",
         textAlign:"center"
        }}
      >
      {label} 
      </Text>
        <View style={styles.headericons}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.notificationicon}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../../assets/calender.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.notificationicon}
        >
          <Image
            style={{ height: 25, width: 25, marginLeft:12, resizeMode: "contain" }}
            source={require("../../assets/notification.png")}
          ></Image>
        </TouchableOpacity>
        </View>
      </View>
     
    </View>
  );
};
const styles = StyleSheet.create({
  headericons:{flexDirection:"row",
  alignItems:"center",
  paddingRight:12
},
// maincent:{justifyContent:"center",flex:1},
onlinepeoples:{flexDirection:"row",alignItems:"center",justifyContent:"center",paddingHorizontal:5,paddingVertical:12,
flexWrap:"wrap"
},
icons:{height:60,width:60,
  borderRadius:100,
  borderWidth:2,
  borderColor:"#00ff17",
  marginHorizontal:5
},
noimage:{height:60,width:60,
  borderRadius:100,
  borderWidth:2,
  borderColor:"#00ff17",
  marginHorizontal:5,
backgroundColor:Colors.darkblue,
color:Colors.white,
textAlign:"center",
fontWeight:"800",
lineHeight:60,
fontSize:20
}
});
export default Header;
