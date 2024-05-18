import { Stack } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/header/Header";
import { useRouter } from 'expo-router'
import { Button, Icon } from 'react-native-elements'
import { supabase } from '../../../lib/supabase'
import UpdateProfile from '../../../components/profile/UpdateProfile'
import { COLORS, SIZES } from "../../../constants";
import ProtectedRoute from "../../../components/ProtectedRoute";

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

  return (
    <ProtectedRoute>

      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <Header title="Profile" iconvisible={false} />,
          }} />
        <ScrollView style={{ marginBottom: '15%' }}>
          <UpdateProfile></UpdateProfile>
          <Button
            buttonStyle={styles.button}
            title="Sign Out  "
            icon={<Icon name="sign-out" type="font-awesome" color="white" />}
            iconRight
            onPress={signOut}
          />
        </ScrollView>
      </View>
    </ProtectedRoute>


  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.darkRed,
    borderRadius: 20,
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
    padding: 20,
    marginBottom: 10
  },
});
