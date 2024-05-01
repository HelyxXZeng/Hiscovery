import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../../components/header/Header";
import OnThisDay from '../../../components/event/OnThisDay'
import AuthorProfile from '../../../components/profile/AuthorProfile'
import UserStatusComponent from "../../../components/user-status/UserStatusComponent";
import UserManagement from "../../../components/user-status/UserManagement";

export default function Page() {

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <Header title="Following" iconvisible={false} />,
        }} />
      <UserManagement />
      <Text>Index page of Following Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1
  },
});
