import { Stack } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/header/Header";
import { useRouter } from 'expo-router'
import { Button } from 'react-native-elements'
import { supabase } from '../../../lib/supabase'
import UpdateProfile from '../../../components/profile/UpdateProfile'
export default function Page() {

  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('Signed out!')
    if (error) {
      console.error("Error signing out:", error);
    } else {
      router.push("/auth");
    }
  };

  const goToAuthor = () => {
    router.push("/author/38");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <Header title="More" iconvisible={false} />,
        }} />
      {/* <UpdateProfile></UpdateProfile> */}
      <Button title="Go to Author" onPress={goToAuthor} />
      <Button title="Sign Out" onPress={signOut} />
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
