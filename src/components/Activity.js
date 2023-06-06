import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Colors from '../utils/Colors';

const Activity = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PrimaryColor,
      }}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

export default Activity;
