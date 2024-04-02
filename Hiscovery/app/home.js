import { useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

import Comment from "../components/comment/Comment";
import ArticleCard from "../components/articleCard/ArticleCard";
import SmallArticleCard from "../components/smallArticleCard/SmallArticleCard"

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      router.push('/auth');
    }
  }

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    //   <Stack.Screen
    //     options={{
    //       headerStyle: { backgroundColor: COLORS.lightWhite },
    //       headerShadowVisible: false,
    //       headerLeft: () => (
    //         <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
    //       ),
    //       headerRight: () => (
    //         <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
    //       ),
    //       headerTitle: "",
    //     }}
    //   />

    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <View
    //       style={{
    //         flex: 1,
    //         padding: SIZES.medium,
    //       }}
    //     >
    //       <Welcome
    //         searchTerm={searchTerm}
    //         setSearchTerm={setSearchTerm}
    //         handleClick={() => {
    //           if (searchTerm) {
    //             router.push(`/search/${searchTerm}`);
    //           }
    //         }}
    //       />

    //       <Popularjobs />
    //       <Nearbyjobs />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <View>

      <Button title="Sign Out" onPress={signOut} />

    </View>
  );
};

export default Home;
