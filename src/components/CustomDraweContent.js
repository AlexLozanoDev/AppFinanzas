import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@ui-kitten/components';

const CustomDrawerContent = (props) => {
  const { onLogout } = props;
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
  

  return (
    <>
      <DrawerContentScrollView {...props}>

        <DrawerItemList {...props} />

      </DrawerContentScrollView>
      <Button
      style={styles.button}
      appearance='outline'
      status='danger'
      onPress={logout}
      >
      Cerrar sesión
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    margin: 15,
    borderRadius: 20
  },
  logoutText: {
    color: 'red'
  }
});

export default CustomDrawerContent;
