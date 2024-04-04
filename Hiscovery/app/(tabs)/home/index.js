import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Header from "../../../components/header/Header";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
       options={{ 
        headerTitleAlign: 'center', 
        headerTitle: () => <Header title="Home" iconvisible={false}/>,
      }} />

      {/* <View style={styles.container}> */}
      <Text>Index page of Home Tab</Text>
      <Link href={"/home/next-page"} style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: "bold" }}>Go To Next Page</Text>
      </Link>
      {/* </View> */}
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
