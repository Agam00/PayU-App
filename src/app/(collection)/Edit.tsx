import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { updateTransaction } from "@/src/storage/transactions";
import { useAuth } from "@/src/context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Edit() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [id, setId] = useState<number | null>(null);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (params.editData) {
        const data = JSON.parse(params.editData as string);

        setId(data.id);
        setAmount(String(data.amount));
        setCategory(data.category);
        setNote(data.note);
        setType(data.type);
      }
    }, [params.editData]),
  );
  const handleUpdate = async () => {
    if (!amount || !category) {
      alert("Fill required fields");
      return;
    }

    const updatedTransaction = {
      id,
      amount: Number(amount),
      category,
      note,
      type,
      date: new Date().toISOString(),
    };

    await updateTransaction(user.id, updatedTransaction);

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Transaction</Text>

      {/* Toggle */}
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

      {/* Update Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
        <Text style={{ color: "#000", fontWeight: "600" }}>Update</Text>
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
