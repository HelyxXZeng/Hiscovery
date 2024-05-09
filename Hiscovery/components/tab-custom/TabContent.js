import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import BigArticleList from "../article-list/BigArticleList";
import { supabase } from "../../lib/supabase";

const TabContent = ({ content }) => {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase.rpc(
        "get_article_list_from_category",
        {
          category_id: content?.id,
          user_id: 1,
        }
      );
      if (error) console.error(error);
      else setArticles(data);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {articles && <BigArticleList articles={articles} scrollEnabled={true} />}
    </View>
  );
};

export default TabContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
