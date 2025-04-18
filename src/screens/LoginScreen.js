import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Lógica para autenticar con la Api
      const response = await fetch('https://sunlit-mix-416216.uc.r.appspot.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Guarda el token en AsyncStorage
      await AsyncStorage.setItem('userToken', data.data);

      // Notifica al componente App que el login fue exitoso
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Ocurrió un error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.title}>Iniciar Sesión</Text>

      <Input
        label="Usuario"
        placeholder="Escribe tu usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <Input
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error !== '' && <Text status="danger">{error}</Text>}

      <Button onPress={handleLogin} disabled={loading} style={styles.button}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});

export default LoginScreen;
