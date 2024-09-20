import { View, Text } from 'react-native'
import React from 'react'

export default function ClothingList() {
  return (
    <View>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 5
        }}>Clothes You Own</Text>
    </View>
  )
}