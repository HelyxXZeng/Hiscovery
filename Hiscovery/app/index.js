import { Redirect } from "expo-router";
import 'text-encoding'

export default function Index() {
  return <Redirect href={"/home"} />;
}
