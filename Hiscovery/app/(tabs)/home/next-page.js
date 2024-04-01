import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NextPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Next Page" }} />
      <Text>Next page of Home Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
