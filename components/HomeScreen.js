import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

export default function HomeScreen({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add todos"
          onPress={() => navigation.navigate("Add todos")}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.todo) {
      console.log("new todo: ", route.params?.todo);
      const todo = {
        title: route.params?.todo.text,
        id: Date.now(),
      };
      setTodos((prev) => [...prev, todo]);
    }
  }, [route.params?.todo]);

  useEffect(() => {
    if (route.params?.deleteId) {
      console.log("delete todo with id: ", route.params?.deleteId);

      setTodos((prev) => {
        return prev.filter((todo) => todo.id != route.params?.deleteId);
      });
    }
  }, [route.params?.deleteId]);

  const [todos, setTodos] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", item);
            }}
          >
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    height: 80,
    padding: 10,
  },
  header: {
    fontSize: 20,
    padding: 10,
  },
});
