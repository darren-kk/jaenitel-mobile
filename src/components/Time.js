import { Text, View, Platform } from "react-native";

const Time = ({ minutes, seconds }) => {
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <View style={styles.timerTextContainer}>
      <Text
        style={styles.timerText}
      >{`${formattedMinutes}:${formattedSeconds}`}</Text>
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
