import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/db/firebase";
import * as Localization from "expo-localization";

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <>
          <DrawerNavigator />
        </>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
