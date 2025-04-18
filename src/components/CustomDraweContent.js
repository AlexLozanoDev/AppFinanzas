// components/CustomDrawerContent.js
import React, { useEffect, useState } from 'react';
import { Drawer, DrawerItem, Text, Layout, Button, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomDrawerContent = ({ navigation, state, onLogout }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('username');
      if (user) setUsername(user);
    };
    getUser();
  }, []);

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.warn('No se encontró un token para cerrar sesión.');
        return;
      }

      const response = await fetch('https://sunlit-mix-416216.uc.r.appspot.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Error en logout:', response.status);
      }

      const data = await response.json();
      console.log('Logout response:', data);

      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('username');

      onLogout();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const drawerItems = [
    { title: 'Inicio', route: 'Inicio' },
    { title: 'Cuentas', route: 'Cuentas' },
    { title: 'Deudas', route: 'Deudas' },
    { title: 'Inversiones', route: 'Inversiones' },
  ];  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ padding: 20 }}>
        <Text category='h6'>Bienvenido</Text>
        <Text appearance='hint'>{username}</Text>
      </Layout>

      <Divider />

      <Drawer
        selectedIndex={{ row: state.index }}
        onSelect={(index) => {
          navigation.navigate(drawerItems[index.row].route);
        }}
      >
        {drawerItems.map((item, idx) => (
          <DrawerItem key={idx} title={item.title} />
        ))}
      </Drawer>

      <Layout style={{ padding: 20 }}>
        <Button
          status='danger'
          appearance='outline'
          onPress={logout}
          style={{ borderRadius: 12 }}
        >
          Cerrar sesión
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
