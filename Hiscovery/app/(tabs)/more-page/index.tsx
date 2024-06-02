import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Header from "../../../components/header/Header";
import { useRouter } from 'expo-router';
import { Button, Icon } from 'react-native-elements';
import { supabase } from '../../../lib/supabase';
import { COLORS, SIZES } from "../../../constants";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function MorePage() {

  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('Signed out!');
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
            headerTitle: () => <Header title="More" iconvisible={false} />,
          }}
        />
        <View style={styles.content}>
          <ScrollView style={{ flex: 1 }}>
            <Button
              buttonStyle={styles.button}
              title="Edit Profile   "
              icon={<Icon name="edit" type="font-awesome" color="white" />}
              iconRight
              onPress={() => router.push('/editProfiles')}
            />
            <Button
              buttonStyle={styles.button}
              title="Feedback   "
              icon={<Icon name="comments" type="font-awesome" color="white" />}
              iconRight
              onPress={() => router.push('/feedback')}
            />
            <Button
              buttonStyle={styles.button}
              title="Privacy and Policies, ToS  "
              icon={<Icon name="info-circle" type="font-awesome" color="white" />}
              iconRight
              onPress={() => router.push('/privacy')}
            />
          </ScrollView>
          <Button
            buttonStyle={[styles.button, styles.signout]}
            title="Sign Out   "
            icon={<Icon name="sign-out" type="font-awesome" color="white" />}
            iconPosition="right"
            onPress={signOut}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>HisCovery</Text>
            <Text style={styles.footerText}>Nếu bạn có thắc mắc gì thêm, hãy liên hệ chúng tôi tại địa chỉ:</Text>
            <Text style={styles.footerText}>abc@gmail.com</Text>
          </View>
        </View>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 8,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.darkRed,
    borderRadius: 20,
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    padding: 20,
    marginBottom: 10,
    justifyContent: "space-between"
  },
  signout: {
    marginBottom: '15%',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGray,
    borderTopWidth: 1,
    borderColor: COLORS.darkGray,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.black,
    fontSize: 16,
    textAlign: 'center',
  },
});
