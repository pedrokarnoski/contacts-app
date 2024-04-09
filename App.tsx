import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Lato_700Bold,
  Lato_400Regular,
  Lato_300Light,
} from "@expo-google-fonts/lato";

import { Home } from "@/app/Home";
import { Loading } from "@/components/Loading";

import "@/styles/global.css";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_700Bold,
    Lato_400Regular,
    Lato_300Light,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Home />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
