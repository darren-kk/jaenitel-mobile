import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";

import checkAnswer from "../utils/checkAnswer";

function QuizLists({ quiz, updateQuiz }) {
  const [userInput, setUserInput] = useState("");
  const options = quiz.options.map((item, index) => {
    return {
      id: index,
      text: item,
      style: styles.optionText,
      textStyle: {
        textDecorationLine: "none",
        width: "auto",
      },
    };
  });

  function validateUserAnswer() {
    if (checkAnswer(userInput, quiz.answer)) {
      updateQuiz();

      return;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Q. {quiz.question}</Text>
      <BouncyCheckboxGroup
        key={quiz.title}
        data={options}
        onChange={(selectedItem) => {
          if (selectedItem) {
            setUserInput(selectedItem.text);
          }
        }}
        style={{
          flexDirection: "column",
          width: "100%",
        }}
      />
      <TouchableOpacity style={styles.button} onPress={validateUserAnswer}>
        <Text style={styles.buttonText}>제출하기!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 60,
    padding: 20,
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 18,
    textAlign: "left",
    width: "100%",
    height: "auto",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  button: {
    width: 100,
    height: 40,
    marginTop: 50,
    backgroundColor: "#4E9196",
    borderColor: "#4E9196",
    borderRadius: 20,
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
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QuizLists;
