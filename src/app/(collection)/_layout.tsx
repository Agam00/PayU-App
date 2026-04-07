// import { Stack } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function CollectionLayout() {
//   const isLoggedin = false; // replace with real auth later

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Protected guard={!isLoggedin}>
//         <Stack.Screen name="(auth)" />
//       </Stack.Protected>

//       <Stack.Protected guard={isLoggedin}>
//         <Stack.Screen name="(tabs)" />
//       </Stack.Protected>
//     </Stack>
//   );
// }

// import { Stack } from "expo-router";
// import { useEffect, useState } from "react";
// import { getCurrentUser, login } from "@/src/storage/auth";

// export default function CollectionLayout() {
//   const [isLoggedin, setIsLoggedin] = useState<boolean | null>(null);

//   useEffect(() => {
//     checkUser();
//   }, []);

//   const checkUser = async () => {
//     const user = await getCurrentUser();
//     setIsLoggedin(!!user);
//   };

//   if (isLoggedin === null) return null;

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Protected guard={!isLoggedin}>
//         <Stack.Screen name="(auth)" />
//       </Stack.Protected>

//       <Stack.Protected guard={isLoggedin}>
//         <Stack.Screen name="(tabs)" />
//       </Stack.Protected>
//     </Stack>
//   );
// }

import { Stack } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export default function CollectionLayout() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={user}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
