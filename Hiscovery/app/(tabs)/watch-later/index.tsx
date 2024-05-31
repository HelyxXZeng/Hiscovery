import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import SmallArticleList from "../../../components/article-list/SmallArticleList";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Header from "../../../components/header/Header";
import { SIZES } from "../../../constants";
import ProtectedRoute from "../../../components/ProtectedRoute";
import React from "react";

export default function Page() {
  const [readerId, setReaderId] = useState(0)
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

  const [articles, setArticles] = useState(null);
  useEffect(() => {
    async function fetchData() {
      await getId()
      let { data, error } = await supabase.rpc("get_watch_later_list", {
        _reader_id: readerId,
      });

      if (error) console.error(error);
      else setArticles(data);
    }

    fetchData();
  }, [readerId]);

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <Header title="Watch Later" iconvisible={false} />,
            headerTitleAlign: "center",
          }}
        />
        {articles && articles.length > 0 ? (
          <SmallArticleList articles={articles} />
        ) : (
          <Text>No bookmarked articles to display. Add some bookmarked articles to watch later.</Text>
        )}
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
