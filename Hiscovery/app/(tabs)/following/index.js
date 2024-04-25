import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../../components/header/Header";
import OnThisDay from '../../../components/event/OnThisDay'
export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <Header title="Following" iconvisible={false} />,
        }} />
      <OnThisDay />
      <Text>Index page of Following Tab</Text>
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
