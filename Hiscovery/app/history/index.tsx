import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SmallArticleList from "../../components/article-list/SmallArticleList";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../../components/header/Header";
import { COLORS, SIZES } from "../../constants";
import ProtectedRoute from "../../components/ProtectedRoute";
import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import HistoryArticleList from "../../components/article-list/HistoryArticleList";
import { useUser } from "../context/UserContext";
import { HistoryArticleData } from "../../components/articleCard/HistoryArticleCard";

export default function Page() {
  const { userId } = useUser();
  const [articles, setArticles] = useState<HistoryArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Function to fetch articles
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_history_articles", {
        user_id: userId,
      });
      if (error) {
        console.error(error);
      } else {
        setArticles(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [userId]);

  // Fetch articles when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (userId !== null && !initialLoad) {
        fetchArticles();
      }
    }, [fetchArticles, userId, initialLoad])
  );

  useEffect(() => {
    if (userId !== null) {
      fetchArticles();
    }
  }, [userId, fetchArticles]);

  const renderArticles = () => {
    if (loading && initialLoad) {
      return <ActivityIndicator size="large" color={COLORS.darkRed} />;
    } else if (articles && articles.length > 0) {
      return <HistoryArticleList key={articles.map(article => article.id_article).join(',')} articles={articles} />;
    } else {
      return <Text>No history articles to display. Read some articles to add them to your history.</Text>;
    }
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <Header title="History" iconvisible={false} />,
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
    // marginBottom: SIZES.heightBottomNavigation,
  },
});
