import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text } from "react-native";
import { useTodos } from "../context/TodoContext";

export default function HomeScreen({ navigation }) {
  const { todos, toggleTodo } = useTodos();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTodoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => navigation.navigate("Details", { todo: item })}
    >
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => toggleTodo(item.id)}
      />
      <View style={styles.todoTextContainer}>
        <Text
          style={[styles.todoTitle, item.completed && styles.completedText]}
        >
          {item.title}
        </Text>
        <Text style={styles.todoDescription} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search todos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTodos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No todos found. Add some!</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEditTodo")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  searchBar: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#6200ee",
    borderRadius: 12,
    marginRight: 15,
  },
  checkboxChecked: {
    backgroundColor: "#6200ee",
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  todoDescription: {
    fontSize: 14,
    color: "#888",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#888",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "#6200ee",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
