import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import moment from "moment-timezone";

const WorldClockComponent = ({ timezone }) => {
  const [time, setTime] = useState(moment().tz(timezone).format("h:mm:ss A"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().tz(timezone).format("h:mm:ss A"));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <View>
      <Text style={styles.timezone}>{timezone}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  timezone: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WorldClockComponent;
