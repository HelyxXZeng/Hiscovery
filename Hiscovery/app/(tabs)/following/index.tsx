import { Stack } from "expo-router";
import { StyleSheet, Text, View, Button } from "react-native";
import Header from "../../../components/header/Header";
import OnThisDay from '../../../components/event/OnThisDay'
import AuthorProfile from '../../../components/profile/AuthorProfile'
import UserStatusComponent from "../../../components/user-status/UserStatusComponent";
import UserManagement from "../../../components/user-status/UserManagement";
import ProtectedRoute from "../../../components/ProtectedRoute";


export default function Page() {

  return (
    <ProtectedRoute>

      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <Header title="Following" iconvisible={false} />,
          }} />
        <Text>Index page of Following Tab</Text>
      </View>
    </ProtectedRoute>
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
