import { StyleSheet, Text, View } from "react-native";
import { POMODORO_METHODS } from "../constants";

function PomodoroDescription() {
  return (
    <View style={styles.explanation}>
      <Text style={styles.paragraph}>
        포모도로 기법은 Francesco Cirillo가 개발한 시간 관리 방법론입니다.
        하루를 정해진 시간 간격으로 쪼개 활용하는 이 기법의 이름은 '토마토'를
        의미하는 이탈리아 단어를 따라 붙여졌습니다. Cirillo가 시간을 잴 때
        토마토 모양 요리용 타이머를 사용한 데서 유래했습니다.
      </Text>
      <View style={styles.listContainer}>
        {POMODORO_METHODS.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>
      <Text style={styles.footer}>자! 시작해볼까요?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  explanation: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#A1CBA1",
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
  footer: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PomodoroDescription;
