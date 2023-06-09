import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { getFavoriteProperties } from "../../modules/getFavoriteProperties";
import { getSearchProperties } from "../../modules/getSearchProperties";
import { getSearchhistory } from "../../modules/getSearchHistory";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../../components/Activity";

const PropertiesViewedByLeads = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const dispatch = useDispatch();
  const [activity, setActivity] = useState(false);
  const [searchView, setSearchView] = useState(true);
  useEffect(() => {
    getAllProperties();
    getAllHistory();
  }, []);
  const getAllProperties = () => {
    dispatch(getFavoriteProperties()).then((response) => {
      //const newData = [...data, ...response.payload];
      setData(response.payload);
      setActivity(true);
      setLoading(false);
      setIsRefreshing(false);
      setSearchView(true);
    });
  };

  const getAllHistory = () => {
    dispatch(getSearchhistory()).then((response) => {
      setHistoryData(response.payload);
    });
  };

  const handleRefresh = () => {
    if (!loading) {
      setLoading(true);
      getAllProperties();
    }
  };
  const getSearchPropertiesApiCall = () => {
    if (search != "") {
      dispatch(getSearchProperties(search)).then((response) => {
        setData(response.payload);
        setActivity(true);
      });
    } else {
      getAllProperties();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      {activity ? (
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
                source={Images.back}
              ></Image>
              <Text style={{ fontSize: 15, color: Colors.white }}>Back</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15, color: Colors.white }}>
              PropertiesViewedByLeads
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddProperties")}
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
                source={Images.plus}
              ></Image>
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
              <TouchableOpacity onPress={() => getSearchPropertiesApiCall()}>
                <Image
                  source={Images.search}
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
                value={search}
                placeholderTextColor={Colors.white}
                onTouchStart={() => setSearchView(false)}
                onChangeText={(search) =>
                  getSearchPropertiesApiCall(
                    setSearch(search),
                    setSearchView(false)
                  )
                }
                style={{
                  color: Colors.white,
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              ></TextInput>
            </View>
            {!searchView ? (
              <View
                style={{
                  height: 160,
                  width: "92%",
                  backgroundColor: Colors.white,
                  position: "absolute",
                  top: 160 / 2 - 15,
                  zIndex: 99,
                }}
              >
                <FlatList
                  data={historyData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => (
                        setSearch(item.post_title),
                        setSearchView(true),
                        getSearchPropertiesApiCall()
                      )}
                      style={{
                        height: 30,
                        width: "96%",
                        alignSelf: "center",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 14,
                        }}
                      >
                        {item.post_title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  //   keyExtractor={(item) => item.id}
                  //  ItemSeparatorComponent={this.renderSeparator}
                  //   key={(item) => item.id}
                />
              </View>
            ) : null}
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
              data={data}
              extraData={data}
              numColumns={2}
              ListFooterComponent={() => <View style={{ height: 200 }}></View>}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate("PropertiesDetails", { id: item.id })
                  }
                  style={{
                    maxHeight: 300,
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
                        item.images.large == undefined ||
                        item.images.large == ""
                          ? Images[1]
                          : { uri: item.images.large }
                      }
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 20,
                        backgroundColor: Colors.gray,
                      }}
                    ></Image>
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
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 12,
                      }}
                    >
                      $ {item.originallistprice}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              // onTouchStart={handleLoad}
              onRefresh={handleRefresh}
              refreshing={loading}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0.1}
            />
          </View>
        </View>
      ) : (
        <Activity />
      )}
    </SafeAreaView>
  );
};

export default PropertiesViewedByLeads;
