import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';

import Login from './screens/auth/Login/Login';
import Signup from './screens/auth/Register/Signup';
import Landing from './screens/auth/Landing'

import Home from './screens/app/Home/Home';
import MainScreen from './screens/app/Main';
import AddPost from './screens/app/AddPost/AddPost';
import PreviewScreen from './screens/app/AddPost/Preview';
import DrawerNavigator from './screens/app/Navigator/Navigator';
import { AuthenticatedUserContext, AuthenticatedUserProvider } from './utils/context/context';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator defaultScreenOptions={MainScreen} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="beBarf" component={MainScreen} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='AddPost' component={AddPost} />
      <Stack.Screen name='Preview' component={PreviewScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Landing' component={Landing} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ?
        <>
          <DrawerNavigator />
        </>
        : <AuthStack />
      }
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