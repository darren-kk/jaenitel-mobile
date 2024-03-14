import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { POMODORO_METHODS } from "../utils/constants";

function PomodoroDescription({ toggleExplanation, setToggleExplanation }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={toggleExplanation}
      onRequestClose={() => {
        setToggleExplanation(!toggleExplanation);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.explanation}>
          <Text style={styles.paragraph}>뽀모도로란...</Text>
          <Text style={styles.paragraph}>
            포모도로 기법은 Francesco Cirillo가 개발한 시간 관리 방법론입니다.
            하루를 정해진 시간 간격으로 쪼개 활용하는 이 기법의 이름은
            '토마토'를 의미하는 이탈리아 단어를 따라 붙여졌습니다. Cirillo가
            시간을 잴 때 토마토 모양 요리용 타이머를 사용한 데서 유래했습니다.
          </Text>
          <View style={styles.listContainer}>
            {POMODORO_METHODS.map((item, index) => (
              <Text key={index} style={styles.listItem}>
                • {item}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setToggleExplanation(!toggleExplanation)}
          >
            <Text style={styles.buttonText}>자! 시작해볼까요?</Text>
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
  explanation: {
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
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
  },
  listContainer: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    marginBottom: 10,
  },
  button: {
    width: 150,
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

export default PomodoroDescription;
