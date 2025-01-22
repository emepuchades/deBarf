import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, Text, Image } from "react-native";

import * as Font from "expo-font";
import * as Localization from "expo-localization";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/db/firebase";

import Login from "./screens/auth/Login/Login";
import Signup from "./screens/auth/Register/Signup";
import Landing from "./screens/auth/Landing";

import DrawerNavigator from "./screens/app/Navigator/Navigator";
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from "./utils/context/context";
import initDatabase from "./utils/db/db";
import { addLanguage, getLanguage } from "./utils/db/dbLanguage";
import { parseLanguages } from "./utils/info/languages";
import Loader from "./components/Loader/Loader";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser, db } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocale] = useState(Localization.locale);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);

  useEffect(() => {
    async function initDB() {
      await initDatabase(db);
      const isLanguage = await getLanguage(db);
      if (isLanguage.length === 0) {
        await addLanguage(db, locale, parseLanguages(locale));
      }
    }
    initDB();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "MonaSans-Regular": require("./assets/fonts/MonaSans-Regular.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Loader />
      </View>
    );
  }

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}