import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

export default function CuentasScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View>
        {Array.from({ length: 30 }).map((_, i) => (
          <Layout key={i} style={styles.card}>
            <Text>Hola {i + 1}</Text>
          </Layout>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 20,
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
});
