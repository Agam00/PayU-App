import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  date: Date;
  setDate: (date: Date) => void;
};

export default function DateTimeInput({ date, setDate }: Props) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) {
      setShow(false);
      return;
    }

    if (mode === "date") {
      setDate(selectedDate);

      setMode("time");
      setShow(true);
    } else {
      const updatedDate = new Date(date);
      updatedDate.setHours(selectedDate.getHours());
      updatedDate.setMinutes(selectedDate.getMinutes());

      setDate(updatedDate);

      setShow(false);
      setMode("date");
    }
  };

  return (
    <View style={styles.container}>
      {/* DateTime Input */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          setMode("date");
          setShow(true);
        }}
      >
        <Text style={styles.text}>
          {date.toDateString()} • {date.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>

      {/* Picker */}
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: "#222",
  },
  text: {
    color: "#fff",
  },
});
