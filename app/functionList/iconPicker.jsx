import React from 'react';
import { View, Image, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';

// hardcoded
const icons = [
  { id: 'shirt1.png', uri: require('../../assets/images/ClothingIcons/shirt1.png') },
  { id: 'shirt2.png', uri: require('../../assets/images/ClothingIcons/shirt2.png') },
  { id: 'shirt3.png', uri: require('../../assets/images/ClothingIcons/shirt3.png') },
  { id: 'shirt4.png', uri: require('../../assets/images/ClothingIcons/shirt4.png') },
  { id: 'dress1.png', uri: require('../../assets/images/ClothingIcons/dress1.png') },
  { id: 'dress2.png', uri: require('../../assets/images/ClothingIcons/dress2.png') },
  { id: 'dress3.png', uri: require('../../assets/images/ClothingIcons/dress3.png') },
  { id: 'shorts1.png', uri: require('../../assets/images/ClothingIcons/shorts1.png') },
  { id: 'shorts2.png', uri: require('../../assets/images/ClothingIcons/shorts2.png') },
  { id: 'shorts3.png', uri: require('../../assets/images/ClothingIcons/shorts3.png') },
  { id: 'skirt1.png', uri: require('../../assets/images/ClothingIcons/skirt1.png') },
  { id: 'skirt2.png', uri: require('../../assets/images/ClothingIcons/skirt2.png') },
  { id: 'skirt3.png', uri: require('../../assets/images/ClothingIcons/skirt3.png') },
  { id: 'skirt4.png', uri: require('../../assets/images/ClothingIcons/skirt4.png') },
  { id: 'socks1.png', uri: require('../../assets/images/ClothingIcons/socks1.png') },
  { id: 'socks2.png', uri: require('../../assets/images/ClothingIcons/socks2.png') },
  { id: 'socks3.png', uri: require('../../assets/images/ClothingIcons/socks3.png') }
];

export default function IconPicker({ visible, onIconSelected, onClose }) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalView}>
          <FlatList
            data={icons}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onIconSelected(item.uri, item.id)}>
                <Image source={item.uri} style={styles.iconImage} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={3}
          />
        </View>
      </Modal>
    );
  }
  

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: 'white'
  },
  iconImage: {
    width: 100,
    height: 100,
    margin: 10
  }
});
