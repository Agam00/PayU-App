// import { Stack } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { AuthProvider } from "@/src/context/AuthContext";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(collection)" />
//         </Stack>
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/src/context/AuthContext";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000" }}>
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#000" }, // 👈 IMPORTANT
            }}
          >
            <Stack.Screen name="(collection)" />
          </Stack>
        </View>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
