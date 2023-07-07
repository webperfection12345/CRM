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
const TransactionDeskNew = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  // Get the device's screen dimensions
  const { height, width } = Dimensions.get('window');
  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setToggle(!isEnabled);
  };
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={styles.topcoverupper}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={[styles.backiconcover, { paddingLeft: 10 }]}>
          <Image
            style={[styles.backimage, { tintColor: Colors.white }]}
            source={require("../../../assets/back.png")}
          ></Image>

        </TouchableOpacity>
        <Text style={styles.transactionidtext}>
          Transaction ID: 310987
        </Text>
        <TouchableOpacity
          style={styles.plusiconcover}
        >
          <Image style={styles.plusimage}
            source={require("../../../assets/plus.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ height: "100%", flex: 1, backgroundColor: Colors.cream }}>
        <View style={{ backgroundColor: Colors.white, padding: 12, flexDirection: "row", justifyContent: "flex-start", }}>
          <View style={{ width: "33%" }}>
            <Text style={styles.username}>Jessica Kent</Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
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
          <View style={{ width: "50%" }}>
            <Text style={styles.propertytext}>Property Info</Text>
            <Text>233 Royal Palm Way
              Boca Raton, FL 33496</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 12, paddingVertical: 22, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <View style={styles.maincoverbox(width/2 - 16)}>
            <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: 12 }}>
              <View style={styles.greencover}>
                <Image style={styles.greenimage}
                  source={require("../../../assets/greenok.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Escrow Due</Text>
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
          <View style={styles.maincoverbox(width/2 - 16)}>
            <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: 12 }}>
              <View style={styles.greencover}>
                <Image style={styles.greenimage}
                  source={require("../../../assets/greenok.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Escrow Due</Text>
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
          <View style={styles.maincoverbox(width/2 - 16)}>
            <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: 12 }}>
              <View style={styles.greencover}>
                <Image style={styles.greenimage}
                  source={require("../../../assets/note.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Loan Approval Due</Text>
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
          <View style={styles.maincoverbox(width/2 - 16)}>
            <TouchableOpacity style={{ alignItems: "center", marginBottom: 12, flexDirection: "row", justifyContent: "flex-end" }}>
              <Text>DUE TODAY!</Text>
              <View style={[styles.greencover, { marginLeft: 10 }]}>

                <Image style={styles.greenimage}
                  source={require("../../../assets/yellowbell.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Appraisal Due</Text>
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
          <View style={styles.maincoverbox(width/2 - 16)}>
            <TouchableOpacity style={{ alignItems: "center", marginBottom: 5, flexDirection: "row", justifyContent: "flex-end" }}>

              <View style={styles.greencover}>

                <Image style={styles.greenimage}
                  source={require("../../../assets/Hourglass.png")}
                ></Image></View>
            </TouchableOpacity>
            <Text style={styles.namegreen}>Lien Search Due</Text>
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
    backgroundColor: Colors.white, borderRadius: 12, padding: 12,
    width: width,
    height:width,
    marginBottom: 12

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
  username: { fontSize: 14, marginBottom: 12 },
  backimagenew: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  propertytext: { fontSize: 16, marginBottom: 3, fontWeight: "bold" },
  greenimage: { height: 16, width: 16, resizeMode: "contain", alignItems: "center" },
  greencover: {
    alignItems: "center", height: 35, width: 35, borderRadius: 100, backgroundColor: Colors.white, justifyContent: "center", shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  namegreen: { fontSize: 14, marginBottom: 8, textAlign: "center" },
  timedate: { fontSize:18, fontWeight: "bold", color: "#00ff24", textAlign: "center" },
  cloudphoto: { height: 20, width: 20, resizeMode: "contain", marginHorizontal: 12 },
  cloudphoto2: { height: 25, width: 25, resizeMode: "contain", marginHorizontal: 12 }
});
