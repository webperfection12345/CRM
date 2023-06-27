import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as DocumentPicker from "expo-document-picker";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import Images from "../../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { getContacts } from "../../modules/getContacts";
import { useSelector, useDispatch } from "react-redux";
import Activity from "../../components/Activity";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const Contacts = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState();
  const menuRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllContacts();
  }, []);

  const searchFilter = (text) => {
    setSearchText(text);
    const filteredItems = data.filter((item) =>
      item.contact_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
    setIsSearching(true);
  };

  const getAllContacts = () => {
    dispatch(getContacts()).then((response) => {
      const contactsData = response.payload.data;
      setData(Object.values(contactsData));
      setLoading(false);
    });
  };

  const handleRefresh = () => {
    if (!loading) {
      setLoading(true);
      getAllContacts();
    }
  };

  const handleMenuItemSelect = (item) => {
    // Handle menu item selection
    switch (item) {
      case "Import Contacts":
        handleImportPDF();
        break;
      case "Export Contacts":
        handleExportPDF();
        break;
      case "User Agreements":
        // Handle User Agreements
        break;
      case "Pay History":
        // Handle Pay History
        break;
      case "Reports":
        // Handle Reports
        break;
      case "Disclosures":
        // Handle Disclosures
        break;
      default:
        break;
    }

    setMenuVisible(false);
  };

  // ...

  const handleExportPDF = async () => {
    try {
      // Fetch the API data

      // Create an HTML template with the API data
      const htmlTemplate = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          <h1>Contact Data</h1>
          ${data
            .map(
              (contact) => `
                <div>
                  <p><strong>Contact Name:</strong> ${contact.contact_full_name}</p>
                  <p><strong>Contact Email:</strong> ${contact.contact_email}</p>
                  <p><strong>Contact Number:</strong> ${contact.contact_number}</p>
                  <p><strong>Linked Lead:</strong> ${contact.linked_lead}</p>
                </div>
              `
            )
            .join("")}
        </body>
      </html>
    `;

      // Create a temporary HTML file
      const htmlFileUri = `${FileSystem.cacheDirectory}contact_data.html`;
      await FileSystem.writeAsStringAsync(htmlFileUri, htmlTemplate, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Generate a PDF file
      const pdfFileUri = `${FileSystem.cacheDirectory}contact_data.pdf`;
      await Print.printToFileAsync({
        html: htmlFileUri,
        width: 612,
        height: 792,
        base64: false,
        filePath: pdfFileUri,
      });

      // Share the PDF file
      await Sharing.shareAsync(pdfFileUri, {
        mimeType: "application/pdf",
        dialogTitle: "Export PDF",
      });

      // Delete the temporary files
      await FileSystem.deleteAsync(htmlFileUri, { idempotent: true });
      await FileSystem.deleteAsync(pdfFileUri, { idempotent: true });
    } catch (error) {
      Alert.alert(
        "Export PDF Error",
        "An error occurred while exporting contact data as PDF."
      );
    }
  };

  const handleImportPDF = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (res.type === "success") {
        // Handle the selected PDF file
        const { uri, name, size } = res;
        // Implement your logic to process the PDF file here
        console.log("Import PDF", `Selected PDF: ${name}`);
        Alert.alert("Import PDF", `Selected PDF: ${name}`);
      } else {
      }
    } catch (error) {
      console.log("Document picker error:", error);
    }
  };
  const makePhoneCall = (item) => {
    let phoneNumber = item;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const sendEmail = (item) => {
    let recipient = item;
    let subject = "Subject of email";
    let body = "Body of email";
    Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  };

  const sendSMS = (item) => {
    let phoneNumber = item;
    let message = "Hello from my app!";
    Linking.openURL(`sms:${phoneNumber}`);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View
          style={{
           paddingVertical:22,
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
              source={require("../../../assets/back.png")}
            />
            {/* <Text style={{ fontSize: 15, color: Colors.white }}>Back </Text> */}
          </TouchableOpacity>
          <Text
            style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}
          >
            Contacts 
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddContacts")}
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
              source={require("../../../assets/plus.png")}
            />
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
            //marginBottom: 20,
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
            <Image
              source={require("../../../assets/search.png")}
              style={{
                height: 20,
                width: 20,
                marginLeft: 10,
                tintColor: Colors.white,
              }}
            />
            <TextInput
              allowFontScaling={false}
              placeholder="Search"
              placeholderTextColor={Colors.white}
              onChangeText={searchFilter}
              style={{
                color: Colors.white,
                fontSize: 15,
                marginLeft: 10,
              }}
            />
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => handleMenuItemSelect("Import Contacts")}
          >
            <Text style={{ color: Colors.white }}>Import Contacts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => handleMenuItemSelect("Export Contacts")}
          >
            <Text style={{ color: Colors.white }}>Export Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => handleMenuItemSelect("Reports")}
          >
            <Text style={{ color: Colors.white }}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => handleMenuItemSelect("")}
          >
            <Text style={{ color: Colors.white }}>User Agreements</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => handleMenuItemSelect("Export Contacts")}
          >
            <Text style={{ color: Colors.white }}>Pay History'</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.buttonColor,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
            onPress={() => handleMenuItemSelect("Export Contacts")}
          >
            <Text style={{ color: Colors.white }}>Disclosures</Text>
          </TouchableOpacity>
        </View> */}

        <View style={{ flex: 1, marginTop:15 }}>
          {loading ? (
            <Activity />
          ) : (
            <FlatList
              data={isSearching ? filteredData : data}
              ListFooterComponent={<View style={{ height: 50 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ContactsDetails", { item: item })
                  }
                  style={{
                    height: 80,
                    width: "97%",
                    alignSelf: "center",
                    borderWidth: 1,
                    borderColor: "#bbbbbb52",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    backgroundColor: "#987e7e17",
                    marginBottom: 5,
                    padding: 12,
                    justifyContent: "space-between",
                    borderRadius: 6,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.contact_image }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 30,
                        resizeMode: "cover",
                      }}
                    ></Image>

                    <Text
                      style={{
                        color: Colors.PrimaryColor,
                        fontSize: 12,
                      }}
                    ></Text>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: 14,
                        fontWeight: "bold",
                        Width: 200,
                        paddingHorizontal: 4,
                      }}
                    >
                      {item.contact_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 12,
                        }}
                      >
                        {item.post_title}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 80,
                        alignSelf: "flex-end",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "row",

                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => sendEmail(item.contact_email)}
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../../assets/mail.png")}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => sendSMS(item.contact_number)}
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../../assets/chat.png")}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => makePhoneCall(item.contact_number)}
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../../assets/phone.png")}
                          style={{
                            height: 40,
                            width: 40,
                            marginLeft: "5%",
                            resizeMode: "contain",
                          }}
                        ></Image>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                        marginLeft: 10,
                      }}
                    >
                      <Image
                        source={require("../../../assets/leftArrow.png")}
                        style={{
                          height: 10,
                          width: 10,
                          resizeMode: "contain",
                        }}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Text>No data found</Text>
                </View>
              }
              onRefresh={handleRefresh}
              refreshing={loading}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contacts;
