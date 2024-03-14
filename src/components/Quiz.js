import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";

import QUIZ_LIST from "../../assets/quiz.json";
import getRandomIndex from "../utils/generateRandomIndex";
import checkAnswer from "../utils/checkAnswer";

function Quiz({ showQuiz, setShowQuiz, setMode }) {
  const randomIndex = getRandomIndex(QUIZ_LIST.questions.length - 1);
  const quiz = QUIZ_LIST.questions[randomIndex];
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
  let userInput = "";

  function validateUserAnswer() {
    if (checkAnswer(userInput, quiz.answer)) {
      setShowQuiz(!showQuiz);
      setMode("shortBreak");
      return;
    }

    console.log("ㄱ검색해...");
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.questionText}>Q. {quiz.question}</Text>
          <BouncyCheckboxGroup
            data={options}
            onChange={(selectedItem) => {
              userInput = selectedItem.text;
            }}
            style={{
              flexDirection: "column",
              width: "100%",
            }}
          />
          <TouchableOpacity
            style={[styles.button]}
            onPress={validateUserAnswer}
          >
            <Text style={styles.buttonText}>제출하기!</Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default Quiz;
