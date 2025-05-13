import { Text } from "react-native";
import { useTodos } from "../context/TodoContext";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";

export default function DetailsScreen({ navigation, route }) {
  const { todo } = route.params;
  const { deleteTodo } = useTodos();

  const handleDelete = () => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteTodo(todo.id);
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.description}>{todo.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Due Date:{" "}
            {todo.dueDate
              ? new Date(todo.dueDate).toDateString()
              : "No due date"}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Priority: {todo.priority}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Status: {todo.completed ? "Completed" : "Not Completed"}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("AddEditTodo", { todo })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f6f6f6",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#6200ee",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    marginLeft: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
