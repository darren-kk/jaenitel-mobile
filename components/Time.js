import React from "react";
import { Text, View, Platform } from "react-native";

const Time = ({ minutes, seconds }) => {
  return (
    <View style={styles.timerTextContainer}>
      <Text style={styles.timerText}>{`${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`}</Text>
    </View>
  );
};

const styles = {
  timerTextContainer: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: "#fff",
    fontSize: 100,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
};

export default Time;
