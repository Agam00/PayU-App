import React from "react";
import { View, Dimensions, Text } from "react-native";
import Svg, {
  Rect,
  Text as SvgText,
  Line,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function CustomChart({
  weeklyData = [],
  transactions = [],
  selectedMonth = new Date(),
}: any) {
  const chartHeight = 195;
  const chartWidth = screenWidth - 20;

  const paddingTop = 25;
  const paddingLeft = 45;
  const paddingBottom = 35;

  const barWidth = 18;

  // ✅ Safe data
  const safeData = weeklyData.length ? weeklyData : [0];

  const gap = (chartWidth - paddingLeft) / safeData.length;

  // ✅ Total income (correct)
  const totalIncome = transactions
    .filter((item: any) => {
      const date = new Date(item.date);
      return (
        item.type === "income" &&
        date.getMonth() === selectedMonth.getMonth() &&
        date.getFullYear() === selectedMonth.getFullYear()
      );
    })
    .reduce((sum: number, item: any) => sum + item.amount, 0);
  const totalExpense = transactions
    .filter((item: any) => {
      const date = new Date(item.date);
      return (
        item.type === "expense" &&
        date.getMonth() === selectedMonth.getMonth() &&
        date.getFullYear() === selectedMonth.getFullYear()
      );
    })
    .reduce((sum: number, item: any) => sum + item.amount, 0);

  const safeMax = totalIncome || 1;

  // ✅ EXACTLY 5 labels (0 → max)
  const steps = 5; // ✅ now 5 splits

  const stepValue = safeMax / steps;

  const yAxisValues = Array.from({ length: steps + 1 }, (_, i) =>
    Math.round(stepValue * i),
  );

  // ✅ Clean format (NO K)
  const format = (num: number) => `₹${num}`;

  if (totalExpense > totalIncome) {
    return (
      <View
        style={{
          marginTop: 20,
          padding: 15,
          borderRadius: 15,
          backgroundColor: "#111",
          borderWidth: 1,
          borderColor: "#ef4444",
        }}
      >
        <Text
          style={{
            color: "#ef4444",
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 5,
          }}
        >
          ⚠️ Spending Alert
        </Text>

        <Text
          style={{
            color: "#aaa",
            fontSize: 12,
          }}
        >
          Your expenses exceeded your income this month.
        </Text>

        <Text
          style={{
            color: "#fff",
            marginTop: 8,
            fontWeight: "600",
          }}
        >
          Loss: ₹{totalExpense - totalIncome}
        </Text>
      </View>
    );
  }
  return (
    <View style={{ marginTop: 20 }}>
      <Svg width={chartWidth} height={chartHeight + paddingTop + paddingBottom}>
        {/* 🔥 Gradient */}
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#d4caa3" />
            <Stop offset="100%" stopColor="#3ddc97" />
          </LinearGradient>
        </Defs>

        {/* 🔥 Y-axis */}
        {yAxisValues.map((val, i) => {
          const y = paddingTop + chartHeight - (val / safeMax) * chartHeight;

          return (
            <React.Fragment key={i}>
              <Line
                x1={paddingLeft}
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="#222"
                strokeDasharray="4"
              />
              <SvgText x={0} y={y + 4} fill="#666" fontSize="10">
                {format(val)}
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* 🔥 Bars */}
        {safeData.map((value: number, index: number) => {
          const barHeight = (value / safeMax) * chartHeight;

          const x = paddingLeft + index * gap + gap / 2 - barWidth / 2;

          const y = paddingTop + chartHeight - barHeight;

          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={8}
              fill="url(#grad)"
            />
          );
        })}

        {/* 🔥 Week Labels */}
        {safeData.map((_: number, index: number) => {
          const x = paddingLeft + index * gap + gap / 2;

          return (
            <SvgText
              key={index}
              x={x - 10}
              y={paddingTop + chartHeight + 20}
              fill="#888"
              fontSize="10"
            >
              W{index + 1}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}
