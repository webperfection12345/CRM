import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";

import Images from "../../utils/Images";
import Colors from "../../utils/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const fontSizeRatio = screenHeight / 1000;
const viewSizeRatio = screenHeight / 1000;
const imageSizeRation = screenHeight / 1000;

const images = [
  {
    image: Images.favroites,
    title: "123 main St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "8:12 am",
  },
  {
    image: Images.favroites,
    title: "321  St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 13",
  },
  {
    image: Images.favroites,
    title: "100 Ocean St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 12",
  },
  {
    image: Images.favroites,
    title: "123 main St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "8:12 am",
  },
  {
    image: Images.favroites,
    title: "321  St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 13",
  },
  {
    image: Images.favroites,
    title: "100 Ocean St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 12",
  },
  {
    image: Images.favroites,
    title: "123 main St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "8:12 am",
  },
  {
    image: Images.favroites,
    title: "321  St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 13",
  },
  {
    image: Images.favroites,
    title: "100 Ocean St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 12",
  },
  {
    image: Images.favroites,
    title: "123 main St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "8:12 am",
  },
  {
    image: Images.favroites,
    title: "321  St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 13",
  },
  {
    image: Images.favroites,
    title: "100 Ocean St. | Boynton Beach",
    navigation:
      "Which apartment, could you send me the link plaese the one you said",
    time: "Apr 12",
  },
];

const Documents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adress, setAddres] = useState("");
  const [index, setIndex] = useState(true);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  // useEffect(() => {
  //   Orientation.lockToPortrait();
  //   return () => {
  //     Orientation.unlockAllOrientations();
  //   };
  // }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.slideOuter}>
      <TouchableOpacity
        style={{
          width: "95%",
          alignItems: "center",
          height: 60,
          borderColor: Colors.BorderColor,
          borderWidth: 1,
          borderRadius: 8,
          borderLeftWidth: index == 0 ? 4 : null,
          borderLeftColor: index == 0 ? Colors.PrimaryColor : null,
          justifyContent: "center",
          backgroundColor: index == 0 ? "#f5f9fc" : null,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "95%",
            height: 40,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginLeft: 5,
              color: Colors.textColorLight,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: Colors.textColorLight,
              position: "absolute",
              top: 0,
              right: 8,
            }}
          >
            {item.time}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "95%",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: Colors.textColorLight,
            }}
          >
            {item.navigation}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ height: "100%", width: "100%", backgroundColor: Colors.white }}
      >
        <View
          style={{
            height: 40,
            width: "100%",
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
              source={Images.back}
            ></Image>
            <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: Colors.white }}>Documents</Text>
          <View
            //onPress={() => navigation.navigate('AddContacts')}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              style={{
                height: 15,
                width: 15,
                resizeMode: "contain",
                tintColor: Colors.white,
              }}
              //source={Images.plus}
            ></Image>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            height: "100%",
            backgroundColor: Colors.white,
          }}
        >
          <FlatList
            data={images}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListFooterComponent={<View style={{ height: 50 }}></View>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PrimaryColor,
  },
  slideOuter: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pagination: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: "blue",
  },
  //fliter
  filter: {
    height: 60,
  },
});

export default Documents;
