import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import WebView from "react-native-webview";

const ResearchWebView = ({ searchQuery, setShowWebView }) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef(null);

  function onSwipe({ nativeEvent }) {
    if (nativeEvent.translationX > 15 && canGoBack) {
      webViewRef.current.goBack();
    } else if (nativeEvent.translationX < -15) {
      webViewRef.current.goForward();
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, position: "relative" }}>
      <PanGestureHandler onGestureEvent={onSwipe}>
        <View style={{ flex: 1, position: "relative" }}>
          <WebView
            ref={webViewRef}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
            }}
            style={styles.webView}
            source={{
              uri: `https://www.google.com/search?q=${encodeURIComponent(
                searchQuery
              )}`,
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowWebView(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  webView: {
    width: "90%",
    height: "70%",
    marginHorizontal: 20,
    marginVertical: 120,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    width: 100,
    height: 40,
    backgroundColor: "#4E9196",
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    bottom: 50,
    left: "50%",
    marginLeft: -50,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ResearchWebView;
