import React, { useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimerContext = React.createContext();

const timerReducer = (timers, action) => {
  switch (action.type) {
    case "ADD_TIMER": {
      removeOldData(`remainingTime-${timers.length + 1}`);
      return [
        ...timers,
        {
          id:
            timers.length > 0
              ? timers[timers.length - 1].id + 1
              : timers.length + 1,
          label: `Timer #${
            timers.length > 0
              ? timers[timers.length - 1].id + 1
              : timers.length + 1
          }`,
          initialTime: action.payload,
        },
      ];
    }
    case "DELETE_TIMER": {
      const items = [...timers];
      console.log("Old Length", items.length);
      const j = items.findIndex((items) => items.id === action.payload);
      console.log("Removing pos " + j);
      console.log(`remainingTime-${items[j].id}`);
      removeOldData(`remainingTime-${items[j].id}`);
      items.splice([j], 1);
      console.log("New Items", items);
      console.log("New Length", items.length);

      return [...items];
    }
    default:
      return timers;
  }
};
const removeOldData = async (key) => {
  try {
    await AsyncStorage.setItem(key, "");
  } catch (error) {
    console.log("error: ", error);
  }
};
export const TimerProvider = ({ children }) => {
  const [timerLists, dispatch] = useReducer(timerReducer, []);

  const addNewTimer = (timer) => {
    dispatch({ type: "ADD_TIMER", payload: timer });
  };
  const deleteTimer = (id) => {
    console.log("Deleting timer " + id);
    dispatch({ type: "DELETE_TIMER", payload: id });
  };

  return (
    <TimerContext.Provider
      value={{
        data: timerLists,
        addNewTimer: addNewTimer,
        deleteTimer: deleteTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
export default TimerContext;
