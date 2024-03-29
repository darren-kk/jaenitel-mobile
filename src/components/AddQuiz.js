import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddQuiz({ visible, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [answer, setAnswer] = useState("");
  const [validationError, setValidationError] = useState("");

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (text, index) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (
      !title ||
      !question ||
      options.length < 2 ||
      !options.every((option) => option) ||
      !answer
    ) {
      setValidationError("모든 항목을 채워주세요!");
      return;
    }
    onAdd({ title, question, options, answer });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>문제 추가하기</Text>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: "#ddd", marginBottom: 30 },
            ]}
            placeholder="문제 제목"
            onChangeText={setTitle}
            value={title}
          />
          <TextInput
            style={[
              styles.input,
              { backgroundColor: "#ddd", marginBottom: 30 },
            ]}
            placeholder="문제"
            onChangeText={setQuestion}
            value={question}
          />
          {options.map((option, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`항목 ${index + 1}`}
              onChangeText={(text) => handleOptionChange(text, index)}
              value={option}
            />
          ))}
          <TouchableOpacity onPress={addOption} style={styles.optionButton}>
            <FontAwesome5 name="plus" size={18} color="white" />
          </TouchableOpacity>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={answer}
              style={styles.picker}
              onValueChange={(itemValue) => setAnswer(itemValue)}
            >
              {options.map((option, index) => (
                <Picker.Item
                  key={index}
                  label={index + 1 + " 번"}
                  value={option}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          {validationError ? (
            <Text style={styles.errorText}>{validationError}</Text>
          ) : null}
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
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonWrapper: {
    paddingHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#4E9196",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 50,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pickerContainer: {
    width: "100%",
    height: "30%",
    marginBottom: 15,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  picker: {
    width: "100%",
    height: "100%",
  },

  errorText: {
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
  },
});

export default AddQuiz;
