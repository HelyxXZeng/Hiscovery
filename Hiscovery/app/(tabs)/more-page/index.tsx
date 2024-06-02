import React from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import Header from "../../../components/header/Header";
import { useRouter } from "expo-router";
import { Button, Icon } from "react-native-elements";
import { supabase } from "../../../lib/supabase";
import { COLORS, SIZES, FONT } from "../../../constants";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useState, useEffect } from "react";

export default function MorePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [avatarUrl, setAvatarUrl] = useState(
    "https://eianmciufswbutirdbka.supabase.co/storage/v1/object/public/my%20files/images/icons/dollar.png?t=2024-03-03T11%3A57%3A19.836Z"
  );

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("Signed out!");
    if (error) {
      console.error("Error signing out:", error);
    } else {
      router.push("/auth");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let { data, error } = await supabase.rpc("get_basic_user_data", {
        user_email: user.email,
      });

      if (error) console.error(error);
      else {
        setEmail(data[0].email);
        setName(data[0].name);
        setAvatarUrl(data[0].avatar_url);
      }
    };
    fetchUserData();
  }, []);

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
            <View style={styles.infoContainer}>
              <Image style={styles.avatar} source={{ uri: avatarUrl }} />
              <Text style={styles.textName}>{name}</Text>
              <Text style={{ textAlign: "center" }}>{email}</Text>
            </View>
            <Button
              buttonStyle={styles.button}
              title="Edit Profile   "
              icon={<Icon name="edit" type="font-awesome" color="white" />}
              iconRight
              onPress={() => router.push("/editProfiles")}
            />
            <Button
              buttonStyle={styles.button}
              title="Feedback   "
              icon={<Icon name="comments" type="font-awesome" color="white" />}
              iconRight
              onPress={() => router.push("/feedback")}
            />
            <Button
              buttonStyle={styles.button}
              title="Privacy and Policies, ToS  "
              icon={
                <Icon
                  name="my-library-books"
                  type="materialIcons"
                  color="white"
                />
              }
              iconRight
              onPress={() => router.push("/privacy")}
            />
            <Button
              buttonStyle={styles.button}
              title="About us  "
              icon={
                <Icon name="info-circle" type="font-awesome" color="white" />
              }
              iconRight
              onPress={() => router.push("/privacy")}
            />

            <Button
              buttonStyle={styles.button}
              title="Rate app  "
              icon={<Icon name="star" type="font-awesome" color="white" />}
              iconRight
              onPress={() => router.push("/privacy")}
            />

            <Button
              buttonStyle={[styles.button, styles.signout]}
              title="Sign Out   "
              icon={<Icon name="sign-out" type="font-awesome" color="white" />}
              iconPosition="right"
              onPress={signOut}
            />
          </ScrollView>
        </View>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 8,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#d24b70",
    borderRadius: 10,
    width: "100%",
    height: "auto",
    alignSelf: "center",
    padding: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  signout: {
    marginBottom: "15%",
  },
  infoContainer: {
    backgroundColor: "white",
    // alignSelf: "center",
    // marginTop: 10,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.gray,
    marginBottom: 10,
    alignSelf: "center",
  },
  textName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.h3,
  },
});
