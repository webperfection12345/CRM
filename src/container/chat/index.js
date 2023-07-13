import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import Colors from "../../utils/Colors";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { chat } from "../../modules/chat";
import { TypingAnimation } from 'react-native-typing-animation';
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardsSwipe from 'react-native-cards-swipe';


const data = [
    1, 2, 3, 4, 5, 6, 7
]

const Chat = () => {
    const navigation = useNavigation();
    const [type, setType] = useState([])
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState([])
    const yourRef = useRef([]);

    return (
        <View style={{ height: "100%", position: 'relative', paddingBottom: 100, }}>
            <View style={{ backgroundColor: Colors.PrimaryColor, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    ></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: "bold", color: Colors.white }}>
                    Contact Us
                </Text>
                <TouchableOpacity
                    onPress={() => { setRes([]) }}
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                    }}
                >
                    <Image
                        style={{
                            height: 25,
                            width: 25,
                            resizeMode: "contain",
                            tintColor: Colors.white,
                        }}
                        source={require("../../assets/images/reload.png")}
                    ></Image>
                </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 16, borderRadius: 16, alignSelf: 'flex-start', maxWidth: '70%', marginLeft: 22, marginTop: 22 }}>Hi! What can I help you with?</Text>

         
            <AutoScrollFlatList
                data={res}
                threshold={20}
                renderItem={({ item, index }) => {
                    return (
                        <Text style={{
                            padding: 16,
                            fontSize: 16,
                            borderRadius: 16,
                            backgroundColor: item.type === 0 ? Colors.PrimaryColor : Colors.white,
                            alignSelf: item.type === 0 ? 'flex-end' : 'flex-start',
                            maxWidth: '70%',
                            marginLeft: 8,
                            marginRight: 8,
                            marginTop: 8,

                            color: item.type === 0 ? Colors.white : Colors.black
                        }}>{item.message}</Text>
                    )
                }}>

            </AutoScrollFlatList>

            <View style={{ bottom: 0, position: 'absolute', zIndex: 99, left: 0, right: 0, backgroundColor: Colors.white }}>
                {
                    loading && <Text style={{
                        padding: 16,
                        fontSize: 16,
                        borderRadius: 16,
                        backgroundColor: Colors.PrimaryColor,
                        alignSelf: 'flex-end',
                        maxWidth: '70%',
                        marginLeft: 8,
                        marginRight: 8,
                        marginTop: 8,
                        color: Colors.white
                    }}>{message}</Text>
                }
                <Text style={{
                    fontSize: 16,
                    borderRadius: 16,
                    alignSelf: 'flex-start',
                    maxWidth: '70%',
                    marginLeft: 16,
                    marginTop: 12,
                    backgroundColor: Colors.white
                }}>Please reply on this chat box</Text>
                {
                    loading && <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 12,
                            borderRadius: 16,
                            alignSelf: 'flex-start',
                            maxWidth: '70%',
                            marginLeft: 16,
                            marginTop: 12,
                            backgroundColor: Colors.white
                        }}>typing</Text>
                        <TypingAnimation
                            dotColor="black"
                            dotMargin={3}
                            dotAmplitude={2}
                            dotSpeed={0.15}
                            dotRadius={1}
                            dotX={8}
                            dotY={0}
                            style={{ marginTop: 25, marginLeft: -3 }}
                        />
                    </View>
                }

                <View style={{ backgroundColor: Colors.white, borderColor: Colors.boderColor, borderWidth: 1, borderRadius: 5, height: 45, margin: 16, paddingLeft: 8, paddingRight: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        editable={loading ? false : true}
                        style={{ width: '90%', backgroundColor: Colors.white }}
                        placeholder="Type here"
                        value={message}
                        onChangeText={setMessage}>
                    </TextInput>
                    <TouchableOpacity
                        disabled={loading || message.length === 0 ? true : false}
                        onPress={() => {
                            setLoading(true)
                            dispatch(chat({ message: 'i want to know somthink about site' })).then((ress) => {
                                setLoading(false)

                                const newTodo1 = {

                                    type: 0,
                                    message: message,
                                }
                                const newTodo = {
                                    type: 1,
                                    message: ress.payload.data.text,
                                };
                                setMessage('')

                                setRes([...res, newTodo1, newTodo])

                            }).catch((e) => {
                                alert('Error ==> ' + JSON.stringify(e))
                            })
                        }}
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25,
                                resizeMode: "contain",
                                tintColor: Colors.black,
                            }}
                            source={require("../../assets/images/sendm.png")}
                        ></Image>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        width: '92%',
        height: '70%',
        backgroundColor: 'red'
    },
    card: {
        width: '100%',
        height: '100%',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.07,
        shadowRadius: 3.3,
    },
    cardImg: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 13,
    },
});
export default Chat;