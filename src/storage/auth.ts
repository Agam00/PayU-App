import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "Users";

// Save new user
export const addUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const existing = await AsyncStorage.getItem(KEY);
    const users = existing ? JSON.parse(existing) : [];

    const newData = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newData);

    await AsyncStorage.setItem(KEY, JSON.stringify(users));
    console.log("user registered");
    return true;
  } catch (error) {
    console.log("Error saving:", error);
  }
};

// export const login = async (email: string, password: string) => {
//   try {
//     const existing = await AsyncStorage.getItem(KEY);
//     const users = existing ? JSON.parse(existing) : [];

//     // find user with matching email + password
//     const user = users.find(
//       (u: any) => u.email === email && u.password === password,
//     );

//     if (user) {
//       console.log("Login successful", user);
//       return true; // ✅ return user data
//     } else {
//       console.log("Invalid email or password");
//       return false;
//     }
//   } catch (error) {
//     console.log("Error logging in:", error);
//     return null;
//   }
// };

const SESSION_KEY = "SESSION";

export const login = async (email: string, password: string) => {
  try {
    const existing = await AsyncStorage.getItem(KEY);
    const users = existing ? JSON.parse(existing) : [];

    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (user) {
      // ✅ SAVE SESSION
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));

      console.log("Login successful");
      return true;
    } else {
      console.log("Invalid email or password");
      return false;
    }
  } catch (error) {
    console.log("Error logging in:", error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await AsyncStorage.getItem("SESSION");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("SESSION");
    console.log("Logged out");
    return true;
  } catch (e) {
    console.log("Logout error", e);
    return false;
  }
};
