import React, { useContext } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import TimerItem from "../components/TimerItem";
import TimerContext from "../context/TimerContext";
import { FlatList } from "react-native-gesture-handler";

const TimerListScreen = ({ navigation }) => {
  const { data } = useContext(TimerContext);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.button}>
          <Button
            color="red"
            title="Add New Timer"
            onPress={() => navigation.navigate("SetTimer")}
          />
        </View>
        {data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
            data={data}
            keyExtractor={(data) => data.id}
            renderItem={({ item }) => {
              return <TimerItem timer={item} />;
            }}
          />
        ) : (
          <Text style={styles.noData}>No Timer Available </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  button: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  noData: {
    margin: 25,
    textAlign: "center",
    fontSize: 25,

    color: "red",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  flatListStyle: {
    marginVertical: 20,
  },
});

export default TimerListScreen;
