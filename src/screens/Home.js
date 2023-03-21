import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Separator = () => <View style={styles.separator} />;

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Countdown Timer"
          onPress={() => navigation.navigate("TimerList")}
        />
        <Separator />

        <Button
          title="World Time"
          onPress={() => navigation.navigate("WorldClock")}
        />

        <Separator />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },

  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
