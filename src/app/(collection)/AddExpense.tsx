import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { addTransaction } from "@/src/storage/transactions";
import { useAuth } from "@/src/context/AuthContext";

export default function AddExpense() {
  const router = useRouter();
  const { user } = useAuth();
  const [type, setType] = useState("expense"); // 🔥 NEW
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  // const handleSave = async () => {
  //   if (!amount || !category) {
  //     alert("Fill required fields");
  //     return;
  //   }

  //   const newTransaction = {
  //     amount: Number(amount),
  //     category,
  //     note,
  //     type, // 🔥 dynamic (income / expense)
  //     date: new Date().toISOString(),
  //   };

  //   await addTransaction(newTransaction);

  //   console.log("Saved:", newTransaction);

  //   // clear inputs (optional but clean)
  //   setAmount("");
  //   setCategory("");
  //   setNote("");

  //   router.back();
  // };
  const handleSave = async () => {
    if (!amount || !category) {
      alert("Fill required fields");
      return;
    }

    if (!user?.id) {
      alert("User not found");
      return;
    }

    const newTransaction = {
      amount: Number(amount),
      category,
      note,
      type,
      date: new Date().toISOString(),
    };

    await addTransaction(user.id, newTransaction); // ✅ FIXED

    console.log("Saved:", newTransaction);

    setAmount("");
    setCategory("");
    setNote("");

    router.back();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      {/* 🔥 Toggle */}
      <View style={styles.toggle}>
        <TouchableOpacity
          style={type === "expense" ? styles.activeTab : styles.inactiveTab}
          onPress={() => setType("expense")}
        >
          <Text
            style={type === "expense" ? styles.activeText : styles.inactiveText}
          >
            Expense
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={type === "income" ? styles.activeTab : styles.inactiveTab}
          onPress={() => setType("income")}
        >
          <Text
            style={type === "income" ? styles.activeText : styles.inactiveText}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <TextInput
        placeholder="Amount"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        placeholder="Category"
        placeholderTextColor="#888"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        placeholder="Note"
        placeholderTextColor="#888"
        style={styles.input}
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={{ color: "#000", fontWeight: "600" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontWeight: "600",
  },

  inactiveText: {
    color: "#aaa",
  },
});
