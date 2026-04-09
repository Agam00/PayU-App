import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "Users";

// export const addUser = async (
//   name: string,
//   email: string,
//   password: string,
// ) => {
//   try {
//     const existing = await AsyncStorage.getItem(KEY);
//     const users = existing ? JSON.parse(existing) : [];

//     const existingUser = users.find((u: any) => u.email === email);
//     if (existingUser) {
//       console.log("User already exists");
//       return false;
//     }

//     const newData = {
//       id: email,
//       name,
//       email,
//       password,
//     };

//     users.push(newData);

//     await AsyncStorage.setItem(KEY, JSON.stringify(users));
//     console.log("user registered");
//     return true;
//   } catch (error) {
//     console.log("Error saving:", error);
//   }
// };

export const addUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const existing = await AsyncStorage.getItem(KEY);
    const users = existing ? JSON.parse(existing) : [];

    const existingUser = users.find((u: any) => u.email === email);

    if (existingUser) {
      return "USER_EXISTS"; // ✅ FIX HERE
    }

    const newData = {
      id: email,
      name,
      email,
      password,
    };

    users.push(newData);

    await AsyncStorage.setItem(KEY, JSON.stringify(users));

    return true;
  } catch (error) {
    console.log("Error saving:", error);
    return false;
  }
};
const SESSION_KEY = "SESSION";

export const login = async (email: string, password: string) => {
  try {
    const existing = await AsyncStorage.getItem(KEY);
    const users = existing ? JSON.parse(existing) : [];

    const user = users.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (user) {
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

export const updateUser = async (updatedData: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  try {
    const existing = await AsyncStorage.getItem(KEY);
    const users = existing ? JSON.parse(existing) : [];

    const sessionData = await AsyncStorage.getItem(SESSION_KEY);
    const currentUser = sessionData ? JSON.parse(sessionData) : null;

    if (!currentUser) {
      console.log("No user logged in");
      return false;
    }

    const updatedUsers = users.map((user: any) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          ...updatedData, // merge new values
        };
      }
      return user;
    });

    await AsyncStorage.setItem(KEY, JSON.stringify(updatedUsers));

    const updatedCurrentUser = {
      ...currentUser,
      ...updatedData,
    };

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updatedCurrentUser));

    console.log("User updated successfully");
    return true;
  } catch (error) {
    console.log("Error updating user:", error);
    return false;
  }
};
