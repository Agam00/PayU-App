// import { BarChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

// const width = Dimensions.get("window").width;

// export default function Chart({
//   transactions = [],
//   selectedMonth = new Date(),
// }: any) {
//   if (!selectedMonth || !transactions.length) return null;

//   // 🔥 Days in selected month
//   const daysInMonth = new Date(
//     selectedMonth.getFullYear(),
//     selectedMonth.getMonth() + 1,
//     0,
//   ).getDate();

//   // 🔥 Daily data array
//   const dailyData = Array(daysInMonth).fill(0);

//   transactions.forEach((item: any) => {
//     const date = new Date(item.date);

//     const isSameMonth =
//       date.getMonth() === selectedMonth.getMonth() &&
//       date.getFullYear() === selectedMonth.getFullYear();

//     if (isSameMonth) {
//       const day = date.getDate() - 1;

//       if (item.type === "expense") {
//         dailyData[day] += item.amount;
//       }
//     }
//   });

//   // 🔥 Convert daily → weekly (fixes your issue)
//   const weeklyData = [];
//   for (let i = 0; i < dailyData.length; i += 7) {
//     const sum = dailyData.slice(i, i + 7).reduce((a, b) => a + b, 0);
//     weeklyData.push(sum);
//   }

//   // Labels
//   const weekLabels = ["W1", "W2", "W3", "W4", "W5"];

//   // ❌ No data case
//   const hasData = weeklyData.some((val) => val > 0);
//   if (!hasData) return null;

//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//       <BarChart
//         data={{
//           labels: weekLabels,
//           datasets: [{ data: weeklyData }],
//         }}
//         width={width - 20}
//         height={200}
//         fromZero
//         showValuesOnTopOfBars
//         withInnerLines={false}
//         // 🔥 ADD THESE (FIX)
//         yAxisLabel="₹"
//         yAxisSuffix=""
//         chartConfig={{
//           backgroundGradientFrom: "#111",
//           backgroundGradientTo: "#111",
//           decimalPlaces: 0,

//           color: (opacity = 1) => `rgba(61, 220, 151, ${opacity})`,
//           labelColor: () => "#888",

//           propsForBackgroundLines: {
//             stroke: "#222",
//           },

//           propsForLabels: {
//             fontSize: 10,
//           },

//           barPercentage: 0.6,
//         }}
//         style={{
//           borderRadius: 20,
//           marginTop: 15,
//           paddingRight: 10,
//         }}
//       />
//     </ScrollView>
//   );
// }

import { BarChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Chart({
  transactions = [],
  selectedMonth = new Date(),
}: any) {
  if (!selectedMonth || !transactions.length) return null;

  // 🔥 Days in selected month
  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0,
  ).getDate();

  // 🔥 Daily data array
  const dailyData = Array(daysInMonth).fill(0);

  transactions.forEach((item: any) => {
    const date = new Date(item.date);

    const isSameMonth =
      date.getMonth() === selectedMonth.getMonth() &&
      date.getFullYear() === selectedMonth.getFullYear();

    if (isSameMonth) {
      const day = date.getDate() - 1;

      if (item.type === "expense") {
        dailyData[day] += item.amount;
      }
    }
  });

  // 🔥 Convert daily → weekly
  const weeklyData = [];
  for (let i = 0; i < dailyData.length; i += 7) {
    const sum = dailyData.slice(i, i + 7).reduce((a, b) => a + b, 0);
    weeklyData.push(sum);
  }

  // 🔥 Dynamic labels
  const weekLabels = weeklyData.map((_, i) => `W${i + 1}`);

  // ❌ No data case
  const hasData = weeklyData.some((val) => val > 0);
  if (!hasData) return null;

  // ✅ 🔥 KEY FIX: Dynamic width
  const chartWidth = Math.max(screenWidth, weeklyData.length * 80);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 20 }}
    >
      <BarChart
        data={{
          labels: weekLabels,
          datasets: [{ data: weeklyData }],
        }}
        width={chartWidth} // ✅ dynamic width
        height={220}
        fromZero
        showValuesOnTopOfBars
        withInnerLines={false}
        yAxisLabel="₹"
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#111",
          backgroundGradientTo: "#111",
          decimalPlaces: 0,

          color: (opacity = 1) => `rgba(61, 220, 151, ${opacity})`,
          labelColor: () => "#888",

          propsForBackgroundLines: {
            stroke: "#222",
          },

          propsForLabels: {
            fontSize: 10,
          },

          barPercentage: 0.6,
        }}
        style={{
          borderRadius: 20,
          marginTop: 15,
        }}
      />
    </ScrollView>
  );
}
