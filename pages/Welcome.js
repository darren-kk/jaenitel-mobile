import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function Welcome({ navigation }) {
  const [toggleExplanation, setToggleExplanation] = useState(false);

  const listItems = [
    "할 일 목록에 달성하려는 목표나 완료하려는 작업 설정",
    "포모도로 타이머 설정",
    "정해진 시간 동안 일에 집중",
    "타이머가 울리면 작업에 체크 표시",
    "각 세션이 끝날 때마다 5분간 휴식",
    "네 번째 세션 후에는 15~30분의 긴 휴식",
    "타이머를 다시 설정해 이 과정을 한 번 더 반복",
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Tech-Pomodorian</Text>
        <Image
          style={styles.Timer}
          source={require("../assets/pomodoroTimer.png")}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Timer")}
        >
          <Text style={styles.buttonText}>Pomodoro 시작하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setToggleExplanation(!toggleExplanation)}
        >
          <Text style={styles.toggleText}>뽀모도로란? 🍅</Text>
        </TouchableOpacity>
        {toggleExplanation && (
          <View style={styles.explanation}>
            <Text style={styles.paragraph}>
              포모도로 기법은 Francesco Cirillo가 개발한 시간 관리 방법론입니다.
              하루를 정해진 시간 간격으로 쪼개 활용하는 이 기법의 이름은
              '토마토'를 의미하는 이탈리아 단어를 따라 붙여졌습니다. Cirillo가
              시간을 잴 때 토마토 모양 요리용 타이머를 사용한 데서 유래했습니다.
            </Text>
            <View style={styles.listContainer}>
              {listItems.map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  • {item}
                </Text>
              ))}
            </View>
            <Text style={styles.footer}>자! 시작해볼까요?</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#A1CBA1",
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 130,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toggle: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    margin: 20,
    alignSelf: "center",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
  },
  Timer: {
    width: 150,
    height: 150,
    margin: 50,
  },
  button: {
    backgroundColor: "#EC2D01",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EC2D01",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
  },
  footer: {
    fontSize: 24,
    fontWeight: "bold",
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
  explanation: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
});
