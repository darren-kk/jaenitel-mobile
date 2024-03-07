import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
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
      <View style={styles.timerContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={startTimer}>
            <Text style={styles.menuText}>시작!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={startTimer}>
            <Text style={styles.menuText}>시작!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={startTimer}>
            <Text style={styles.menuText}>시작!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timerTextContainer}>
          <Text style={styles.timerText}>{`${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!timerId ? (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.buttonText}>시작!</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.buttonText}>중지!</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#A1CBA1",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#EC2D01",
    borderColor: "#EC2D01",
    width: 350,
    height: 250,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 50,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  menuButton: {
    width: 70,
    height: 20,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  menuText: {
    color: "#EC2D01",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
  timerTextContainer: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: "#fff",
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  buttonContainer: {
    flexDirection: "center",
  },
  button: {
    width: 200,
    height: 70,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#EC2D01",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
});
