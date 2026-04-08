import AsyncStorage from "@react-native-async-storage/async-storage";

const getKey = (userId: string) => `transactions_${userId}`;

export const addTransaction = async (userId: string, data: any) => {
  try {
    const KEY = getKey(userId);

    const existing = await AsyncStorage.getItem(KEY);
    const transactions = existing ? JSON.parse(existing) : [];

    const newData = {
      id: Date.now(),
      ...data,
    };

    transactions.push(newData);

    await AsyncStorage.setItem(KEY, JSON.stringify(transactions));
  } catch (error) {
    console.log("Error saving:", error);
  }
};

export const getTransactions = async (userId: string) => {
  try {
    const KEY = getKey(userId);

    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error fetching:", error);
    return [];
  }
};

export const deleteTransaction = async (userId: string, id: number) => {
  const KEY = getKey(userId);

  const data = await AsyncStorage.getItem(KEY);
  const transactions = data ? JSON.parse(data) : [];

  const updated = transactions.filter((item: any) => item.id !== id);

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};

export const updateTransaction = async (userId: string, updatedItem: any) => {
  const KEY = getKey(userId);

  const data = await AsyncStorage.getItem(KEY);
  const transactions = data ? JSON.parse(data) : [];

  const updated = transactions.map((item: any) =>
    item.id === updatedItem.id ? updatedItem : item,
  );

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};

export const getSummary = async (userId: string) => {
  try {
    const KEY = getKey(userId);

    const data = await AsyncStorage.getItem(KEY);
    const transactions = data ? JSON.parse(data) : [];

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item: any) => {
      if (item.type === "income") {
        totalIncome += Number(item.amount);
      } else {
        totalExpense += Number(item.amount);
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  } catch (error) {
    console.log("Error calculating summary:", error);
    return {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    };
  }
};
