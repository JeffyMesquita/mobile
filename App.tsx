import 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import { theme } from "./src/theme";
import  Widget  from "./src/components/Widget";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });
  

  useEffect(() => {
    async function loadSplash() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await SplashScreen.hideAsync();

        

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    loadSplash();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if(appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="auto" />
      
      <Widget />
    </View>
  );
}
