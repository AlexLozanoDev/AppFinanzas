import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ActivityIndicator, SafeAreaView, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator'; // <-- este es tu archivo corregido

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error al verificar token', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator isAuthenticated={isAuthenticated} onLoginSuccess={() => setIsAuthenticated(true)} onLogout={() => setIsAuthenticated(false)}/>
          </SafeAreaView>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
