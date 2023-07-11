import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View, Text, TextInput, FlatList } from 'react-native'
import { withTheme } from "styled-components";
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const demoData = [{ label: '' }, { label: '' }, { label: '' }, { label: '' }, { label: '' }, { label: '' }, { label: '' }]
const Favorites = (props) => {
    const navigation = useNavigation();
    const [searchView, setSearchView] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState();
    const [isSearching, setIsSearching] = useState(false);
    const [data, setData] = useState([{ label: '1' }, { label: '2' }]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    }, [])

    const handleRefresh = () => {

    };


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
                            navigation.goBack(), setSearchView(true), setSearch("")
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
                        Favorites
                    </Text>

                    <TouchableOpacity
                    // onPress={() => navigation.navigate("AddProperties")}
                    // style={{
                    //   flexDirection: "row",
                    //   justifyContent: "center",
                    //   alignItems: "center",
                    //   marginRight: 10,
                    // }}
                    >
                        {/* <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: "contain",
                  tintColor: Colors.white,
                }}
                source={require("../../../assets/plus.png")}
              ></Image> */}
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        height: 80,
                        width: "100%",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        backgroundColor: Colors.PrimaryColor,
                        position: "relative",
                        zIndex: 9,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: Colors.buttonColor,
                            borderRadius: 5,
                            width: "92%",
                            height: 50,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity onPress={() => { }}>
                            <Image
                                source={require("../../../assets/search.png")}
                                style={{
                                    height: 20,
                                    width: 20,
                                    marginLeft: 10,
                                    tintColor: Colors.white,
                                }}
                            ></Image>
                        </TouchableOpacity>
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Search"
                            placeholderTextColor={Colors.white}
                            style={{
                                color: Colors.white,
                                fontSize: 15,
                                marginLeft: 10,
                            }}
                        ></TextInput>
                    </View>

                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <FlatList
                        data={isSearching ? filteredData : props.route.params.item.favdata}
                        extraData={demoData}
                        numColumns={2}
                        ListFooterComponent={() => <View style={{ height: 200 }}></View>}
                        renderItem={({ item,index }) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => { }

                                }
                                style={{
                                    height: 300,
                                    margin: "2.5%",
                                    width: "45%",
                                }}
                            >
                                <View
                                    style={{
                                        height: "70%",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image
                                        source={
                                           {uri: item.property_image[0] }
                                        }
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: 20,
                                            backgroundColor: Colors.gray,
                                        }}
                                    ></Image>
                                    {console.log(item.property_image[0])}
                                </View>
                                <View
                                    style={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.black,
                                            fontSize: 16,
                                            marginTop: 10,
                                            fontWeight: "bold",
                                        }}
                                    >
                                       { item.prop_title}
                                    </Text>
                                    <Text
                                        style={{
                                            color: Colors.black,
                                            fontSize: 12,
                                        }}
                                    >
                                        
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <View style={{ alignItems: "center", marginTop: 20 }}>
                                <Text>No data found</Text>
                            </View>
                        }
                        keyExtractor={(item) => item.id}
                        // onTouchStart={handleLoad}
                        // onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default withTheme(Favorites)
