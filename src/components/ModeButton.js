import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ModeButton = ({ mode, setMode, label }) => {
  const colorByMode =
    mode === "pomodoro"
      ? "#EC2D01"
      : mode === "shortBreak"
      ? "#4E9196"
      : "#4F7FA2";

  const labelText =
    label === "pomodoro"
      ? "뽀모도로"
      : label === "shortBreak"
      ? "짧은 휴식"
      : "긴 휴식";

  return (
    <TouchableOpacity
      style={[styles.menuButton, { borderColor: colorByMode }]}
      onPress={() => setMode(label)}
    >
      <Text style={[styles.menuText, { color: colorByMode }]}>{labelText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    width: "auto",
    height: 25,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 8,
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
  menuText: {
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },
});

export default ModeButton;
