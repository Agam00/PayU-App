import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "@/src/components/Header";
import FAB from "@/src/components/FAB";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Header />

      {/* User Row */}
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>P</Text>
        </View>
        <Text style={styles.name}>Alex yu</Text>
      </View>

      {/* Toggle */}
      <View style={styles.toggle}>
        <View style={styles.activeTab}>
          <Text style={styles.activeText}>Preview</Text>
        </View>

        <View style={styles.inactiveTab}>
          <Text style={styles.inactiveText}>Edit</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          Total spendings: <Text style={styles.value}>$2000</Text>
        </Text>

        <Text style={styles.label}>
          Email : <Text style={styles.value}>alex@gmail.com</Text>
        </Text>

        <Text style={styles.label}>
          Balance : <Text style={styles.value}>$20000</Text>
        </Text>
      </View>

      {/* Floating Button */}
      <FAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    gap: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#000",
    fontWeight: "600",
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 25,
    padding: 4,
    marginTop: 20,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },

  inactiveTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },

  activeText: {
    color: "#000",
    fontWeight: "500",
  },

  inactiveText: {
    color: "#aaa",
    fontWeight: "500",
  },

  infoContainer: {
    marginTop: 25,
    gap: 15,
  },

  label: {
    color: "#aaa",
    fontSize: 14,
  },

  value: {
    color: "#fff",
    fontWeight: "600",
  },
});
