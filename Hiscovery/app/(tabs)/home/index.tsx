import { Stack, Link, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { icons, COLORS, SIZES } from "../../../constants";
import CustomTabBar from "../../../components/tab-custom/CustomTabBar";
import { supabase } from "../../../lib/supabase";
import TabContent from "../../../components/tab-custom/TabContent";

const Page = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const localParams = useLocalSearchParams();

  // console.log("localParams", localParams.idCategory);
  const [nestedTabs, setNestedTabs] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        let { data: Category, error } = await supabase
          .from("Category")
          .select("id, name");

        const tempt = Category.map((item, index) => {
          return {
            key: (index + 1).toString(),
            title: item.name,
            content: item,
          };
        });

        // console.log("tempt", tempt);

        setNestedTabs(tempt);
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  // console.log("nestedTabs", nestedTabs);

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
            isSearchVisible ? (
              <TextInput
                placeholder="Search..."
                value={searchValue}
                onChangeText={text => setSearchValue(text)}
              />
            ) : (
              <Image
                source={require("../../../assets/images/logo-home.png")}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                }}
              />
            )
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                if (isSearchVisible) {
                  // Navigate to the search page
                  router.push("/search/" + searchValue);
                  setSearchValue(""); // Clear the search field
                }
                setSearchVisible(!isSearchVisible);
              }}>
                <icons.search fill={COLORS.iconColor} />
              </TouchableOpacity>
              <icons.notification fill={COLORS.iconColor} />
            </View>
          ),
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <View style={{ flex: 1, backgroundColor: "white" }}>
        {nestedTabs && (
          <CustomTabBar
            nestedTabs={nestedTabs}
            TabContent={TabContent}
            initIndex={localParams?.idCategory ? localParams?.idCategory : null}
          />
        )}
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SIZES.heightBottomNavigation,
  },
});