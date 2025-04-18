// navigation/DrawerNavigator.js
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TopNavigation, TopNavigationAction, Icon, Layout } from '@ui-kitten/components';

import Home from '../screens/Home';
import DeudasScreen from '../screens/DeudasScreen';
import InversionesScreen from '../screens/InversionesScreen';
import CuentasStack from '../screens/Cuentas/navigation/CuentasNavigation';
import CustomDrawerContent from '../components/CustomDraweContent';
import BottomTabs from '../components/BottomTabs';
import { SafeAreaLayout } from '../components/SafeAreaLayout';

const Drawer = createDrawerNavigator();

const MenuIcon = (props) => <Icon {...props} name="menu-outline" />;

export default function DrawerNavigator({ onLogout, navigation }) {
  const [title, setTitle] = useState('Inicio');

  const handleRouteChange = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

    switch (routeName) {
      case 'CuentasScreen':
        setTitle('Cuentas');
        break;
      case 'NuevaCuenta':
        setTitle('Nueva Cuenta');
        break;
      case 'Deudas':
        setTitle('Deudas');
        break;
      case 'Inversiones':
        setTitle('Inversiones');
        break;
      default:
        setTitle('Inicio');
    }
  };

  const renderTopNavigation = (navigation) => (
    <TopNavigation
      title={title}
      alignment="center"
      accessoryLeft={() => (
        <TopNavigationAction icon={MenuIcon} onPress={() => navigation.openDrawer()} />
      )}
    />
  );

  return (
    <SafeAreaLayout>
      <Drawer.Navigator
        screenOptions={({ route, navigation }) => {
          handleRouteChange(route);
          return {
            header: () => renderTopNavigation(navigation),
          };
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} onLogout={onLogout} />}
      >
        <Drawer.Screen name="Inicio" component={BottomTabs} />
        <Drawer.Screen name="Cuentas" component={CuentasStack} />
        <Drawer.Screen name="Deudas" component={DeudasScreen} />
        <Drawer.Screen name="Inversiones" component={InversionesScreen} />
      </Drawer.Navigator>
    </SafeAreaLayout>
  );
}
