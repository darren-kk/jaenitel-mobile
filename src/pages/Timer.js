import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { AppState } from "react-native";

import Time from "../components/Time";
import Quiz from "../components/QuizModal";
import ModeButton from "../components/ModeButton";
import ControlButton from "../components/ControlButton";
import { TIME_MINUTES } from "../utils/constants";
import getRandomIndex from "../utils/generateRandomIndex";

export default function Timer() {
  const [timerCount, setTimerCount] = useState(TIME_MINUTES.pomodoro);
  const [timerId, setTimerId] = useState(null);
  const [mode, setMode] = useState("pomodoro");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [backgroundTime, setBackgroundTime] = useState(null);
  const randomIndex = getRandomIndex(quizzes.length - 1);

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "myExpoApp",
      })
    ).data;
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        if (backgroundTime) {
          const currentTime = Date.now();
          const timeDifference =
            Math.floor((currentTime - backgroundTime - 1000) / 1000) * 1000;
          setTimerCount((prev) => Math.max(0, prev - timeDifference));
        }
      } else if (nextAppState === "background") {
        setBackgroundTime(Date.now());
      }
    });

    return () => {
      subscription.remove();
    };
  }, [backgroundTime]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const quizzesStr = await AsyncStorage.getItem("quizzes");
        const loadedQuizzes = quizzesStr ? JSON.parse(quizzesStr) : [];
        setQuizzes(loadedQuizzes);
      } catch (error) {
        console.error("Failed to load quizzes", error);
      }
    };

    loadQuizzes();
  }, []);

  async function scheduleTimerEndNotification() {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "뽀모도로 완료!",
        body: "집중 시간이 완료되었습니다. 퀴즈를 풀고 휴식에 돌입하세요!",
      },
      trigger: { seconds: timerCount / 1000 },
    });
    return identifier;
  }

  async function startTimer() {
    if (!timerId) {
      const notificationId = await scheduleTimerEndNotification();

      const id = setInterval(() => {
        setTimerCount((prev) => {
          if (prev - 1000 <= 0) {
            clearInterval(id);
            setTimerId(null);

            if (mode === "pomodoro") {
              setShowQuiz(true);
            }

            return TIME_MINUTES[mode];
          }
          return prev - 1000;
        });
      }, 1000);
      setTimerId(id);
    }
  }

  async function stopTimer() {
    const notificationId = await scheduleTimerEndNotification();
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
      Notifications.cancelScheduledNotificationAsync(notificationId);
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
          <ModeButton mode={mode} setMode={setMode} label={"pomodoro"} />
          <ModeButton mode={mode} setMode={setMode} label={"shortBreak"} />
          <ModeButton mode={mode} setMode={setMode} label={"longBreak"} />
        </View>
        <Time minutes={minutes} seconds={seconds}></Time>
      </View>
      <View style={styles.buttonContainer}>
        <ControlButton
          onPress={timerId ? stopTimer : startTimer}
          onPressReset={resetTimer}
          label={timerId ? "일시 정지" : "집중 시작"}
          colorByMode={colorByMode}
        />
      </View>
      {showQuiz && (
        <Quiz
          showQuiz={showQuiz}
          setShowQuiz={setShowQuiz}
          setMode={handleModeChange}
          quiz={quizzes[randomIndex]}
        />
      )}
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
  buttonContainer: {
    flexDirection: "row",
  },
});
