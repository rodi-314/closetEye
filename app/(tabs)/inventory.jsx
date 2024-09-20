import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import HeaderInv from '../../components/Inventory/HeaderInv';
import ModuleList from '../../components/Inventory/ModuleList';
import ClothingList from '../../components/Inventory/ClothingList';
import OutfitList from '../../components/Inventory/OutfitList';

export default function Inventory() {
  const [activeSection, setActiveSection] = useState('modules');

  return (
    <View>
      <ScrollView>
        <HeaderInv activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'modules' && <ModuleList />}
        {activeSection === 'clothings' && <ClothingList />}
        {activeSection === 'outfits' && <OutfitList />}
      </ScrollView>
    </View>
  );
}
