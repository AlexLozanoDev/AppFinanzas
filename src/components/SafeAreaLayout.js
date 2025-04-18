// components/SafeAreaLayout.js
import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';

export const SafeAreaLayout = ({ children, style }) => (
  <SafeAreaView style={[styles.safeArea, style]}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Ajuste específico para Android
    backgroundColor: '#fff', // Puedes cambiarlo si usas modo oscuro
  },
});
