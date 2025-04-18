import { Layout, Text, Card } from '@ui-kitten/components'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function Home() {
  return (
    <ScrollView>
        <Layout style={styles.layout}>
            <Text>Card</Text>
        </Layout>
    </ScrollView>
  )
}


const styles = StyleSheet.create({

    layout: {
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        flexDirection: 'column',
        margin: 10,
        padding: 20,
        borderRadius: 10
    },

    card:{
        flex: 1
    }

});
