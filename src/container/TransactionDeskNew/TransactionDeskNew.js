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
import { Dimensions } from 'react-native';
import { Switch } from 'react-native-switch';

const TransactionDeskNew = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);

  const navigation = useNavigation();
  // Get the device's screen dimensions
  const { height, width } = Dimensions.get('window');
  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setToggle(!isEnabled);
  };

  const [toggle1, setToggle1] = useState(false);
  const toggleSwitch1 = () => {
    setIsEnabled1((previousState) => !previousState);
    setToggle1(!isEnabled);
  };
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={styles.topcoverupper}>
        <TouchableOpacity onPress={() => navigation.navigate("Contact")} style={[styles.backiconcover, { paddingLeft: 10 }]}>
          <Image
            style={[styles.backimage, { tintColor: Colors.white }]}
            source={require("../../../assets/back.png")}
          ></Image>

        </TouchableOpacity>
        <View>
        <Text style={styles.username}>Jessica Kent</Text>
        <Text style={styles.transactionidtext}>
          Transaction ID: 310987
        </Text>
        </View>
       
        <TouchableOpacity
          style={styles.plusiconcover}
          onPress={()=>{
            navigation.navigate("TransactionDesk")
          }}
        >
          <Image style={styles.plusimage}
            source={require("../../../assets/plus.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ height: "100%", flex: 1, backgroundColor: Colors.cream }}>
        <View style={{ backgroundColor: Colors.white, padding: 12, flexDirection: "row", justifyContent: 'space-between', }}>
        <View style={{ width: "40%" }}>
            <Text style={styles.propertytext}>Property Info</Text>
            <Text>233 Royal Palm Way
              Boca Raton, FL 33496</Text>
          </View>
          <View>
          <View style={{ height: 30, width: 70, borderRadius: 20, backgroundColor: isEnabled ? Colors.PrimaryColor : Colors.boderColor }}>
            
            <Switch
               activeText='Loan'
               inActiveText="Cash"
               outerCircleStyle={{ width: 50 }}
               switchRightPx={60}
               backgroundActive={Colors.PrimaryColor}
               backgroundInactive={Colors.boderColor}
               thumbColor={"#f4f3f4"}
               ios_backgroundColor="#3e3e3e"
               onValueChange={toggleSwitch}
               value={isEnabled}
 
             />
           </View>
           <View style={{ height: 30, width: 70, borderRadius: 20, backgroundColor: isEnabled1 ? Colors.PrimaryColor : Colors.boderColor ,marginTop:5}}>
            
           <Switch
              activeText='Buyer'
              inActiveText="Seller"
              outerCircleStyle={{ width: 50 }}
              switchRightPx={60}
              backgroundActive={Colors.PrimaryColor}
              backgroundInactive={Colors.boderColor}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabled1}

            />
          </View>
          </View>

          <View style={{ width: "33%" }}>
            
            <View style={{ flexDirection: "row", justifyContent: "flex-end",marginTop:16}}>
              <TouchableOpacity style={styles.backiconcover}>
                <Image
                  style={styles.backimagenew}
                  source={require("../../../assets/callblack.png")}
                ></Image>

              </TouchableOpacity>
              <TouchableOpacity style={styles.backiconcover}>
                <Image
                  style={styles.backimagenew}
                  source={require("../../../assets/blackchat.png")}
                ></Image>

              </TouchableOpacity>
              <TouchableOpacity style={styles.backiconcover}>
                <Image
                  style={styles.backimagenew}
                  source={require("../../../assets/blackmeasg.png")}
                ></Image>

              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        <View style={{ paddingHorizontal: 12, paddingVertical: 22, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <View style={styles.maincoverbox(width / 2 - 16)}>
            <TouchableOpacity style={{ position: "absolute", top: 8, right: 8 }}>
              <View style={styles.greencover}>
                <Image style={styles.greenimage}
                  source={require("../../../assets/greenok.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Escrow Due</Text>
            <Text style={styles.namegreen}>RX number</Text>
            <Text style={styles.timedate}>06.05.23</Text>
            <View style={styles.maincobvericons}>
              <TouchableOpacity><Image style={styles.cloudphoto2}
                source={require("../../../assets/cloud.png")}
              ></Image>
              </TouchableOpacity>
              <TouchableOpacity><Image style={styles.cloudphoto}
                source={require("../../../assets/plan.png")}
              ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.maincoverbox(width / 2 - 16)}>
            <TouchableOpacity style={{ position: "absolute", top: 8, right: 8 }}>
              <View style={styles.greencover}>
                <Image style={styles.greenimage}
                  source={require("../../../assets/greenok.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Escrow Due</Text>
            <Text style={styles.namegreen}>RX number</Text>
            <Text style={styles.timedate}>06.05.23</Text>
            <View style={styles.maincobvericons}>
              <TouchableOpacity><Image style={styles.cloudphoto2}
                source={require("../../../assets/cloud.png")}
              ></Image>
              </TouchableOpacity>
              <TouchableOpacity><Image style={styles.cloudphoto}
                source={require("../../../assets/plan.png")}
              ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.maincoverbox(width / 2 - 16)}>
            <TouchableOpacity style={{ position: "absolute", top: 8, right: 8 }}>
              <View style={styles.greencover}>
                <Image style={styles.greenimage}
                  source={require("../../../assets/note.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Loan Approval Due</Text>
            <Text style={styles.namegreen}>RX number</Text>
            <Text style={[styles.timedate, { color: "red" }]}>06.08.23</Text>
            <View style={styles.maincobvericons}>
              <TouchableOpacity><Image style={styles.cloudphoto2}
                source={require("../../../assets/cloud.png")}
              ></Image>
              </TouchableOpacity>
              <TouchableOpacity><Image style={styles.cloudphoto}
                source={require("../../../assets/plan.png")}
              ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.maincoverbox(width / 2 - 16)}>
            {/* <Text style={{textAlign:"center",justifyContent:"center"}}>DUE TODAY!</Text> */}
            <TouchableOpacity style={{ position: "absolute", top: 8, right: 8 }}>

              <View style={[styles.greencover, {}]}>

                <Image style={styles.greenimage}
                  source={require("../../../assets/yellowbell.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Appraisal Due</Text>
            <Text style={styles.namegreen}>RX number</Text>
            <Text style={[styles.timedate, { color: "#ffd200" }]}>06.15.23</Text>
            <View style={styles.maincobvericons}>
              <TouchableOpacity><Image style={styles.cloudphoto2}
                source={require("../../../assets/cloud.png")}
              ></Image>
              </TouchableOpacity>
              <TouchableOpacity><Image style={styles.cloudphoto}
                source={require("../../../assets/plan.png")}
              ></Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.maincoverbox(width / 2 - 16)}>
            <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: 12, position: "absolute", top: 8, right: 8 }}>

              <View style={styles.greencover}>

                <Image style={styles.greenimage}
                  source={require("../../../assets/Hourglass.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Lien Search Due</Text>
            <Text style={styles.namegreen}>RX number</Text>
            <Text style={[styles.timedate, { color: "#ffd200" }]}>06.20.23</Text>
            <View style={styles.maincobvericons}>
              <TouchableOpacity><Image style={styles.cloudphoto2}
                source={require("../../../assets/cloud.png")}
              ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionDeskNew;


const styles = StyleSheet.create({
  plusiconcover: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: Colors.white,
    height: 40,
    width: 40,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  backimage: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  maincobvericons: { justifyContent: "center", flexDirection: "row", width: "100%", alignItems: "center", paddingVertical: 10 },
  maincoverbox: width => ({
    backgroundColor: Colors.white, borderRadius: 12,
    // padding: 12,
    width: width,
    height: width,
    marginBottom: 12,
    justifyContent: "center"
  }), //width: width - 200,},
  plusimage: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    tintColor: Colors.black,
  },
  transactionidtext: { fontSize: 19, fontWeight: "bold", color: Colors.white },
  backiconcover: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  topcoverupper: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.PrimaryColor,
  },
  username: { fontSize: 14,textAlign:'center',color:'white'},
  backimagenew: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  propertytext: { fontSize: 16, marginBottom: 3, fontWeight: "bold" },
  greenimage: { height: 12, width: 12, resizeMode: "contain", alignItems: "center" },
  greencover: {
    alignItems: "center", height: 30, width: 30, borderRadius: 100, backgroundColor: Colors.white, justifyContent: "center", shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  namegreen: { fontSize: 14, marginBottom: 8, textAlign: "center" },
  timedate: { fontSize: 18, fontWeight: "bold", color: "#00ff24", textAlign: "center" },
  cloudphoto: { height: 20, width: 20, resizeMode: "contain", marginHorizontal: 12 },
  cloudphoto2: { height: 25, width: 25, resizeMode: "contain", marginHorizontal: 12 }
});