import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import HeaderInv from '../../components/Inventory/HeaderInv'
import ModuleList from '../../components/Inventory/ModuleList'

export default function inventory() {
  return (
    <View>
      <ScrollView>
        <HeaderInv/>
        <ModuleList/>
      </ScrollView>
    </View>
  )
}