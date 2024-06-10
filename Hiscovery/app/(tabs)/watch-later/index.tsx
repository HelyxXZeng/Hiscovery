import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SmallArticleList from "../../../components/article-list/SmallArticleList";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Header from "../../../components/header/Header";
import { COLORS, SIZES } from "../../../constants";
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

  const renderArticles = () => {
    if (!articles) {
      return <ActivityIndicator size="large" color={COLORS.darkRed} />;
    } else if (articles.length > 0) {
      return <SmallArticleList articles={articles} />;
    } else {
      return <Text>No bookmarked articles to display. Add some bookmarked articles to watch later.</Text>;
    }
  }

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <Header title="Watch Later" iconvisible={false} />,
            headerTitleAlign: "center",
          }}
        />
        {renderArticles()}
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
