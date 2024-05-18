//app/index.tsx
import { Redirect } from "expo-router";
import React from "react";
import 'text-encoding'

export default function Index() {
  return <Redirect href={"/(tabs)/home"} />;
}
