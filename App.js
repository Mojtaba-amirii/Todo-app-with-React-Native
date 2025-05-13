import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import { TodoProvider } from "./src/context/TodoContext";
import { NavigationContainer } from "@react-navigation/native";
import AddEditTodoScreen from "./src/screens/AddEditTodoScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#6200ee",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "My Todos" }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Todo Details" }}
          />
          <Stack.Screen
            name="AddEditTodo"
            component={AddEditTodoScreen}
            options={({ route }) => ({
              title: route.params?.todo ? "Edit Todo" : "Add Todo",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}
