import { Stack, Link } from "expo-router";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { icons, COLORS } from "../../../constants";
import CustomTabBar from "../../../components/tab-custom/CustomTabBar";
import { supabase } from "../../../lib/supabase";
import TabContent from "../../../components/tab-custom/TabContent";

const Page = () => {
  const [nestedTabs, setNestedTabs] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let { data: Category, error } = await supabase
          .from("Category")
          .select("name");

        const tempt = Category.map((item, index) => {
          return {
            key: (index + 1).toString(),
            title: item.name,
            content: item.name,
          };
        });

        console.log("tempt", tempt);

        setNestedTabs(tempt);
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Link href={"/category-list"}>
              <icons.category fill={COLORS.iconColor} />
            </Link>
          ),
          headerTitle: () => (
            <Image
              source={require("../../../assets/images/logo-home.png")}
              style={{
                width: 60,
                height: 60,
                resizeMode: "contain",
              }}
            />
          ),
          headerRight: () => <icons.notification fill={COLORS.iconColor} />,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <CustomTabBar
        nestedTabs={nestedTabs}
        TabContent={TabContent}
        widthOfPerTab={Dimensions.get("window").width / 3}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
