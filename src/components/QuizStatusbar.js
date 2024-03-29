import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function QuizStatusbar({
  quiz,
  quizIndex,
  moveToPreviousQuiz,
  moveToNextQuiz,
  onSelectQuiz,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState(quizIndex);
  const items = quiz?.map((item, index) => ({
    label: `${index + 1}. ${item.title}`,
    value: index,
  }));
  const handleValueChange = (newValue) => {
    setValue(newValue);
    onSelectQuiz(newValue);
  };

  return (
    <>
      <View style={styles.bar}>
        <TouchableOpacity onPress={moveToPreviousQuiz} style={styles.button}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          style={styles.buttonText}
        >
          <Text style={styles.buttonText}>
            {quiz[quizIndex]?.title} ({quizIndex + 1}/{quiz.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveToNextQuiz} style={styles.button}>
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={isDropdownOpen}
            value={value}
            items={items}
            setOpen={setIsDropdownOpen}
            setValue={handleValueChange}
            setItems={handleValueChange}
            placeholder={"문제를 선택하세요!"}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#eee",
    zIndex: 100,
  },
  dropdownContainer: {
    position: "absolute",
    width: 250,
    top: "5%",
    left: "18%",
    zIndex: 100,
  },
  button: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QuizStatusbar;
