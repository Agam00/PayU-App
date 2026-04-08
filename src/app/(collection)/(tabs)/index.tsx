import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import Header from "@/src/components/Header";
import { LinearGradient } from "expo-linear-gradient";
import FAB from "@/src/components/FAB";
import { useFocusEffect, router } from "expo-router";
import { getTransactions, deleteTransaction } from "@/src/storage/transactions";
import { ScrollView } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { Swipeable } from "react-native-gesture-handler";

export default function Index() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all"); // all | income | expense

  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { user } = useAuth();

  // useFocusEffect(
  //   useCallback(() => {
  //     loadTransactions();
  //   }, []),
  // );

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        loadTransactions();
      }
    }, [user]),
  );

  // const loadTransactions = async () => {
  //   const data = await getTransactions();
  //   setTransactions(data);
  // };
  const loadTransactions = async () => {
    if (!user?.id) return;

    const data = await getTransactions(user.id);
    setTransactions(data);
  };

  // 🔥 Filter logic (changed)
  const getFilteredData = () => {
    return transactions.filter((item: any) => {
      const itemDate = new Date(item.date);

      const isSameMonth =
        itemDate.getMonth() === selectedMonth.getMonth() &&
        itemDate.getFullYear() === selectedMonth.getFullYear();

      if (!isSameMonth) return false;

      if (filter === "income") return item.type === "income";
      if (filter === "expense") return item.type === "expense";

      return true;
    });
  };

  const filteredData = getFilteredData();

  // // 🔥 Summary
  // const income = transactions
  //   .filter((t: any) => t.type === "income")
  //   .reduce((sum: number, t: any) => sum + t.amount, 0);

  // const expense = transactions
  //   .filter((t: any) => t.type === "expense")
  //   .reduce((sum: number, t: any) => sum + t.amount, 0);

  // const balance = income - expense;

  // 🗑️ Delete
  // const handleDelete = async (id: number) => {
  //   await deleteTransaction(id);
  //   loadTransactions();
  // };
  const handleDelete = async (id: number) => {
    if (!user?.id) return;

    await deleteTransaction(user.id, id);
    loadTransactions();
  };

  // ✏️ Edit
  const handleEdit = (item: any) => {
    router.push({
      pathname: "/Edit",
      params: { editData: JSON.stringify(item) },
    });
  };

  // 👉 Swipe right actions
  const renderRightActions = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() =>
          Alert.alert("Delete", "Are you sure?", [
            { text: "Cancel" },
            {
              text: "Delete",
              onPress: () => handleDelete(item.id),
              style: "destructive",
            },
          ])
        }
      >
        <Text style={{ color: "#fff" }}>Delete</Text>
      </TouchableOpacity>
    );
  };

  // const addDemoMarchData = async () => {
  //   const existing = await getTransactions();

  //   // ❌ prevent duplicate insert
  //   if (existing.some((t: any) => t.note === "demo-march")) return;

  //   const demoData = [
  //     {
  //       id: Date.now() + 1,
  //       amount: 500,
  //       category: "Food",
  //       note: "demo-march",
  //       type: "expense",
  //       date: "2026-03-05T18:30:00.000Z",
  //     },
  //     {
  //       id: Date.now() + 2,
  //       amount: 3000,
  //       category: "Salary",
  //       note: "demo-march",
  //       type: "income",
  //       date: "2026-03-10T10:00:00.000Z",
  //     },
  //     {
  //       id: Date.now() + 3,
  //       amount: 200,
  //       category: "Travel",
  //       note: "demo-march",
  //       type: "expense",
  //       date: "2026-03-18T14:20:00.000Z",
  //     },
  //   ];

  //   const updated = [...existing, ...demoData];

  //   await AsyncStorage.setItem("transactions", JSON.stringify(updated));
  // };
  // useFocusEffect(
  //   useCallback(() => {
  //     addDemoMarchData(); // 👈 ADD THIS
  //     loadTransactions();
  //   }, []),
  // );

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  });
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Text style={styles.greeting}>Hey, {user.name}</Text>
        <Text style={styles.subText}>Add your yesterday’s expense</Text>

        <LinearGradient
          colors={["#d4caa3", "#3ddc97"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.bank}>ADRBank</Text>
          <Text style={styles.cardNumber}>8763 1111 2222 0329</Text>

          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardLabel}>Card Holder Name</Text>
              <Text style={styles.cardValue}>{user.name.toUpperCase()}</Text>
            </View>

            <View>
              <Text style={styles.cardLabel}>Expired Date</Text>
              <Text style={styles.cardValue}>10/28</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Summary */}
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
              <TouchableOpacity
                key={index}
                style={[styles.monthItem, isActive && styles.activeMonthItem]}
                onPress={() => setSelectedMonth(month)}
              >
                <Text
                  style={[styles.monthText, isActive && styles.activeMonthText]}
                >
                  {month.toLocaleString("default", {
                    month: "short",
                  })}
                </Text>

                <Text
                  style={[styles.yearText, isActive && styles.activeMonthText]}
                >
                  {month.getFullYear()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 🔥 Updated Toggle */}
        {/* <View style={styles.toggle}>
          <TouchableOpacity
            style={filter === "all" ? styles.activeTab : styles.inactiveTab}
            onPress={() => setFilter("all")}
          >
            <Text
              style={filter === "all" ? styles.activeText : styles.inactiveText}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={filter === "income" ? styles.activeTab : styles.inactiveTab}
            onPress={() => setFilter("income")}
          >
            <Text
              style={
                filter === "income" ? styles.activeText : styles.inactiveText
              }
            >
              Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={filter === "expense" ? styles.activeTab : styles.inactiveTab}
            onPress={() => setFilter("expense")}
          >
            <Text
              style={
                filter === "expense" ? styles.activeText : styles.inactiveText
              }
            >
              Expense
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.toggle}>
          {["all", "income", "expense"].map((type) => {
            const isActive = filter === type;

            return (
              <TouchableOpacity
                key={type}
                style={[
                  styles.tab, // ✅ ALWAYS apply base style
                  isActive ? styles.activeTab : styles.inactiveTab,
                ]}
                onPress={() => setFilter(type)}
              >
                <Text
                  style={isActive ? styles.activeText : styles.inactiveText}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Transactions */}
        {filteredData.length === 0 ? (
          <Text style={{ color: "#888", marginTop: 20 }}>
            No transactions yet
          </Text>
        ) : (
          filteredData.map((item: any) => {
            const time = new Date(item.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Swipeable
                key={item.id}
                renderRightActions={() => renderRightActions(item)}
              >
                <View style={styles.expenseCard}>
                  <View>
                    <Text style={styles.expenseTitle}>
                      {item.category.toUpperCase()}
                    </Text>

                    {/* 📝 Note */}
                    <Text style={styles.expenseNote}>
                      {item.note ? item.note : "No note"}
                    </Text>

                    {/* 📅 Date + Time */}
                    <Text style={styles.expenseSub}>
                      {new Date(item.date).toLocaleDateString()} • {time}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={[
                        styles.amount,
                        {
                          color: item.type === "income" ? "#22c55e" : "#ef4444",
                        },
                      ]}
                    >
                      {item.type === "income" ? "+ ₹" : "- ₹"}
                      {item.amount}
                    </Text>

                    {/* ✏️ Edit */}
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Swipeable>
            );
          })
        )}
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

  greeting: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 50,
  },

  subText: {
    color: "#888",
    marginBottom: 15,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
  },

  bank: {
    color: "#fff",
    fontWeight: "600",
  },

  cardNumber: {
    color: "#fff",
    fontSize: 20,
    marginVertical: 20,
    letterSpacing: 2,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardLabel: {
    color: "#eee",
    fontSize: 12,
  },

  cardValue: {
    color: "#fff",
    fontWeight: "600",
  },

  // toggle: {
  //   flexDirection: "row",
  //   backgroundColor: "#222",
  //   borderRadius: 20,
  //   padding: 5,
  //   alignItems: "center",
  //   marginTop: 10,
  // },

  // activeTab: {
  //   backgroundColor: "#ddd",
  //   paddingVertical: 6,
  //   paddingHorizontal: 20,
  //   borderRadius: 20,
  // },

  // activeText: {
  //   color: "#000",
  //   fontWeight: "500",
  // },

  // inactiveText: {
  //   color: "#aaa",
  // },

  // inactiveTab: {
  //   flex: 1,
  //   paddingVertical: 6,
  //   alignItems: "center",
  // },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 25,
    padding: 4,
    marginTop: 15,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#fff",
  },

  inactiveTab: {
    backgroundColor: "transparent",
  },

  activeText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
  },

  inactiveText: {
    color: "#888",
    fontSize: 14,
  },
  expenseCard: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  expenseTitle: {
    color: "#fff",
    fontWeight: "600",
  },

  expenseSub: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },

  amount: {
    fontWeight: "600",
  },

  summary: {
    marginTop: 15,
    marginBottom: 10,
    gap: 5,
  },

  editText: {
    color: "#3b82f6",
    fontSize: 12,
    marginTop: 5,
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginTop: 15,
  },
  expenseNote: {
    color: "#bbb",
    fontSize: 12,
    marginTop: 3,
  },
  monthSlider: {
    marginTop: 15,
  },

  monthItem: {
    backgroundColor: "#222",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 10,
    alignItems: "center",
  },

  activeMonthItem: {
    backgroundColor: "#fff",
  },

  monthText: {
    color: "#aaa",
    fontSize: 14,
  },

  yearText: {
    color: "#666",
    fontSize: 10,
  },

  activeMonthText: {
    color: "#000",
    fontWeight: "600",
  },
});
