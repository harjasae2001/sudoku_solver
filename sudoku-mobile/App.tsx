import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import CameraScreen from "./src/screens/CameraScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import SolveScreen from "./src/screens/SolveScreen";

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Review: undefined;
  Solve: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Sudoku Solver" }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: "Scan" }} />
        <Stack.Screen name="Review" component={ReviewScreen} options={{ title: "Review" }} />
        <Stack.Screen name="Solve" component={SolveScreen} options={{ title: "Solve" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
