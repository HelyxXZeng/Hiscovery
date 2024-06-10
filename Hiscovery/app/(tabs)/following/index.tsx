//app/(tabs)/following/index.tsx
import { Stack } from "expo-router";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Header from "../../../components/header/Header";
import ProtectedRoute from "../../../components/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import { supabase } from "../../../lib/supabase";
import AuthorCardList from "../../../components/author-card/AuthorCardList";


export default function Page() {
  const [readerId, setReaderId] = useState(0)
  const [authors, setAuthors] = useState(null);

  const getId = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    let { data, error } = await supabase
      .rpc('get_id_by_email', {
        p_email: user.email
      })
    if (error) console.error(error)
    else {
      setReaderId(data);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getId()

      let { data, error } = await supabase
        .rpc('get_followed_authors', {
          reader_id: readerId
        })
      if (error) console.error(error)
      else setAuthors(data)
    }

    fetchData();
  }, [readerId]);

  const renderFollowing = () => {
    if (!authors) {
      return <ActivityIndicator size="large" color={COLORS.darkRed} />;
    } else if (authors.length > 0) {
      return <AuthorCardList authors={authors} />
    }
    else {
      return <Text>No followed authors to display. Follow some authors to read their latest articles.</Text>
    }
  }
  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <Header title="Following" iconvisible={false} />,
            headerTitleAlign: "center",
          }}
        />

        {renderFollowing()}
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.heightBottomNavigation,
  },
});
