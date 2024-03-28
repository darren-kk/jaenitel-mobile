import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function QuizStatusbar({
  quizIndex,
  quizTotal,
  moveToPreviousQuiz,
  moveToNextQuiz,
  quizTitle,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={moveToPreviousQuiz} style={styles.button}>
        <Text style={styles.buttonText}>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={styles.quizTitle}
      >
        <Text style={styles.buttonText}>
          {quizTitle} ({quizIndex + 1}/{quizTotal})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={moveToNextQuiz} style={styles.button}>
        <Text style={styles.buttonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#eee",
  },
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default QuizStatusbar;
