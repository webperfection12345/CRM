import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";

import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { getFavoriteProperties } from "../../modules/getFavoriteProperties";
import { getSearchProperties } from "../../modules/getSearchProperties";
import { useSelector, useDispatch } from "react-redux";

const PropertiesFavorites = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProperties();
  }, []);
  const getAllProperties = () => {
    dispatch(getFavoriteProperties()).then((response) => {
      setdata(response.payload);
    });
  };

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      setPage(page + 1);
      getAllProperties();
    }
  };
  const getSearchPropertiesApiCall = (search) => {
    if (search != "") {
      dispatch(getSearchProperties(search)).then((response) => {
        setdata(response.payload);
      });
    } else {
      getAllProperties();
    }
  };
  return (
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
        <Text style={{ fontSize: 15, color: Colors.white }}>
          Favorites Properties
        </Text>
        <TouchableOpacity
          //onPress={() => navigation.navigate('AddProperties')}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          {/* <Image
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              tintColor: Colors.white,
            }}
            source={Images.plus}></Image> */}
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          height: 80,
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.PrimaryColor,
        }}>
        <View
          style={{
            backgroundColor: Colors.buttonColor,
            borderRadius: 5,
            width: '92%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.search}
            style={{
              height: 20,
              width: 20,
              marginLeft: 10,
              tintColor: Colors.white,
            }}></Image>
          <TextInput
            allowFontScaling={false}
            placeholder="Search"
            placeholderTextColor={Colors.white}
            onChangeText={search => getSearchPropertiesApiCall(search)}
            style={{
              color: Colors.white,
              fontSize: 18,
              marginLeft: 10,
              fontWeight: 'bold',
            }}></TextInput>
        </View>
      </View> */}

      <View style={{ justifyContent: "space-between" }}>
        <FlatList
          data={data}
          numColumns={2}
          ListFooterComponent={() => <View style={{ height: 200 }}></View>}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate("PropertiesDetails", { id: item.id })
              }
              style={{
                height: 250,
                margin: "2.5%",
                width: "45%",
              }}
            >
              <View
                style={{
                  height: "75%",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    item.images.large == undefined || item.images.large == ""
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
                  height: 80,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 16,
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
          //onRefresh={handleRefresh}
          // refreshing={loading}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

export default PropertiesFavorites;
