import React, { useState, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Header from '../../../components/header/Header';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { COLORS, SIZES } from '../../../constants';
import { supabase } from '../../../lib/supabase';
import AuthorCardList from '../../../components/author-card/AuthorCardList';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

export default function Page() {
  const { userId } = useUser();
  const [authors, setAuthors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Function to fetch followed authors
  const fetchAuthors = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_followed_authors', {
        reader_id: userId
      });
      if (error) {
        console.error(error);
      } else {
        setAuthors(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [userId]);

  // Fetch authors when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (userId !== null) {
        fetchAuthors();
      }
    }, [fetchAuthors, userId])
  );

  const renderFollowing = () => {
    if (loading && initialLoad) {
      return <ActivityIndicator size="large" color={COLORS.darkRed} />;
    } else if (authors && authors.length > 0) {
      return <AuthorCardList key={authors.map(author => author.id).join(',')} authors={authors} />;
    } else {
      return <Text>No followed authors to display. Follow some authors to read their latest articles.</Text>;
    }
  };

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
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: SIZES.heightBottomNavigation,
  },
});
