import { View, Text } from 'react-native'
import React from 'react'

export default function OutfitList() {
  return (
    <View>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 5
        }}>Outfits You Own</Text>
    </View>
  )
}