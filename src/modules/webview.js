import React from "react";
import { View, Platform } from "react-native";
import { WebView } from "react-native-webview";

const MapWebView = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBenZdKitxhCII3y6i0XS7ZevgRJi9I6RM&center=${latitude},${longitude}&zoom=15`;

  if (Platform.OS === "web") {
    return <iframe src={mapUrl} style={{ flex: 1 }} />;
  }

  return <WebView source={{ uri: mapUrl }} style={{ flex: 1 }} />;
};

export default MapWebView;
