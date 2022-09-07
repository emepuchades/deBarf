import React from "react";

// import things related to React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import Landing from "./screens/auth/Landing";
import RegisterScreen from "./screens/auth/Register";
import LoginScreen from "./screens/auth/Login";

// create a "stack"
const MyStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator initialRouteName="Landing">
        <MyStack.Screen
          name="Landing"
          component={Landing}
          options={optionsComponent}
        />
        <MyStack.Screen name="Register" component={RegisterScreen} options={optionsComponent}/>
        <MyStack.Screen name="Login" component={LoginScreen} options={optionsComponent}/>
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const optionsComponent = {
  title: '',
  headerTransparent: true,
  headerStyle: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    backgroundColor: "#fff"
  }
}