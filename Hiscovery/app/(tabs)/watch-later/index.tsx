import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import SmallArticleList from '../../../components/article-list/SmallArticleList';
import Header from '../../../components/header/Header';
import { COLORS, SIZES } from '../../../constants';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { supabase } from "../../../lib/supabase";

export default function Page() {
  const { userId, fetchUserId } = useUser();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_watch_later_list", { _reader_id: userId });
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

  useFocusEffect(
    useCallback(() => {
      if (userId !== null) {
        fetchArticles();
      }
    }, [fetchArticles, userId, initialLoad])
  );

  const renderArticles = () => {
    if (loading && initialLoad) {
      return <ActivityIndicator size="large" color={COLORS.darkRed} />;
    } else if (articles && articles.length > 0) {
      return <SmallArticleList key={articles.map(article => article.id).join(',')} articles={articles} />;
    } else {
      return <Text>No bookmarked articles to display. Add some bookmarked articles to watch later.</Text>;
    }
  };

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
