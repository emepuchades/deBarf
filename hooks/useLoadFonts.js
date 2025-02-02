import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        "MonaSans-Regular": require("../assets/fonts/MonaSans-Regular.ttf"),
        "MonaSans-Bold": require("../assets/fonts/MonaSans-Bold.ttf"),
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded;
};

export default useLoadFonts;
