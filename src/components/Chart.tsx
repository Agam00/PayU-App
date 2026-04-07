// import { BarChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";

// const width = Dimensions.get("window").width;

// export default function Chart({ transactions, selectedMonth }: any) {
//   const daysInMonth = new Date(
//     selectedMonth.getFullYear(),
//     selectedMonth.getMonth() + 1,
//     0,
//   ).getDate();

//   // create array for each day
//   const dailyData = Array(daysInMonth).fill(0);

//   transactions.forEach((item: any) => {
//     const date = new Date(item.date);

//     if (
//       date.getMonth() === selectedMonth.getMonth() &&
//       date.getFullYear() === selectedMonth.getFullYear()
//     ) {
//       const day = date.getDate() - 1;

//       // only count expense (optional)
//       if (item.type === "expense") {
//         dailyData[day] += item.amount;
//       }
//     }
//   });

//   // labels (1, 2, 3...)
//   const labels = dailyData.map((_, i) => (i + 1).toString());
//   return (
//     <BarChart
//       data={{
//         labels: ["", "", "", "", ""],
//         datasets: [{ data: [300, 100, 200, 350, 250] }],
//       }}
//       width={width - 30}
//       height={180}
//       withInnerLines={true}
//       chartConfig={{
//         backgroundGradientFrom: "#000",
//         backgroundGradientTo: "#000",
//         color: () => "#3ddc97",
//         labelColor: () => "#666",
//       }}
//       style={{ borderRadius: 16 }}
//     />
//   );
// }

import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

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

  // 🔥 Convert daily → weekly (fixes your issue)
  const weeklyData = [];
  for (let i = 0; i < dailyData.length; i += 7) {
    const sum = dailyData.slice(i, i + 7).reduce((a, b) => a + b, 0);
    weeklyData.push(sum);
  }

  // Labels
  const weekLabels = ["W1", "W2", "W3", "W4", "W5"];

  // ❌ No data case
  const hasData = weeklyData.some((val) => val > 0);
  if (!hasData) return null;

  return (
    <BarChart
      data={{
        labels: weekLabels,
        datasets: [{ data: weeklyData }],
      }}
      width={width - 20}
      height={200}
      fromZero
      showValuesOnTopOfBars
      withInnerLines={false}
      // 🔥 ADD THESE (FIX)
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
        paddingRight: 10,
      }}
    />
  );
}
