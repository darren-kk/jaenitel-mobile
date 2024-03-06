import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";

import { FOCUS_TIME_MINUTES } from "../constants";

export default function Timer() {
  const [timerCount, setTimerCount] = useState(FOCUS_TIME_MINUTES);
  const [timerId, setTimerId] = useState(null);

  function startTimer() {
    if (!timerId) {
      const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
      setTimerId(id);
    }
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }

  const minutes = Math.floor(timerCount / 60000);
  const seconds = Math.floor((timerCount % 60000) / 1000);

  return (
    <View style={styles.container}>
      <Text>Pomodor</Text>
      <StatusBar style="auto" />
      <Button title="시작!" onPress={startTimer} />
      <Button title="중지!" onPress={stopTimer} />
      <Text>{`${minutes}:${seconds.toString().padStart(2, "0")}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
