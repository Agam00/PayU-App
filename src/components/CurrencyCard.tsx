import { Animated, Pressable, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

export default function CurrencyCard() {
  const cardAnim = useRef(new Animated.Value(0)).current;
  const cardFlowAnim = useRef(new Animated.Value(0)).current;

  const cardScale = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });

  const cardRotate = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-1.5deg"],
  });

  const cardGlowMove = cardFlowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 560],
  });

  const cardGlowOpacity = cardFlowAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.42, 0],
  });

  const animateCard = (toValue: number) => {
    Animated.spring(cardAnim, {
      toValue,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(cardFlowAnim, {
        toValue: 1,
        duration: 3600,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [cardFlowAnim]);

  return (
    <Pressable
      onPressIn={() => animateCard(1)}
      onPressOut={() => animateCard(0)}
    >
      <Animated.View
        style={[
          styles.cardMotion,
          {
            transform: [{ scale: cardScale }, { rotateZ: cardRotate }],
          },
        ]}
      >
        <LinearGradient
          colors={["#020617", "#0F766E", "#22C55E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Animated.View
            style={[
              styles.lightOrb,
              {
                opacity: cardGlowOpacity,
                transform: [{ translateX: cardGlowMove }, { rotate: "18deg" }],
              },
            ]}
          />

          <View style={styles.topRow}>
            <Text style={styles.brand}>PayU</Text>
            <Text style={styles.cardType}>FINANCE TRACKER</Text>
          </View>

          <View>
            <Text style={styles.title}>Know your balance</Text>
            <Text style={styles.sub}>
              Compare income, expenses, and monthly habits in one place.
            </Text>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.label}>Personal finance tracker</Text>
            <Text style={styles.status}>LOCAL DATA</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardMotion: {
    marginVertical: 15,
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },
  card: {
    minHeight: 175,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(236,253,245,0.32)",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  lightOrb: {
    position: "absolute",
    width: 42,
    height: 360,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.46)",
    top: -92,
    left: 0,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  cardType: {
    color: "#052E16",
    backgroundColor: "rgba(255,255,255,0.78)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  sub: {
    color: "rgba(255,255,255,0.78)",
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    fontWeight: "600",
  },
  status: {
    color: "#052E16",
    backgroundColor: "rgba(255,255,255,0.78)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "800",
    overflow: "hidden",
  },
});
