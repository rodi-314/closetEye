import { View, Text } from 'react-native'
import React from 'react'
import ClothingAI from '../../components/Home/ClothingAI'
import FuncIcons from '../../components/Home/FuncIcons'
import OutfitCalander from '../../components/Home/OutfitCalander'
import HeaderHome from '../../components/Home/HeaderHome'

export default function home() {
  return (
    <View>
      <HeaderHome/>
      <FuncIcons/>
      <OutfitCalander/>
      <ClothingAI/>
    </View>
  )
}
