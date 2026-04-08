import { useRef } from "react";
import { Animated, PanResponder, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const FAB_SIZE = 60;

export default function FAB() {
  const router = useRouter();

  const pan = useRef(new Animated.ValueXY()).current;

  const lastOffset = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },

      onPanResponderMove: (_, gesture) => {
        let newX = lastOffset.current.x + gesture.dx;
        let newY = lastOffset.current.y + gesture.dy;

        newX = Math.max(-width + FAB_SIZE + 20, Math.min(0, newX));
        newY = Math.max(-height + FAB_SIZE + 100, Math.min(0, newY));

        pan.setValue({ x: newX, y: newY });
      },

      onPanResponderRelease: () => {
        lastOffset.current = {
          x: pan.x._value,
          y: pan.y._value,
        };
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.fab,
        {
          transform: pan.getTranslateTransform(),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Ionicons
        name="add"
        size={24}
        color="#000"
        onPress={() => router.push("/AddExpense")}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#fff",
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
