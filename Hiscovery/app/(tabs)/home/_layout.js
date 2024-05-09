import { Stack, Link, useRouter } from "expo-router";
import { Image, View, TextInput, TouchableOpacity } from "react-native";
import { icons, COLORS } from "../../../constants";
import { useState } from "react";

const HomeLayout = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  return (
    <Stack
      screenOptions={{ headerShadowVisible: false, headerTitleAlign: "center" }}
    >
      <Stack.Screen
        name="(tabs-top)"
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
                <icons.notification fill={COLORS.iconColor} />
              </TouchableOpacity>
              <icons.notification fill={COLORS.iconColor} />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="detail"
        options={{ headerTitle: "Detail", headerBackTitle: "Back" }}
      />
    </Stack>
  );
};

export default HomeLayout;
