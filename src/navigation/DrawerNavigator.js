import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';

import Home from '../screens/Home';
import DeudasScreen from '../screens/DeudasScreen';
import InversionesScreen from '../screens/InversionesScreen';
import CuentasStack from '../screens/Cuentas/navigation/CuentasNavigation';
import CustomDrawerContent from '../components/CustomDraweContent';
import BottomTabs from '../components/BottomTabs';
import { SafeAreaLayout } from '../components/SafeAreaLayout';
import { useEffect } from 'react';
import { useNavigationState, getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const MenuIcon = (props) => <Icon {...props} name="menu-outline" />;

const getActiveRouteName = (route) => {
  if (!route) return null;
  if (route.state) {
    return getActiveRouteName(route.state.routes[route.state.index]);
  }
  return route.name;
};


export default function DrawerNavigator({ onLogout }) {
  const [title, setTitle] = useState('Inicio');

  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return getActiveRouteName(route);
  });
  

  useEffect(() => {
    switch (currentRouteName) {
      case 'Cuentas':
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
  }, [currentRouteName]);

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
        screenOptions={({ route, navigation }) => ({          
          header: () => renderTopNavigation(navigation),
        })}
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
