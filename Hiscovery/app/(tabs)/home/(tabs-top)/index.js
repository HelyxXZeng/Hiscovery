import { View, Text, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Link href={"/(tabs)/home/detail"} asChild>
        <Button title="Open Details Page" />
      </Link>
    </View>
  );
};

export default Page;
