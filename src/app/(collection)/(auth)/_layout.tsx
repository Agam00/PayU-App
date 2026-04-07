// import { Stack } from "expo-router";

// export default function AuthLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {/* <Stack.Screen name="signIn" />
//       <Stack.Screen name="signUp" /> */}
//       <Stack.Screen name="authScreen" />
//     </Stack>
//   );
// }
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
