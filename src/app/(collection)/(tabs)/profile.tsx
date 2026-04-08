import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "@/src/components/Header";
import FAB from "@/src/components/FAB";

import { logout, updateUser } from "@/src/storage/auth";
import { useAuth } from "@/src/context/AuthContext";
import { getTransactions } from "@/src/storage/transactions";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔥 load summary when user or month changes
  useEffect(() => {
    loadSummary();

    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  }, [user, selectedMonth]);

  const loadSummary = async () => {
    if (!user?.id) return;

    const transactions = await getTransactions(user.id);

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item: any) => {
      const date = new Date(item.date);

      const isSameMonth =
        date.getMonth() === selectedMonth.getMonth() &&
        date.getFullYear() === selectedMonth.getFullYear();

      if (!isSameMonth) return;

      if (item.type === "income") totalIncome += item.amount;
      if (item.type === "expense") totalExpense += item.amount;
    });

    setSummary({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res) setUser(null);
  };

  const handleUpdate = async () => {
    const res = await updateUser(form);

    if (res) {
      setUser((prev: any) => ({
        ...prev,
        ...form,
      }));

      setIsEdit(false);
    }
  };

  // 🔥 months array (same as balances)
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        {/* User Row */}
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>
            {user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}
          </Text>
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

        {/* 🔥 Month Slider */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.monthSlider}
        >
          {months.map((month, index) => {
            const isActive =
              month.getMonth() === selectedMonth.getMonth() &&
              month.getFullYear() === selectedMonth.getFullYear();

            return (
              <Text
                key={index}
                onPress={() => setSelectedMonth(month)}
                style={[styles.monthItem, isActive && styles.activeMonthItem]}
              >
                {month.toLocaleString("default", {
                  month: "short",
                })}{" "}
                {month.getFullYear()}
              </Text>
            );
          })}
        </ScrollView>

        {/* ===== PREVIEW MODE ===== */}
        {!isEdit && (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>
              Total spendings:{" "}
              <Text style={styles.value}>₹ {summary.totalExpense}</Text>
            </Text>

            <Text style={styles.label}>
              Total income:{" "}
              <Text style={styles.value}>₹ {summary.totalIncome}</Text>
            </Text>

            <Text style={styles.label}>
              Balance: <Text style={styles.value}>₹ {summary.balance}</Text>
            </Text>

            <Text style={styles.label}>
              Email: <Text style={styles.value}>{user?.email}</Text>
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
      </ScrollView>

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

  // 🔥 Month styles
  monthSlider: {
    marginTop: 15,
    marginBottom: 10,
  },

  monthItem: {
    backgroundColor: "#222",
    color: "#aaa",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    overflow: "hidden",
  },

  activeMonthItem: {
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "600",
  },
});
