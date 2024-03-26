import { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import WebView from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";

const ResearchWebView = ({ searchQuery, setShowWebView }) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [showSwipeIndicators, setShowSwipeIndicators] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const webViewRef = useRef(null);

  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 3500,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (finished) {
      setShowSwipeIndicators(false);
    }
  });

  function onSwipe({ nativeEvent }) {
    if (nativeEvent.translationX > 15 && canGoBack) {
      webViewRef.current.goBack();
    } else if (nativeEvent.translationX < -15 && canGoForward) {
      webViewRef.current.goForward();
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={onSwipe}>
        <View style={styles.innerContainer}>
          {showSwipeIndicators && (
            <Animated.View
              style={[styles.swipeIndicators, { opacity: fadeAnim }]}
            >
              <View style={[styles.navButton, { opacity: 0.7 }]}>
                <Text style={styles.navText}>스와이프해서 화면 이동</Text>
                <FontAwesome name="arrows-h" size={30} color="white" />
              </View>
            </Animated.View>
          )}
          <WebView
            ref={webViewRef}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
              setCanGoForward(navState.canGoForward);
            }}
            style={styles.webView}
            source={{
              uri: `https://www.google.com/search?q=${encodeURIComponent(
                searchQuery
              )}`,
            }}
          />
          <View style={styles.navBar}>
            <TouchableOpacity
              style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
              onPress={() => webViewRef.current.goBack()}
              disabled={!canGoBack}
            >
              <Text style={styles.navText}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setShowWebView(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navButton,
                !canGoForward && styles.navButtonDisabled,
              ]}
              onPress={() => webViewRef.current.goForward()}
              disabled={!canGoForward}
            >
              <Text style={styles.navText}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  innerContainer: {
    flex: 1,
    position: "relative",
  },
  webView: {
    width: "90%",
    height: "70%",
    marginHorizontal: "5%",
    marginTop: "15%",
    borderRadius: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    marginHorizontal: "5%",
    paddingTop: "3%",
    paddingBottom: "20%",
  },
  navButton: {
    backgroundColor: "#4E9196",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  swipeIndicators: {
    position: "absolute",
    top: "50%",
    left: "40%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  swipeText: {
    color: "#4E9196",
    fontWeight: "bold",
  },
});

export default ResearchWebView;
