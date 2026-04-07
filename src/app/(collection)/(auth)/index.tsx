import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getCurrentUser } from "@/src/storage/auth";
import { useAuth } from "@/src/context/AuthContext";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { addUser, login } from "@/src/storage/auth"; // adjust path if needed

import { router } from "expo-router";

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const Colors = {
    background: "#0A0F1C",
    card: "#111827",
    input: "#0F172A",
    border: "#1F2937",
    textPrimary: "#FFFFFF",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      console.log("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await addUser(name, email, password);

    setLoading(false);

    if (res) {
      console.log("user registered");
      setActiveTab("signin"); // switch to login
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      console.log("Fill all fields");
      return;
    }

    setLoading(true);

    const res = await login(email, password);

    setLoading(false);

    if (res) {
      const user = await getCurrentUser(); // get saved user
      setUser(user); // 🔥 update instantly
    } else {
      console.log("Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* LOGO */}
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>P</Text>
          </View>

          <Text style={styles.title}>Welcome to PayU</Text>
          <Text style={styles.subtitle}>
            Send money globally with the real exchange rate
          </Text>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.getStarted}>Get started</Text>
            <Text style={styles.smallText}>
              Sign in to your account or create a new one
            </Text>

            {/* TOGGLE */}
            <View style={styles.toggle}>
              <Pressable
                onPress={() => setActiveTab("signin")}
                style={[
                  styles.toggleBtn,
                  activeTab === "signin" && styles.activeToggle,
                ]}
              >
                <Text
                  style={
                    activeTab === "signin"
                      ? styles.activeToggleText
                      : styles.toggleText
                  }
                >
                  Sign In
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setActiveTab("signup")}
                style={[
                  styles.toggleBtn,
                  activeTab === "signup" && styles.activeToggle,
                ]}
              >
                <Text
                  style={
                    activeTab === "signup"
                      ? styles.activeToggleText
                      : styles.toggleText
                  }
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>

            {/* ================= FORM SWITCH ================= */}

            {activeTab === "signin" ? (
              <>
                {/* EMAIL */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />

                {/* PASSWORD */}
                <Text style={styles.label}>Password</Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                  <Pressable
                    onPress={() => setSecureText(!secureText)}
                    style={styles.eye}
                  >
                    <Ionicons
                      name={secureText ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#9CA3AF"
                    />
                  </Pressable>
                </View>

                <Text style={styles.forgot}>Forgot password?</Text>

                <Pressable style={styles.button} onPress={handleLogin}>
                  {loading ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                  )}
                </Pressable>
              </>
            ) : (
              <>
                {/* NAME */}
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.textMuted}
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />

                {/* EMAIL */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />

                {/* PASSWORD */}
                <Text style={styles.label}>Password</Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    placeholder="Create a password"
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                  <Pressable
                    onPress={() => setSecureText(!secureText)}
                    style={styles.eye}
                  >
                    <Ionicons
                      name={secureText ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#9CA3AF"
                    />
                  </Pressable>
                </View>

                {/* CONFIRM PASSWORD */}
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  placeholder="Confirm your password"
                  placeholderTextColor={Colors.textMuted}
                  secureTextEntry={secureText}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                />

                <Pressable style={styles.button} onPress={handleSignUp}>
                  {loading ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text style={styles.buttonText}>Create Account</Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },

  logoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  logoText: {
    fontSize: 22,
    fontWeight: "700",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 24,
  },

  card: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
  },

  getStarted: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  smallText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 16,
  },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#1F2937",
    borderRadius: 20,
    padding: 4,
    marginBottom: 16,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 16,
  },

  activeToggle: {
    backgroundColor: "#E5E7EB",
  },

  toggleText: {
    color: "#9CA3AF",
    fontSize: 13,
  },

  activeToggleText: {
    color: "#000",
    fontWeight: "600",
  },

  label: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#0F172A",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
  },

  eye: {
    position: "absolute",
    right: 12,
    top: 12,
  },

  forgot: {
    textAlign: "right",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 15,
  },
});
