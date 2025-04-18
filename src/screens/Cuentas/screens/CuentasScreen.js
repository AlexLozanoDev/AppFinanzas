import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { Button, Layout, Text, IconElement } from '@ui-kitten/components';
import { cuentasService } from '../../../services/cuentasService';
import PlusIcon from '../../../utils/icons/PlusIcon';
import { useNavigation } from '@react-navigation/native';
import getIcon from '../../../utils/icons/PlusIcon';


export default function CuentasScreen() {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchCuentas = async () => {
        try {
          setLoading(true);
          const response = await cuentasService.getCuentas();
          setCuentas(response.data || []);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'No se pudieron cargar las cuentas.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCuentas();
    }, [])
  );
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View>
          {cuentas.map((cuenta, i) => (
            <Layout key={i} style={styles.card}>
              <Text category="s1">{cuenta.nombreCuenta}</Text>
              <Text appearance="hint">{cuenta.descripcionCuenta || 'Sin descripción'}</Text>
              <Text category="h6">${cuenta.saldoCuenta.toFixed(2)}</Text>
            </Layout>
          ))}
        </View>
      </ScrollView>
      <Button
        style={styles.floatingButton}
        appearance="filled"
        status="success"
        accessoryLeft={(props) => getIcon(props, 'plus')} 
        onPress={() => navigation.navigate('NuevaCuenta')}>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 80, // espacio extra para que el scroll no tape la última tarjeta con el botón
  },
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 50
  },
});
