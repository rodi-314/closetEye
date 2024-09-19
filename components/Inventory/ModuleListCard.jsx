import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ModuleListCard() {
  return (
    <View>
      <Image source={require('../../assets/images/ClothingIcons/shirt1.png')}
        style={{
            width:120,
            height:120
        }}
      />
    </View>
  )
}