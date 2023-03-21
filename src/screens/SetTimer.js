import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import TimerContext from "../context/TimerContext";

const SetTimer = ({ navigation }) => {
  const mounted = useRef(true);
  const { timer, addNewTimer } = useContext(TimerContext);

  const [min, onChangeMin] = useState(0);
  const [hour, onChangeHr] = useState(0);
  const [second, onChangeSec] = useState(0);

  const [totalTime, setTotalTime] = useState();

  const timerCreationAlert = () =>
    Alert.alert("Alert", "Timer Added Successfully", [
      {
        text: "OK",
        onPress: () => {
          addNewTimer(totalTime);

          navigation.goBack();
        },
      },
    ]);
  const timerTimerNotSet = () =>
    Alert.alert("Alert", "Please enter the value", [
      {
        text: "OK",
        onPress: () => {
          mounted.current = true;
          setTotalTime();
        },
      },
    ]);

  useEffect(() => {
    if (mounted.current) {
      mounted.current = false;

      return;
    } else {
      totalTime > 0 ? timerCreationAlert() : timerTimerNotSet();
    }
  }, [totalTime]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Timer</Text>
      <SafeAreaView style={styles.inputArea}>
        <TextInput
          inputMode="numeric"
          placeholder="Hours"
          style={styles.input}
          onChangeText={onChangeHr}
          value={hour}
        />
        <TextInput
          inputMode="numeric"
          placeholder="Minutes"
          style={styles.input}
          onChangeText={onChangeMin}
          value={min}
        />

        <TextInput
          inputMode="numeric"
          placeholder="Seconds"
          style={styles.input}
          onChangeText={onChangeSec}
          value={second}
        />
      </SafeAreaView>
      <View style={styles.button}>
        <Button
          color="red"
          title="Add Timer"
          onPress={() => {
            mounted.current = false;
            setTotalTime(
              Number.parseInt(second) +
                Number.parseInt(min) * 60 +
                Number.parseInt(hour) * 3600
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    marginHorizontal: 16,
    flexDirection: "row",
  },
  container: {
    justifyContent: "flex-end",
    flexDirection: "column",
    marginHorizontal: 16,
  },
  button: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "red",
    marginVertical: 10,
  },
});
export default SetTimer;
