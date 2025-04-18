import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@ui-kitten/components';

import RegistrosScreen from '../screens/RegistrosScreen';
import CuentasScreen from '../screens/CuentasScreen';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3366FF',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon name='home' fill={color} style={{ width: 24, height: 24 }} />,
        }}
      />
      <Tab.Screen
        name="Registros"
        component={RegistrosScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="list" fill={color} style={{ width: 24, height: 24 }} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
