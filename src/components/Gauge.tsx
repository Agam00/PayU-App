// import { View, Text, StyleSheet } from "react-native";
// import Svg, { Circle } from "react-native-svg";

// export default function Gauge() {
//   const radius = 100;
//   const strokeWidth = 14;
//   const circumference = Math.PI * radius; // half circle

//   return (
//     <View style={styles.container}>
//       <Svg width={260} height={150}>
//         {/* Background arc */}
//         <Circle
//           cx="130"
//           cy="130"
//           r={radius}
//           stroke="#222"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference} ${circumference}`}
//           rotation="-180"
//           origin="130,130"
//         />

//         {/* Colored segments */}
//         <Circle
//           cx="130"
//           cy="130"
//           r={radius}
//           stroke="#3ddc97"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.4} ${circumference}`}
//           rotation="-180"
//           origin="130,130"
//           strokeLinecap="round"
//         />

//         <Circle
//           cx="130"
//           cy="130"
//           r={radius}
//           stroke="#e879f9"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.25} ${circumference}`}
//           strokeDashoffset={-circumference * 0.4}
//           rotation="-180"
//           origin="130,130"
//           strokeLinecap="round"
//         />

//         <Circle
//           cx="130"
//           cy="130"
//           r={radius}
//           stroke="#60a5fa"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.2} ${circumference}`}
//           strokeDashoffset={-circumference * 0.65}
//           rotation="-180"
//           origin="130,130"
//           strokeLinecap="round"
//         />

//         <Circle
//           cx="130"
//           cy="130"
//           r={radius}
//           stroke="#facc15"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.15} ${circumference}`}
//           strokeDashoffset={-circumference * 0.85}
//           rotation="-180"
//           origin="130,130"
//           strokeLinecap="round"
//         />
//       </Svg>

//       {/* Center Text */}
//       <View style={styles.center}>
//         <Text style={styles.score}>660</Text>
//         <Text style={styles.label}>Your Credit Score is average</Text>
//         <Text style={styles.sub}>Last Check on 21 Apr</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   center: {
//     position: "absolute",
//     top: 60,
//     alignItems: "center",
//   },
//   score: {
//     fontSize: 40,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   label: {
//     color: "#ccc",
//     fontSize: 14,
//   },
//   sub: {
//     color: "#666",
//     fontSize: 12,
//   },
// });

// import { View, Text, StyleSheet, Animated, Easing } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import Svg, { Circle, G } from "react-native-svg";

// export default function Gauge() {
//   const radius = 100;
//   const strokeWidth = 14;
//   const centerX = 130;
//   const centerY = 130;

//   const circumference = Math.PI * radius;

//   const score = 660;

//   const animatedValue = useRef(new Animated.Value(0)).current;
//   const [displayScore, setDisplayScore] = useState(0);

//   useEffect(() => {
//     animatedValue.addListener(({ value }) => {
//       setDisplayScore(Math.floor(value)); // ✅ FIX: remove decimals
//     });

//     Animated.timing(animatedValue, {
//       toValue: score,
//       duration: 1200,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: false,
//     }).start();

//     return () => animatedValue.removeAllListeners();
//   }, []);

//   // 🎯 Convert score → angle
//   const angle = animatedValue.interpolate({
//     inputRange: [0, 1000],
//     outputRange: [-180, 0],
//   });

//   // 🎯 Convert angle → radians (JS side calculation)
//   const getPointer = (val: number) => {
//     const ang = -180 + (val / 1000) * 180;
//     const rad = (ang * Math.PI) / 180;

//     return {
//       x: centerX + radius * Math.cos(rad),
//       y: centerY + radius * Math.sin(rad),
//     };
//   };

//   const [pointer, setPointer] = useState(getPointer(0));

//   useEffect(() => {
//     const id = animatedValue.addListener(({ value }) => {
//       setPointer(getPointer(value));
//     });

//     return () => animatedValue.removeListener(id);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Svg width={260} height={160}>
//         {/* Background */}
//         <Circle
//           cx={centerX}
//           cy={centerY}
//           r={radius}
//           stroke="#1f1f1f"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference} ${circumference}`}
//           rotation="-180"
//           origin={`${centerX},${centerY}`}
//         />

//         {/* Segments */}
//         <Circle
//           cx={centerX}
//           cy={centerY}
//           r={radius}
//           stroke="#34d399"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.35} ${circumference}`}
//           rotation="-180"
//           origin={`${centerX},${centerY}`}
//           strokeLinecap="round"
//         />

