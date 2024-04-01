import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const ControlButton = ({ onPress, onPressReset, label, colorByMode }) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={[styles.buttonText, { color: colorByMode }]}>{label}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressReset}>
        <Image
          style={styles.resetIcon}
          source={require("../../assets/reset.png")}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 70,
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
  buttonText: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  resetIcon: {
    position: "absolute",
    width: 50,
    height: 50,
    marginLeft: 15,
    marginTop: 10,
  },
});

export default ControlButton;
