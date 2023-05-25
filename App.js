import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import DetailsScreen from "./components/DetailsScreen";
import ModalScreen from "./components/ModalScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Todos",
            headerRight: () => <Button title="Add todos" />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Todos Details" }}
        />
        <Stack.Screen
          name="Add todos"
          component={ModalScreen}
          options={{ title: "Add todos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
