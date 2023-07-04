import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  Button,
} from "react-native";
import Colors from "../utils/Colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, CalendarTheme } from "react-native-calendars";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import { color } from "react-native-reanimated";

const activities = {
  "2023-06-01": [{ name: "Meeting", time: "10:00 AM"}],
  "2023-06-10": [{ name: "Birthday Party", time: "7:00 PM" }],
  "2023-06-15": [{ name: "Dinner", time: "8:30 PM" }],
  "2024-01-01": [{ name: "Dinner", time: "8:30 PM" }],
  "2022-01-01": [{ name: "Dinner", time: "8:30 PM" }],
};
const Header = (props) => {
  const { label, plusButton } = props;
  const navigation = useNavigation();
  const [currentActive, SetCurrentActive] = useState([]);
  const isFocused = useIsFocused();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [showPicker, setShowPicker] = useState(true);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedDate(moment().format("YYYY-MM-DD"));
    setShowPicker(true);
  };

  const handleMonthChange = (month) => {
    const selectedMonth = moment(selectedDate).month(
      moment.months().indexOf(month)
    );
    setSelectedDate(selectedMonth.format("YYYY-MM-DD"));
  };

  const handleYearChange = (year) => {
    const selectedYear = moment(selectedDate).year(year);
    setSelectedDate(selectedYear.format("YYYY-MM-DD"));
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setSelectedOption("date"); // Update the selectedOption state to "date"
    // setShowPicker(false);
  };

  const renderCalendar = () => {
    if (selectedOption === "date" && showPicker === true) {
      const activitiesForDate = activities[selectedDate] || [];
      const calendarTheme = {
        arrowColor: Colors.PrimaryColor, // Change the default arrow color here
        // You can customize other theme properties as well
      };
      return (
        <Modal
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
          animationType="slide"
        >
           <View style={{justifyContent:"flex-end",alignItems:"flex-end",backgroundColor:Colors.white}}>
          <View style={{backgroundColor:Colors.PrimaryColor,height:30,width:30,alignItems:"center",justifyContent:"center",borderRadius:100,marginRight:12,marginTop:5,marginBottom:5}}>
          <TouchableOpacity onPress={() => {
              setShowPicker(false);
              setSelectedOption("option");
              
            }}>
               <Image
            style={{ height: 12, width: 12, resizeMode: "contain" }}
            source={require("../../assets/closewhite.png")}
          ></Image>
{/* <Text style={{color:Colors.white,fontSize:14,fontWeight:"bold"}}>Close</Text> */}
          </TouchableOpacity>
          </View>
          </View>
          <ScrollView>
          <View>
            <Calendar
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: Colors.PrimaryColor },
              }}
              onDayPress={handleDateSelect}
              theme={calendarTheme}
            />
            <View style={{paddingHorizontal:20}}>
            <Text style={{paddingVertical:12,fontWeight:"bold"}}>Activities for <Text style={{color:Colors.PrimaryColor,fontWeight:"bold"}}>{selectedDate}</Text></Text>
            {activitiesForDate.map((activity, index) => (
              <Text key={index}>
                {activity.name} - {activity.time}
              </Text>
            ))}
          
          {/* <Button
            title="Close"
            onPress={() => {
              setShowPicker(false);
              setSelectedOption("option");
            }}
          /> */}
         
         
          </View>
          </View>
          </ScrollView>
        </Modal>
      );
    } else if (selectedOption === "month") {
      const month = moment(selectedDate).format("MMMM");
      const activitiesForMonth = Object.entries(activities).filter(
        ([date]) => moment(date).format("MMMM") === month
      );
      const calendarTheme = {
        arrowColor: Colors.PrimaryColor, // Change the default arrow color here
        // You can customize other theme properties as well
      };
      const markedDates = {};
      activitiesForMonth.forEach(([date]) => {
        markedDates[date] = { marked: true ,dotColor: Colors.PrimaryColor};
      });

      return (
        <Modal
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
          animationType="slide"
        > 
        <View style={{justifyContent:"flex-end",alignItems:"flex-end",backgroundColor:Colors.white}}>
        <View style={{backgroundColor:Colors.PrimaryColor,height:30,width:30,alignItems:"center",justifyContent:"center",borderRadius:100,marginRight:12,marginTop:5,marginBottom:5}}>
        <TouchableOpacity onPress={() => {
            setShowPicker(false);
            setSelectedOption("option");
            
          }}> 
          <Image
          style={{ height: 12, width: 12, resizeMode: "contain" }}
          source={require("../../assets/closewhite.png")}
        ></Image>
{/* <Text style={{color:Colors.white,fontSize:14,fontWeight:"bold"}}>Close</Text> */}
        </TouchableOpacity>
        </View>
        </View>
           <ScrollView>
          <View>
            <Picker
              selectedValue={month}
              onValueChange={handleMonthChange}
              style={styles.pickerzz}
            >
              {moment.months().map((monthName, index) => (
                <Picker.Item key={index} label={monthName} value={monthName} style={{ color: Colors.PrimaryColor }}/>
              ))}
            </Picker>
            <Calendar markedDates={{
                [selectedDate]: { selected: true, selectedColor: Colors.PrimaryColor },
              }} onDayPress={handleDateSelect}
              theme={calendarTheme}
              />
            </View>
            <View style={{paddingHorizontal:20}}>
            <Text style={{paddingVertical:12,fontWeight:"bold"}}>Activities for <Text style={{color:Colors.PrimaryColor,fontWeight:"bold"}}>{month}</Text></Text>
            {activitiesForMonth.map(([date, activities]) => (
              <View key={date} style={styles.mainactivity}>
                 <Text style={styles.maindate}>{date}</Text>
                {activities.map((activity, index) => (
                  <Text key={index} style={styles.mainactperform}>
                    {activity.name} - {activity.time}
                  </Text>
                ))}
              </View>
            ))}
         {/* <View style={{backgroundColor:Colors.PrimaryColor,height:50,width:"50%",alignItems:"center",justifyContent:"center",borderRadius:100}}> */}
          {/* <Button
            title="Close" 
            buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
            onPress={() => {
              setShowPicker(false);
              setSelectedOption("option");
              
            }}
          /> */}
          
          </View>
          </ScrollView>
        </Modal>
      );
    } else if (selectedOption === "year") {
      const year = moment(selectedDate).format("YYYY");
      const currentYear = moment().year();
      const years = [];
      for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        years.push(i.toString());
      }
      const activitiesForYear = Object.entries(activities).filter(
        ([date]) => moment(date).format("YYYY") === year
      );
      const calendarTheme = {
        arrowColor: Colors.PrimaryColor, // Change the default arrow color here
        // You can customize other theme properties as well
      };
      const markedDates = {};
      activitiesForYear.forEach(([date]) => {
        markedDates[date] = { marked: true, dotColor: Colors.PrimaryColor };
      });

      return (
        <Modal
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
          animationType="slide"
        >
           <View style={{justifyContent:"flex-end",alignItems:"flex-end",backgroundColor:Colors.white}}>
          <View style={{backgroundColor:Colors.PrimaryColor,height:30,width:30,alignItems:"center",justifyContent:"center",borderRadius:100,marginRight:12,marginTop:5,marginBottom:5}}>
          <TouchableOpacity onPress={() => {
              setShowPicker(false);
              setSelectedOption("option");
              
            }}>
               <Image
            style={{ height: 12, width: 12, resizeMode: "contain" }}
            source={require("../../assets/closewhite.png")}
          ></Image>
{/* <Text style={{color:Colors.white,fontSize:14,fontWeight:"bold"}}>Close</Text> */}
          </TouchableOpacity>
          </View>
          </View>
          <ScrollView>
          <View>
            <View style={styles.bgc}>
             
            <Picker
              selectedValue={year}
              onValueChange={handleYearChange}
              style={styles.pickerzz}
            >
              {years.map((yearValue, index) => (
                <Picker.Item key={index} label={yearValue} value={yearValue} style={{ color: Colors.PrimaryColor }}/>
              ))}
            </Picker>
            </View>
            {/* <Calendar markedDates={markedDates} onDayPress={handleDateSelect} /> */}
            <Calendar markedDates={{
                [selectedDate]: { selected: true, selectedColor: Colors.PrimaryColor },
              }} onDayPress={handleDateSelect}
              theme={calendarTheme}
              />
            </View>
            <View style={{paddingHorizontal:20}}>
            <Text style={{paddingVertical:12,fontWeight:"bold",fontSize:17,marginTop:12,
          marginBottom:12}}>Activities for <Text style={{color:Colors.PrimaryColor,fontWeight:"bold"}}> {year}</Text></Text>
            {activitiesForYear.map(([date, activities]) => (
              <View key={date} style={styles.mainactivity}>
                <Text style={styles.maindate}>{date}</Text>
                {activities.map((activity, index) => (
                  <Text key={index} style={styles.mainactperform}>
                    {activity.name} - {activity.time}
                  </Text>
                ))}
              </View>
            ))}
         
          {/* <Button
            title="Close"
            onPress={() => {
              setShowPicker(false);
              setSelectedOption("option");
            }}
          /> */}
         
          </View>
          </ScrollView>
        </Modal>
      );
    }
  };
  useEffect(() => {
    getActiveClient();
    if (isFocused) {
      // Perform the refresh logic here
    }
  }, [isFocused]);
  const getActiveClient = async () => {
    const id = await AsyncStorage.getItem("userId");
    try {
      const response = await fetch(
        "https://surf.topsearchrealty.com/wp-json/activeuser/currentactive?user_id=" +
          id
      );
      if (!response.ok) {
        throw new Error("Failed to fetch active client data.");
      }
      const data = await response.json();

      // Check if the data is an array or a string
      if (Array.isArray(data.data)) {
        SetCurrentActive(data.data);
      } else {
        SetCurrentActive([]); // Set an empty array if there are no active clients
      }
    } catch (error) {
      console.log(error.message);
      // Handle the error condition
    }
  };
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 2,
      }}
    >
      <View style={styles.onlinepeoples}>
        <ScrollView horizontal={true} style={styles.maincent}>
          {currentActive.length > 0 ? (
            <FlatList
              style={{ padding: 5 }}
              data={currentActive}
              horizontal={true}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    marginHorizontal: 2,
                    borderRadius: 25,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.PrimaryColor,
                    outline: "2px solid green",
                    marginRight: 8,
                  }}
                >
                  {item.User_image ? (
                    <Image
                      source={{ uri: item.User_image }}
                      style={{ width: 50, height: 50, borderRadius: 25, backgroundColor:Colors.PrimaryColor }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={{ fontSize: 16, color: Colors.white }}>
                      {item.User_name.charAt(0)}
                      {item.User_name.split(" ").length > 1 &&
                        item.User_name.split(" ")[1].charAt(0)}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No active clients</Text>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          borderTopColor: "#ddd",
          borderTopWidth: 1,

          paddingVertical: 17,
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
            textAlign: "center",
          }}
        >
          {label}
        </Text>
        <View style={styles.headericons}>
          <TouchableOpacity style={styles.notificationicon}>
            <Image
              style={{
                height: 22,
                width: 22,
                marginLeft: 20,
                resizeMode: "contain",
                position: "relative",
                left: 10,
              }}
              source={require("../../assets/notification.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calicon}>
            <View style={styles.containermain}>
              <View style={styles.iconmaincol}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    marginLeft: 22,
                    resizeMode: "contain",
                    position: "relative",
                    bottom: -26,
                  }}
                  source={require("../../assets/calender.png")}
                ></Image>
              </View>
              <Picker
                selectedValue={selectedOption}
                onValueChange={handleOptionChange}
                style={styles.picker}
              >
                <Picker.Item label="Select Value" value="" />
                <Picker.Item label="Date" value="date" />
                <Picker.Item label="Month" value="month" />
                <Picker.Item label="Year" value="year" />
              </Picker>
              {renderCalendar()}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headericons: { flexDirection: "row", alignItems: "center", paddingRight: 12 },
  onlinepeoples: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 12,
    flexWrap: "wrap",
  },
  icons: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#00ff17",
    marginHorizontal: 5,
  },
  calicon: { flexDirection: "row", alignItems: "center" },
  noimage: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#00ff17",
    marginHorizontal: 5,
    backgroundColor: Colors.darkblue,
    color: Colors.white,
    textAlign: "center",
    fontWeight: "800",
    lineHeight: 60,
    fontSize: 20,
  },
  mainactivity:{paddingBottom:15,
  borderBottomWidth:1,
borderBottomColor:Colors.gray,marginBottom:15},
  container: {
    flex: 1,
    padding: 16,
  },
  activitiesContainer: {
    marginTop: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  activityText: {
    marginBottom: 4,
  },
  picker: {
    borderWidth: 0,
    // backgroundColor:"red",
    position: "relative",
    top: -12,

    opacity: 0,
  },
  iconmaincol: { flexDirection: "row" },
  closecalenderbutton:{backgroundColor:Colors.PrimaryColor,marginTop:25},
  maindate:{color:Colors.PrimaryColor,fontWeight:"bold",marginBottom:2},
  mainactperform:{marginTop:4,fontSize:13},button:{backgroundColor:"transparent",},
  pickerzz:{
 paddingVertical:12,
borderRadius:6,
backgroundColor:Colors.white,
width:"100%",
height:60,

  },
  pickertext:{color:"red"},
  // bgc:{backgroundColor:"red",height:100,width:"100%",padding:12}
});
export default Header;
