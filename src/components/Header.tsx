import { Animated, View, Text, StyleSheet } from "react-native";
import { ReactElement, useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header(): ReactElement {
  const insets = useSafeAreaInsets();
  const blinkOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkOpacity, {
          toValue: 0.25,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(blinkOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [blinkOpacity]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/* LEFT */}
      <View style={styles.left}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>P</Text>
        </View>
        <Text style={styles.title}>PayU</Text>
      </View>

      <View style={styles.securedChip}>
        <Animated.View
          style={[styles.securedDot, { opacity: blinkOpacity }]}
        />
        <Text style={styles.securedText}>Secured</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontWeight: "bold",
    color: "#000",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  securedChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#052E16",
    borderColor: "#22C55E",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 15,
  },

  securedDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
    marginRight: 6,
  },

  securedText: {
    color: "#BBF7D0",
    fontSize: 12,
    fontWeight: "700",
  },
});
