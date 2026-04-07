import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function Gauge() {
  const radius = 100;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // half circle

  return (
    <View style={styles.container}>
      <Svg width={260} height={150}>
        {/* Background arc */}
        <Circle
          cx="130"
          cy="130"
          r={radius}
          stroke="#222"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          rotation="-180"
          origin="130,130"
        />

        {/* Colored segments */}
        <Circle
          cx="130"
          cy="130"
          r={radius}
          stroke="#3ddc97"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference * 0.4} ${circumference}`}
          rotation="-180"
          origin="130,130"
          strokeLinecap="round"
        />

        <Circle
          cx="130"
          cy="130"
          r={radius}
          stroke="#e879f9"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference * 0.25} ${circumference}`}
          strokeDashoffset={-circumference * 0.4}
          rotation="-180"
          origin="130,130"
          strokeLinecap="round"
        />

        <Circle
          cx="130"
          cy="130"
          r={radius}
          stroke="#60a5fa"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference * 0.2} ${circumference}`}
          strokeDashoffset={-circumference * 0.65}
          rotation="-180"
          origin="130,130"
          strokeLinecap="round"
        />

        <Circle
          cx="130"
          cy="130"
          r={radius}
          stroke="#facc15"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference * 0.15} ${circumference}`}
          strokeDashoffset={-circumference * 0.85}
          rotation="-180"
          origin="130,130"
          strokeLinecap="round"
        />
      </Svg>

      {/* Center Text */}
      <View style={styles.center}>
        <Text style={styles.score}>660</Text>
        <Text style={styles.label}>Your Credit Score is average</Text>
        <Text style={styles.sub}>Last Check on 21 Apr</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  center: {
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  score: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    color: "#ccc",
    fontSize: 14,
  },
  sub: {
    color: "#666",
    fontSize: 12,
  },
});
