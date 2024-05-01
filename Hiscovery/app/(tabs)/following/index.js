import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../../components/header/Header";
import OnThisDay from '../../../components/event/OnThisDay'
import AuthorProfile from '../../../components/profile/AuthorProfile'
import UserStatusComponent from "../../../components/user-status/UserStatusComponent";

export default function Page() {
  const userData = {
    id: 1,
    username: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    join_date: new Date("2023-01-15"),
    birthdate: new Date("1990-05-01"),
    image_url: "https://th.bing.com/th/id/OIP.Xm76x6WrXpgml5uZIo5o0gHaGL?w=201&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    status: "active"
  };


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <Header title="Following" iconvisible={false} />,
        }} />
      <UserStatusComponent data={userData} />
      <Text>Index page of Following Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: "center",
    // justifyContent: "center",
  },
});
