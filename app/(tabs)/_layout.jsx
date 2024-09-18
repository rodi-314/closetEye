import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Tablayout() {

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name='inventory' options={{
        tabBarLabel: 'Inventory',
        tabBarIcon: () => <MaterialCommunityIcons name="wardrobe" size={24} color={"black"} />
      }} />
      <Tabs.Screen name='home' options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => <Ionicons name="home" size={24} color={"black"} />
      }} />
      <Tabs.Screen name='profile' options={{
        tabBarLabel: 'Profile',
        tabBarIcon: () => <Ionicons name="people-circle" size={24} color={"black"} />
      }} />
    </Tabs>
  );
}