//         <Circle
//           cx={centerX}
//           cy={centerY}
//           r={radius}
//           stroke="#e879f9"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.25} ${circumference}`}
//           strokeDashoffset={-circumference * 0.35}
//           rotation="-180"
//           origin={`${centerX},${centerY}`}
//           strokeLinecap="round"
//         />

//         <Circle
//           cx={centerX}
//           cy={centerY}
//           r={radius}
//           stroke="#60a5fa"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.2} ${circumference}`}
//           strokeDashoffset={-circumference * 0.6}
//           rotation="-180"
//           origin={`${centerX},${centerY}`}
//           strokeLinecap="round"
//         />

//         <Circle
//           cx={centerX}
//           cy={centerY}
//           r={radius}
//           stroke="#facc15"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={`${circumference * 0.2} ${circumference}`}
//           strokeDashoffset={-circumference * 0.8}
//           rotation="-180"
//           origin={`${centerX},${centerY}`}
//           strokeLinecap="round"
//         />

//         {/* 🔵 REAL CURVED POINTER */}
//         <G>
//           <Circle cx={pointer.x} cy={pointer.y} r={6} fill="#60a5fa" />
//           <Circle
//             cx={pointer.x}
//             cy={pointer.y}
//             r={10}
//             fill="rgba(96,165,250,0.2)"
//           />
//         </G>
//       </Svg>

//       {/* ✅ FIXED NUMBER */}
//       <View style={styles.center}>
//         <Text style={styles.score}>{displayScore}</Text>
//         <Text style={styles.label}>Your Credit Score is average</Text>
//         <Text style={styles.sub}>Last Check on 21 Apr</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     marginVertical: 20,
//   },

//   center: {
//     position: "absolute",
//     top: 65,
//     alignItems: "center",
//   },

//   score: {
//     fontSize: 42,
//     color: "#fff",
//     fontWeight: "700",
//   },

//   label: {
//     color: "#ccc",
//     fontSize: 14,
//     marginTop: 4,
//   },

//   sub: {
//     color: "#666",
//     fontSize: 12,
//     marginTop: 2,
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop, G } from "react-native-svg";

export default function Gauge() {
  const radius = 100;
  const strokeWidth = 14;
  const centerX = 130;
  const centerY = 130;

  const circumference = Math.PI * radius;

  const score = 660;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayScore, setDisplayScore] = useState(0);
  const [pointer, setPointer] = useState({ x: centerX, y: centerY });

  useEffect(() => {
    const id = animatedValue.addListener(({ value }) => {
      setDisplayScore(Math.floor(value));

      // 🎯 pointer math
      const angle = -180 + (value / 1000) * 180;
      const rad = (angle * Math.PI) / 180;

      setPointer({
        x: centerX + radius * Math.cos(rad),
        y: centerY + radius * Math.sin(rad),
      });
    });

    Animated.timing(animatedValue, {
      toValue: score,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    return () => animatedValue.removeListener(id);
  }, []);

  // 🎯 Animated arc fill
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1000],
    outputRange: [circumference * 1.01, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={260} height={160}>
        {/* 🌈 Gradient */}
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset={0} stopColor="#22c55e" />
            <Stop offset={0.3} stopColor="#4ade80" />
            <Stop offset={0.6} stopColor="#facc15" />
            <Stop offset={0.85} stopColor="#fb923c" />
            <Stop offset={1} stopColor="#ef4444" />
          </LinearGradient>
        </Defs>

        {/* Background */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="#1f1f1f"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          transform={`rotate(-180 ${centerX} ${centerY})`}
        />

        {/* 🔥 Animated Gradient Arc */}
        <AnimatedCircle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-180 ${centerX} ${centerY})`}
          strokeLinecap="round"
        />

        {/* 🔵 Pointer */}
        <G>
          <Circle cx={pointer.x} cy={pointer.y} r={6} fill="#60a5fa" />
          <Circle
            cx={pointer.x}
            cy={pointer.y}
            r={10}
            fill="rgba(96,165,250,0.2)"
          />
        </G>
      </Svg>

      {/* Center */}
      <View style={styles.center}>
        <Text style={styles.score}>{displayScore}</Text>
        <Text style={styles.label}>Your Credit Score is average</Text>
        <Text style={styles.sub}>Last Check on 21 Apr</Text>
      </View>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },

  center: {
    position: "absolute",
    top: 65,
    alignItems: "center",
  },

  score: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "700",
  },

  label: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 4,
  },

  sub: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },
});
