import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { withTheme } from "styled-components";
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const SearchCreteria = (props) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.white,
                }}
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
                        onPress={() => (
                            navigation.goBack()
                        )}
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
                        ></Image>
                    </TouchableOpacity>
                    <Text
                        style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
                    >
                        Search Creteria
                    </Text>

                    <TouchableOpacity
                    >
                    </TouchableOpacity>
                </View>
                <View style={{padding:16}}>
                    <FlatList
                        data={props.route.params.item.criteria_data}
                        style={{ width: "100%", paddingTop: 16, height: "auto" ,marginBottom:50}}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.mainsimpleprog}>
                                    <Text style={styles.progheading}>{item.search_name}</Text>
                                    <View style={styles.progresscover}>
                                        <View
                                            style={[styles.inerprogcover(item.search_count >= 60 ? '#2bbcee' : item.search_count < 60 && item.search_count > 25 ? '#EBA029' : item.search_count <= 25 ? '#DA6576' : '#2bbcee'), { width: (100 * item.search_count) / props.route.params.item.Criteria_Max + "%" }]}
                                        ></View>
                                    </View>
                                    <Text style={styles.progresstext}>{item.search_count}</Text>
                                </View>
                            )
                        }}>
                    </FlatList>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default withTheme(SearchCreteria)

const styles = StyleSheet.create({
    mainsimpleprog: { width: "100%", marginBottom: 2 },
    progheading: { fontSize: 11, marginBottom: 4, width: "100%" },
    progresscover: {
        width: "100%",
        height: 3,
        borderRadius: 22,
        backgroundColor: Colors.cream,
        position: "relative",
      },
      inerprogcover: (backgroundColor) => (
        {
          height: 3,
          borderRadius: 22,
          backgroundColor: backgroundColor,
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
        }
      ),
      progresstext: {
        textAlign: "right",
        fontSize: 7,
        marginTop: 4,
        color: "#979897",
      },
})