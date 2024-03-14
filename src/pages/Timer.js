import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

import Time from "../components/Time";
import Quiz from "../components/Quiz";
import { TIME_MINUTES } from "../utils/constants";

export default function Timer() {
  const [timerCount, setTimerCount] = useState(TIME_MINUTES.pomodoro);
  const [timerId, setTimerId] = useState(null);
  const [mode, setMode] = useState("pomodoro");
  const [showQuiz, setShowQuiz] = useState(false);

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

  function resetTimer() {
    stopTimer();
    setTimerCount(TIME_MINUTES[mode]);
  }

  function handleModeChange(mode) {
    stopTimer();
    setMode(mode);
    setTimerCount(TIME_MINUTES[mode]);
  }

  const minutes = Math.floor(timerCount / 60000);
  const seconds = Math.floor((timerCount % 60000) / 1000);

  const colorByMode =
    mode === "pomodoro"
      ? "#EC2D01"
      : mode === "shortBreak"
      ? "#4E9196"
      : "#4F7FA2";

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.timerContainer,
          { backgroundColor: colorByMode, borderColor: colorByMode },
        ]}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={[
              styles.menuButton,
              mode === "pomodoro" && styles.activeButton,
            ]}
            onPress={() => handleModeChange("pomodoro")}
          >
            <Text style={[styles.menuText, { color: colorByMode }]}>
              뽀모도로
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuButton,
              mode === "shortBreak" && styles.activeButton,
            ]}
            onPress={() => handleModeChange("shortBreak")}
          >
            <Text style={[styles.menuText, { color: colorByMode }]}>
              짧은 휴식
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuButton,
              mode === "longBreak" && styles.activeButton,
            ]}
            onPress={() => handleModeChange("longBreak")}
          >
            <Text style={[styles.menuText, { color: colorByMode }]}>
              긴 휴식
            </Text>
          </TouchableOpacity>
        </View>
        <Time minutes={minutes} seconds={seconds}></Time>
      </View>
      <View style={styles.buttonContainer}>
        {!timerId ? (
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={[styles.buttonText, { color: colorByMode }]}>
              집중 시작!
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={[styles.buttonText, { color: colorByMode }]}>
              일시정지
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetTimer}>
          <Image
            style={styles.resetIcon}
            source={require("../../assets/reset.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setShowQuiz(true)}>
        <Text style={[styles.buttonText, { color: colorByMode }]}>퀴즈뿅</Text>
      </TouchableOpacity>
      <Quiz showQuiz={showQuiz} setShowQuiz={setShowQuiz} />
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
    width: "auto",
    height: 25,
    paddingHorizontal: 10,
    paddingVertical: 3,
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
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
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
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  resetIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    marginLeft: 15,
    marginTop: 10,
  },
});
