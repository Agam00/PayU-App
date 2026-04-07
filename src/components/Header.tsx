import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <View style={styles.container}>
      {/* LEFT */}
      <View style={styles.left}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>P</Text>
        </View>
        <Text style={styles.title}>PayU</Text>
      </View>

      {/* RIGHT */}
      <View style={styles.right}>
        <Ionicons name="search" size={20} color="#fff" />

        <View>
          <Ionicons name="notifications-outline" size={22} color="#fff" />

          {/* 🔴 Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40, // 🔥 for status bar
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontWeight: "bold",
    color: "#000",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginRight: 15,
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
