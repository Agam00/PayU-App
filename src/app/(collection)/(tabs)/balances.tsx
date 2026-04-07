import { View, ScrollView, StyleSheet, Text } from "react-native";
import Header from "@/src/components/Header";
import Gauge from "@/src/components/Gauge";
import CurrencyCard from "@/src/components/CurrencyCard";

import FAB from "@/src/components/FAB";

import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getTransactions } from "@/src/storage/transactions";

import CustomChart from "@/src/components/CustomChart";

export default function Balances() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const getWeeklyData = () => {
    const daysInMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0,
    ).getDate();

    const dailyData = Array(daysInMonth).fill(0);

    transactions.forEach((item: any) => {
      const date = new Date(item.date);

      const isSameMonth =
        date.getMonth() === selectedMonth.getMonth() &&
        date.getFullYear() === selectedMonth.getFullYear();

      if (isSameMonth && item.type === "expense") {
        const day = date.getDate() - 1;
        dailyData[day] += item.amount;
      }
    });

    // 🔥 convert to weekly
    const weeklyData = [];
    for (let i = 0; i < dailyData.length; i += 7) {
      const sum = dailyData.slice(i, i + 7).reduce((a, b) => a + b, 0);
      weeklyData.push(sum);
    }

    return weeklyData;
  };

  const weeklyData = getWeeklyData();

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Text style={styles.heading}>Your Balances</Text>
        <Text style={styles.sub}>Manage your multi-currency accounts</Text>

        <Gauge />

        <Text style={styles.section}>Available Currencies</Text>
        <CurrencyCard />
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
        {/* 🔥 Chart with REAL data */}
        {/* <Chart transactions={transactions} selectedMonth={selectedMonth} /> */}
        <CustomChart
          weeklyData={weeklyData}
          transactions={transactions}
          selectedMonth={selectedMonth}
        />
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
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sub: {
    color: "#aaa",
    marginBottom: 10,
  },
  section: {
    color: "#fff",
    marginTop: 10,
    marginBottom: 5,
  },
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
