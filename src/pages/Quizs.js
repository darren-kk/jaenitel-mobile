import { useState, useRef, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import QuizLists from "../components/QuizLists";
import QuizStatusbar from "../components/QuizStatusbar";
import AddQuiz from "../components/AddQuiz";

export default function Quizs() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showSwipeIndicators, setShowSwipeIndicators] = useState(true);
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const quizzesStr = await AsyncStorage.getItem("quizzes");
        console.log(quizzesStr, "!@#!@$!@$!@$!@");
        const loadedQuizzes = quizzesStr ? JSON.parse(quizzesStr) : [];
        setQuizzes(loadedQuizzes);
        if (loadedQuizzes.length > 0 && quizIndex >= loadedQuizzes.length) {
          setQuizIndex(0);
        }
      } catch (error) {
        console.error("Failed to load quizzes from storage", error);
      }
    };

    loadQuizzes();
  }, [showAddQuiz]);

  const addNewQuiz = async (newQuiz) => {
    const updatedQuizzes = [...quizzes, newQuiz];
    try {
      await AsyncStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
      setQuizzes(updatedQuizzes);
      setShowAddQuiz(false);
    } catch (error) {
      console.error("Failed to save the new quiz", error);
    }
  };

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
    if (quizIndex < quizzes.length - 1) {
      setQuizIndex(quizIndex + 1);
    }
  };

  const moveToPreviousQuiz = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
    }
  };

  const toggleNewQuiz = () => {
    console.log("Add new quiz functionality goes here");
    setShowAddQuiz(true);
  };

  const selectQuiz = (index) => {
    setQuizIndex(index);
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
            quiz={quizzes}
            quizIndex={quizIndex}
            moveToPreviousQuiz={moveToPreviousQuiz}
            moveToNextQuiz={moveToNextQuiz}
            onSelectQuiz={selectQuiz}
          />
          <QuizLists
            quiz={quizzes[quizIndex] || {}}
            updateQuiz={moveToNextQuiz}
          />

          <TouchableOpacity onPress={toggleNewQuiz} style={styles.button}>
            <FontAwesome5 name="plus" size={24} color="white" />
          </TouchableOpacity>
          <AddQuiz
            visible={showAddQuiz}
            onClose={() => setShowAddQuiz(false)}
            onAdd={addNewQuiz}
          />
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
    top: "40%",
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
