import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import ProgressBar from "react-native-animated-progress";
import { AntDesign } from "@expo/vector-icons";
import TimerContext from "../context/TimerContext";
const COUNTDOWN_STORAGE_KEY = "countdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Separator = () => <View style={styles.separator} />;

const TimerItem = ({ timer }) => {
  const { _timer, _addNewTimer, deleteTimer } = useContext(TimerContext);
  const [seconds, setSeconds] = useState(timer.initialTime);

  useEffect(() => {
    const loadCountdown = async () => {
      try {
        const storedCountdown = await AsyncStorage.getItem(
          COUNTDOWN_STORAGE_KEY + timer.id
        );
        if (storedCountdown) {
          setSeconds(parseInt(storedCountdown, 10));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadCountdown();
  }, []);

  useEffect(() => {
    const saveCountdown = async () => {
      try {
        await AsyncStorage.setItem(
          COUNTDOWN_STORAGE_KEY + timer.id,
          seconds.toString()
        );
      } catch (error) {
        console.log(error);
      }
    };
    saveCountdown();
  }, [seconds]);

  useEffect(() => {
    if (seconds > 0) {
      const timeoutId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View>
      {/* <Text>{formatTime(seconds)}</Text> */}

      {seconds > 0 ? (
        <View>
          <Text>
            {timer.label}: {formatTime(seconds)} remaining
          </Text>
        </View>
      ) : (
        <Text>
          {timer.label}: {formatTime(timer.initialTime)} Times Up
        </Text>
      )}
      <View style={styles.progressBar}>
        {seconds > 0 ? (
          <ProgressBar
            backgroundColor="red"
            height={7}
            progress={findPercentage(seconds, timer.initialTime)}
          />
        ) : null}
      </View>
      <View style={styles.deleteButton2}>
        <AntDesign
          style={styles.deleteButton}
          name="delete"
          size={24}
          onPress={() => alertTimerDelete(deleteTimer, timer.id)}
        />
      </View>
      <Separator />
    </View>
  );
};

const findPercentage = (remainingTime, initialTime) => {
  return (remainingTime / initialTime) * 100;
};
const alertTimerDelete = (deleteTimer, id) =>
  Alert.alert("Alert", "Do you want to delete this timer ?", [
    {
      text: "Confirm",
      onPress: () => {
        deleteTimer(id);
      },
    },
    {
      text: "Cancel",
      onPress: () => {},
    },
  ]);
const styles = StyleSheet.create({
  deleteButton: {
    color: "red",
  },
  deleteButton2: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  container: {
    marginHorizontal: 16,
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  progressBar: {
    marginVertical: 10,
  },
});

export default TimerItem;
