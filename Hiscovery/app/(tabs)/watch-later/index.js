import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import SmallArticleList from "../../../components/article-list/SmallArticleList";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Header from "../../../components/header/Header";
import { SIZES } from "../../../constants";

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
      console.log('Id here', data)
    }
  }

  const [articles, setArticles] = useState(null);
  useEffect(() => {
    async function fetchData() {
      await getId()
      let { data, error } = await supabase.rpc("get_watchlater_list", {
        userid: readerId,
      });
      // console.log("data", data);
      if (error) console.error(error);
      else setArticles(data);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <Header title="Watch Later" iconvisible={false} />,
          headerTitleAlign: "center",
        }}
      />
      {/* <Text>Index page of Watch Later Tab</Text> */}
      {articles && <SmallArticleList articles={articles} />}
    </View>
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
