import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../utils/Colors';

export default function AppButton(props) {
  return (
    <TouchableOpacity
      style={[
        {
          width: '90%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.buttonColor,
          marginTop: '5%',
          borderRadius: 3,
          alignSelf: 'center',
        },
        props.btnStyle,
      ]}
      onPress={props.onPress}>
      <Text
        allowFontScaling={false}
        style={[
          {
            color: Colors.white,
            fontSize: 14,
          },
          props.textStyle,
        ]}>
        {props.btnText}
      </Text>
    </TouchableOpacity>
  );
}
