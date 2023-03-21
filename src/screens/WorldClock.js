import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import WorldClockComponent from "../components/WorldClockComponent";
import moment from "moment-timezone";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Separator = () => <View style={styles.separator} />;

const WorldClock = () => {
  const timeZones = moment.tz.names().filter((tz) => {
    const offset = moment.tz(tz).utcOffset();
    return (
      moment.tz.zone(tz).abbr(offset) === "PST" ||
      moment.tz.zone(tz).abbr(offset) === "IST"
    );
  });

  const [selectedValues, setSelectedValues] = useState("Asia/Kolkata");
  const _storeData = async (timeZone) => {
    try {
      await AsyncStorage.setItem("timeZoneKey", timeZone);
    } catch (error) {
      // Error saving data
      console.log("Error" + error);
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("timeZoneKey");
      if (value !== null) {
        setSelectedValues(value);
      }
    } catch (error) {
      setSelectedValues("Asia/Kolkata");
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData(), [];
  });

  return (
    <View>
      <WorldClockComponent timezone={selectedValues} />
      <Text style={styles.headerTextStyle}>
        Please Select Any TimeZone From Below
      </Text>
      <Separator />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatListStyle}
        data={timeZones}
        keyExtractor={(data) => data}
        renderItem={({ item }) => {
          return (
            <Text
              style={styles.listTextStyle}
              onPress={() => {
                setSelectedValues(item);
                _storeData(item);
              }}
            >
              {item}
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    marginVertical: 10,
  },
  listTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 10,
    borderColor: "red",
    borderRadius: 5,
  },
  headerTextStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "green",
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 15,
  },
  separator: {
    marginVertical: 8,
    marginHorizontal: 10,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default WorldClock;
