import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useEffect, useState } from "react";
import Header from "@/src/components/Header";
import FAB from "@/src/components/FAB";

import { logout, updateUser } from "@/src/storage/auth";
import { useAuth } from "@/src/context/AuthContext";
import { getSummary } from "@/src/storage/transactions";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [isEdit, setIsEdit] = useState(false);

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadSummary();

    // prefill form
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  }, [user]);

  const loadSummary = async () => {
    if (!user?.id) return; // ✅ important

    const data = await getSummary(user.id); // ✅ FIXED
    setSummary(data);
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res) setUser(null);
  };

  const handleUpdate = async () => {
    const res = await updateUser(form);

    if (res) {
      // update context
      setUser((prev: any) => ({
        ...prev,
        ...form,
      }));

      setIsEdit(false);
      console.log("Profile updated");
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* User Row */}
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
      </View>

      {/* Toggle */}
      <View style={styles.toggle}>
        <Pressable
          style={isEdit ? styles.inactiveTab : styles.activeTab}
          onPress={() => setIsEdit(false)}
        >
          <Text style={isEdit ? styles.inactiveText : styles.activeText}>
            Preview
          </Text>
        </Pressable>

        <Pressable
          style={isEdit ? styles.activeTab : styles.inactiveTab}
          onPress={() => setIsEdit(true)}
        >
          <Text style={isEdit ? styles.activeText : styles.inactiveText}>
            Edit
          </Text>
        </Pressable>
      </View>

      {/* ===== PREVIEW MODE ===== */}
      {!isEdit && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Total spendings:{" "}
            <Text style={styles.value}>₹ {summary.totalExpense}</Text>
          </Text>

          <Text style={styles.label}>
            Email : <Text style={styles.value}>{user?.email}</Text>
          </Text>

          <Text style={styles.label}>
            Balance : <Text style={styles.value}>₹ {summary.balance}</Text>
          </Text>
        </View>
      )}

      {/* ===== EDIT MODE ===== */}
      {isEdit && (
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#888"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry
            style={styles.input}
          />

          <Pressable style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateText}>Update</Text>
          </Pressable>
        </View>
      )}

      {/* Logout */}
      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

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

  form: {
    marginTop: 25,
    gap: 15,
  },

  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
  },

  updateBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  updateText: {
    color: "#fff",
    fontWeight: "600",
  },

  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});
