import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Datepicker,
  Input,
  Layout,
  Select,
  SelectItem
} from '@ui-kitten/components';
import { api } from '../../../services/api';
import { endpoints } from '../../../services/endpoints';
import getIcon from '../../../utils/icons/PlusIcon';

export default function NewCuenta({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState(null);
  const [tiposCuenta, setTiposCuenta] = useState([]);
  const [saldo, setSaldo] = useState('');
  const [limite, setLimite] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState(null);

  useEffect(() => {
    const fetchTiposCuenta = async () => {
      try {
        const response = await api.get(endpoints.tiposCuenta);
        setTiposCuenta(response.data || []);
      } catch (error) {
        // console.error(error);
      }
    };
    fetchTiposCuenta();
  }, []);

  const isTarjetaCredito = () => {
    if (!tipoCuenta) return false;
    return tiposCuenta[tipoCuenta.row]?.nombre.toLowerCase().includes('tarjeta de credito');
  };

  const handleGuardar = async () => {
    try {
      const payload = {
        nombreCuenta: nombre,
        descripcionCuenta: descripcion,
        tipo_cuenta: tiposCuenta[tipoCuenta.row].id,
        saldoCuenta: parseFloat(saldo) || 0,
        icono: 'credit-card',
        estatus: true,
      };

      if (isTarjetaCredito()) {
        payload.limite = parseFloat(limite) || 0;
        payload.fecha_vencimiento = fechaVencimiento ? new Date(fechaVencimiento).getTime() : null;
      }

      await api.post(endpoints.cuentas, payload);
      Alert.alert('Éxito', 'Cuenta creada correctamente');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la cuenta.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Layout style={styles.form}>
          <Input
            label="Nombre de cuenta"
            placeholder="Ej. BBVA"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <Input
            label="Descripción"
            placeholder="Opcional"
            value={descripcion}
            onChangeText={setDescripcion}
            style={styles.input}
          />
          <Select
            label="Tipo de cuenta"
            selectedIndex={tipoCuenta}
            value={tipoCuenta ? tiposCuenta[tipoCuenta.row]?.nombre : 'Seleccionar'}
            onSelect={index => setTipoCuenta(index)}
            style={styles.input}
          >
            {tiposCuenta.map((tipo, i) => (
              <SelectItem key={i} title={tipo.nombre} />
            ))}
          </Select>

          {tipoCuenta && (
            <>
              <Input
                label={isTarjetaCredito() ? 'Saldo inicial' : 'Saldo'}
                placeholder="$0.00"
                keyboardType="decimal-pad"
                value={saldo}
                onChangeText={setSaldo}
                style={styles.input}
              />

              {isTarjetaCredito() && (
                <>
                  <Input
                    label="Límite"
                    placeholder="$0.00"
                    keyboardType="decimal-pad"
                    value={limite}
                    onChangeText={setLimite}
                    style={styles.input}
                  />
                  <Datepicker
                    label="Fecha de vencimiento"
                    date={fechaVencimiento}
                    onSelect={nextDate => setFechaVencimiento(nextDate)}
                    style={styles.input}
                  />
                </>
              )}
            </>
          )}
        </Layout>
      </ScrollView>

      <View style={styles.containerButtons}>
        <Button
          onPress={() => navigation.navigate('CuentasScreen')}
          style={styles.button}
          status="danger"
          accessoryLeft={(props) => getIcon(props, 'close')}
        />
        <Button
          onPress={handleGuardar}
          style={styles.button}
          status="success"
        >
          Guardar nueva cuenta
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
    paddingBottom: 100, // para que no tape el teclado ni los botones
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 15,
    borderColor: '#fff',
    backgroundColor: '#fff'
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 50,
  },
});
