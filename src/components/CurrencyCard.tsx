import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CurrencyCard() {
  return (
    <LinearGradient colors={["#1a1a1a", "#0a0a0a"]} style={styles.card}>
      <View>
        <Text style={styles.title}>CAD</Text>
        <Text style={styles.sub}>Canadian Dollar</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>+ Enable</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sub: {
    color: "#aaa",
  },
  btn: {
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
  },
});
