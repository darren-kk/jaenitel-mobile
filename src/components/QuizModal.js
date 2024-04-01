import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import ResearchWebView from "./ResearchWebView";
import QuizView from "./QuizView";

import checkAnswer from "../utils/checkAnswer";

function Quiz({ showQuiz, setShowQuiz, setMode, quiz }) {
  const [showWebView, setShowWebView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function validateUserAnswer(userInput) {
    if (checkAnswer(userInput, quiz.answer)) {
      setShowQuiz(!showQuiz);
      setMode("shortBreak");

      return;
    }

    setSearchQuery(quiz.question);
    setShowWebView(true);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showQuiz}
      onRequestClose={() => {
        setShowQuiz(!showQuiz);
      }}
    >
      {!showWebView ? (
        <View style={styles.centeredView}>
          <QuizView
            quiz={quiz}
            onSubmit={validateUserAnswer}
            containerStyle={styles.modalView}
          />
        </View>
      ) : (
        <ResearchWebView
          searchQuery={searchQuery}
          setShowWebView={setShowWebView}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    width: "85%",
    height: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default Quiz;
