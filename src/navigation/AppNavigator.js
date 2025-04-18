import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isAuthenticated, onLoginSuccess, onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Drawer">
          {(props) => <DrawerNavigator {...props} onLogout={onLogout} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
