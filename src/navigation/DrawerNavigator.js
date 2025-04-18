import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import CustomDrawerContent from '../components/CustomDraweContent';
import CuentasScreen from '../screens/CuentasScreen';
import DeudasScreen from '../screens/DeudasScreen';
import InversionesScreen from '../screens/InversionesScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({onLogout}) => {
  return (
    <Drawer.Navigator
      drawerContent={(drawerProps) => (
        <CustomDrawerContent {...drawerProps} onLogout={onLogout} />
      )}
      drawerPosition="right"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Inicio" component={TabNavigator} />
      <Drawer.Screen name="Cuentas" component={CuentasScreen} />
      <Drawer.Screen name="Deudas" component={DeudasScreen} />
      <Drawer.Screen name="Inversiones" component={InversionesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
