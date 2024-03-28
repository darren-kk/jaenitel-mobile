import { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import QuizLists from "../components/QuizLists";
import QuizStatusbar from "../components/QuizStatusbar";
import QUIZ_LIST from "../../assets/quiz.json";

export default function Quizs() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [showSwipeIndicators, setShowSwipeIndicators] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 3500,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (finished) {
      setShowSwipeIndicators(false);
    }
  });

  const moveToNextQuiz = () => {
    if (quizIndex < QUIZ_LIST.questions.length - 1) {
      setQuizIndex(quizIndex + 1);
    }
  };

  const moveToPreviousQuiz = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
    }
  };

  const addNewQuiz = () => {
    console.log("Add new quiz functionality goes here");
  };

  function onSwipe({ nativeEvent }) {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > 30) {
        moveToPreviousQuiz();
      } else if (nativeEvent.translationX < -30) {
        moveToNextQuiz();
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onHandlerStateChange={onSwipe}>
        <View>
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
          <QuizStatusbar
            quizIndex={quizIndex}
            quizTotal={QUIZ_LIST.questions.length}
            moveToPreviousQuiz={moveToPreviousQuiz}
            moveToNextQuiz={moveToNextQuiz}
            quizTitle={QUIZ_LIST.questions[quizIndex].title}
          />
          <QuizLists
            quiz={QUIZ_LIST.questions[quizIndex]}
            updateQuiz={moveToNextQuiz}
          />
          <TouchableOpacity onPress={addNewQuiz} style={styles.button}>
            <FontAwesome5 name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    position: "relative",
  },
  button: {
    position: "absolute",
    top: "72%",
    left: "80%",
    padding: 8,
    backgroundColor: "#06bcee",
    borderRadius: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  navButton: {
    backgroundColor: "#4E9196",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
