import React, {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";

import Login from "./screens/auth/Login/Login";
import Signup from "./screens/auth/Register/Signup";
import Landing from "./screens/auth/Landing";

import DrawerNavigator from "./screens/app/Navigator/Navigator";
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from "./utils/context/context";
import Calculator from "./screens/app/Calculator/Calculator";
import Home from "./screens/app/Home/Home";
import SyncStorage from "sync-storage";
import { windowHeight } from "./utils/Dimentions";

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
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

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
       async function storageDefault () {
        const data = await SyncStorage.init();
        console.log('AsyncStorage is ready!', data);
        }
        storageDefault()
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
          <Stack.Screen name="Calculator" component={Home} />
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

const styles = StyleSheet.create({
  containerApp: {
    height: windowHeight,
  }
});
