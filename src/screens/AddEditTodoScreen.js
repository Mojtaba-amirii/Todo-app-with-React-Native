import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text } from "react-native";
import { useTodos } from "../context/TodoContext";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddEditTodoScreen({ navigation, route }) {
  const { addTodo, updateTodo } = useTodos();
  const editTodo = route.params?.todo;

  const [title, setTitle] = useState(editTodo?.title || "");
  const [description, setDescription] = useState(editTodo?.description || "");
  const [dueDate, setDueDate] = useState(
    editTodo?.dueDate ? new Date(editTodo.dueDate) : new Date()
  );
  const [priority, setPriority] = useState(editTodo?.priority || "medium");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const todoData = {
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority,
      completed: false,
    };
    if (editTodo) {
      updateTodo(editTodo.id, todoData);
    } else {
      addTodo(todoData);
    }
    navigation.goBack();
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === "ios");
    setDueDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Todo Title"
        accessibilityLabel="Todo title input"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Todo Description"
        multiline
        numberOfLines={4}
        accessibilityLabel="Todo description input"
      />
      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={showDatePickerModal}
        accessibilityLabel="Select due date"
        accessibilityHint="Opens date picker to select a due date"
      >
        <Text>{dueDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dueDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {["low", "medium", "high"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.priorityButton,
              priority === p && styles.priorityButtonSelected,
            ]}
            onPress={() => setPriority(p)}
            accessibilityLabel={`Set priority to ${p}`}
            accessibilityState={{ selected: priority === p }}
          >
            <Text
              style={[
                styles.priorityButtonText,
                priority === p && styles.priorityButtonTextSelected,
              ]}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        accessibilityLabel={editTodo ? "Update todo" : "Add todo"}
      >
        <Text style={styles.saveButtonText}>
          {editTodo ? "Update Todo" : "Add Todo"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f6f6f6",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginHorizontal: 5,
  },
  priorityButtonSelected: {
    backgroundColor: "#6200ee",
  },
  priorityButtonText: {
    color: "#000000",
  },
  priorityButtonTextSelected: {
    color: "#ffffff",
  },
  saveButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
