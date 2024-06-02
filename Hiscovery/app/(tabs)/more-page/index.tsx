import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Image, Linking, TouchableOpacity } from "react-native";
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

  const handleEmailPress = () => {
    const email = 'huyrino@gmail.com';
    const subject = 'Contact Us';
    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    Linking.openURL(mailUrl).catch(err => console.error('An error occurred', err));
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <Header title="More" iconvisible={false} />,
          }}
        />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
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
          <Button
            buttonStyle={[styles.button, styles.signout]}
            title="Sign Out   "
            icon={<Icon name="sign-out" type="font-awesome" color="white" />}
            iconPosition="right"
            onPress={signOut}
          />
          <View style={styles.footer}>
            <Image source={require('../../../assets/adaptive-icon-hiscovery.png')} style={styles.logo} />
            <Text style={styles.footerTitle}>HisCovery</Text>
            <Text style={styles.footerText}>Nếu bạn có thắc mắc gì thêm, hãy liên hệ chúng tôi tại địa chỉ:</Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={[styles.footerText, styles.email]}>huyrino@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 30, // Ensure padding to avoid clipping with the tab bar
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGray,
    borderTopWidth: 1,
    borderColor: COLORS.darkGray,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: COLORS.black,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  email: {
    color: COLORS.blue,
    textDecorationLine: 'underline',
  },
});
