import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "transactions";

// Save new transaction
export const addTransaction = async (data: any) => {
  try {
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

// Get all transactions
export const getTransactions = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error fetching:", error);
    return [];
  }
};
export const deleteTransaction = async (id: number) => {
  const data = await AsyncStorage.getItem(KEY);
  const transactions = data ? JSON.parse(data) : [];

  const updated = transactions.filter((item: any) => item.id !== id);

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};

export const updateTransaction = async (updatedItem: any) => {
  const data = await AsyncStorage.getItem(KEY);
  const transactions = data ? JSON.parse(data) : [];

  const updated = transactions.map((item: any) =>
    item.id === updatedItem.id ? updatedItem : item,
  );

  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
};
