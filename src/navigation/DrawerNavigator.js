import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import CustomDrawerContent from '../components/CustomDraweContent';

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
      <Drawer.Screen name="Inicio" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
