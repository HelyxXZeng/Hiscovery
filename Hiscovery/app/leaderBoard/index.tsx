import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useRouter } from "expo-router";
import { COLORS, FONT } from "../../constants";
import TopAuthorCardList from "../../components/author-card/TopAuthorCardList";
import { AuthorData } from "../../components/author-card/AuthorCard";
import { Stack, Link } from "expo-router";
import { icons } from "../../constants";
import { supabase } from "../../lib/supabase"; // assuming supabase is where you define your RPC function
import Header from "../../components/header/Header";

const LeaderBoardPage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'topAuthor', title: 'Top Author' },
    { key: 'topArticle', title: 'Top Article' },
  ]);
  const [topAuthors, setTopAuthors] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchTopAuthors();
  }, []);

  const fetchTopAuthors = async () => {
    try {
      // Call your RPC function to get top authors
      const { data, error } = await supabase.rpc('get_top_authors', { user_id: 1 }); // Replace 'user_id' with actual user ID
      if (error) {
          console.error("Error fetching top authors:", error.message);
          return;
        }
        // console.log(data)r
      setTopAuthors(data); // Assuming RPC returns an array of AuthorData
    } catch (error) {
      console.error("Failed to fetch top authors:", error);
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'topAuthor':
        return <TopAuthorCardList authors={topAuthors} />;
      case 'topArticle':
        return <TopAuthorCardList authors={topAuthors} />; // You need to pass appropriate props for top articles
      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: "white",
    },
    tabText: {
      color: COLORS.textColor3,
      fontFamily: FONT.bold,
      fontSize: 14,
    },
    indicator: {
      height: 3,
    },
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabText}
      activeColor={COLORS.darkRed}
      inactiveColor={COLORS.textColor3}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
          options={{
            headerTitle: () => <Header title="LeaderBoard" iconvisible={false} />,
            headerTitleAlign: "center",
          }}
        />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default LeaderBoardPage;
