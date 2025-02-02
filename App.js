import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import Loader from "./components/Loader/Loader";
import { supabase } from "./utils/db/supabaseClient";
import useLoadFonts from "./hooks/useLoadFonts";

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
  const { user, setUser, db, setSession } = useContext(AuthenticatedUserContext);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error restaurando la sesión:", error);
      } else {
        setUser(!!data.session);
        setSession(data.session);
      }
    };

    restoreSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Evento de auth:", event);
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setUser(!!session);
        setSession(session);
      } else if (event === "SIGNED_OUT") {
        setUser(false);
        setSession(null);
      }
      setIsAppReady(true);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function initDB() {
      await initDatabase(db);
      const isLanguage = await getLanguage(db);
      if (isLanguage.length === 0) {
        await addLanguage(db, Localization.locale, parseLanguages(Localization.locale));
      }
    }
    initDB();
  }, []);

  if (!isAppReady) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const fontsLoaded = useLoadFonts();
  !fontsLoaded && null;

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
