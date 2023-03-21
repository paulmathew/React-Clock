import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./src/screens/Home";
import TimerListScreen from "./src/screens/TimeListScreen";
import SetTimer from "./src/screens/SetTimer";
import { TimerProvider } from "./src/context/TimerContext";
import WorldClock from "./src/screens/WorldClock";

const navigator = createStackNavigator(
  {
    Home: Home,
    TimerList: TimerListScreen,
    SetTimer: SetTimer,
    WorldClock: WorldClock,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "React Clock",
    },
  }
);
const App = createAppContainer(navigator);

//export default createAppContainer(navigator);

export default () => {
  return (
    <TimerProvider>
      <App />
    </TimerProvider>
  );
};
