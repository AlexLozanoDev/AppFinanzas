import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = ({ onLogout }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Drawer">
      {(props) => <DrawerNavigator {...props} onLogout={onLogout} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const UnauthenticatedStack = ({ onLoginSuccess }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login">
      {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default function AppNavigator({ isAuthenticated, onLoginSuccess, onLogout }) {
  return isAuthenticated ? (
    <AuthenticatedStack onLogout={onLogout} />
  ) : (
    <UnauthenticatedStack onLoginSuccess={onLoginSuccess} />
  );
}
