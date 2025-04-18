import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CuentasScreen from '../screens/CuentasScreen';
import NewCuenta from '../screens/NewCuenta';


const Stack = createNativeStackNavigator();

export default function CuentasStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CuentasScreen" component={CuentasScreen} />
      <Stack.Screen name="NuevaCuenta" component={NewCuenta} />
    </Stack.Navigator>
  );
}
