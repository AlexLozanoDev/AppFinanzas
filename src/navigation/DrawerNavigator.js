import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DeudasScreen from '../screens/DeudasScreen';
import InversionesScreen from '../screens/InversionesScreen';
import PrestamosScreen from '../screens/PrestamosScreen';
import TabNavigator from './TabNavigator';
import Home from '../screens/Home';
import CuentasScreen from '../screens/CuentasScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={TabNavigator} />
      <Drawer.Screen name='Cuentas' component={CuentasScreen} />
      <Drawer.Screen name="Préstamos" component={PrestamosScreen} />
      <Drawer.Screen name="Deuda" component={DeudasScreen} />
      <Drawer.Screen name="Inversiones" component={InversionesScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
