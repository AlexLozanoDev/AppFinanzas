import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function DeudasScreen() {
  return (
    <Layout style={style.layout}>
      <Text category="h1">De pantalla</Text>
    </Layout>
  )
}

const style = StyleSheet.create({

    layout:{
        lex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }

})
