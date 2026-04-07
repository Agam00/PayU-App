import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#777",

        tabBarStyle: {
          backgroundColor: "#000", // 🔥 dark
          borderTopWidth: 0.5,
          borderTopColor: "#111",
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="balances"
        options={{
          title: "Balances",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
