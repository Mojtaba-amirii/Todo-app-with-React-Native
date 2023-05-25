import { StyleSheet, View, Button, TextInput } from "react-native";
import { useState } from "react";

export default function ModalScreen({ navigation }) {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={text}
      />
      <Button
        style={styles.addButton}
        title="Add"
        onPress={() => {
          const todo = { text };
          navigation.navigate("Home", { todo });
        }}
      />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
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
  textInput: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  addButton: {
    width: 200,
    height: 40,
    borderRadius: 10,
  },
});
