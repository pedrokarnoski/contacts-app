import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import { Home } from "@/app/Home";

import "@/styles/global.css";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Home />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
