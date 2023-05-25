import { StyleSheet, Text, View, Button } from "react-native";
import { useEffect } from "react";

export default function DetailsScreen({ navigation, route }) {
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
      <Button
        title="Delete"
        onPress={() => navigation.navigate("Home", { deleteId: id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
