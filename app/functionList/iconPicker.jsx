import React from 'react';
import { View, Image, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';

// hardcoded
const icons = [
  { id: 1, uri: require('../../assets/images/ClothingIcons/shirt1.png') },
  { id: 2, uri: require('../../assets/images/ClothingIcons/shirt2.png') },
  { id: 3, uri: require('../../assets/images/ClothingIcons/shirt3.png') },
  { id: 4, uri: require('../../assets/images/ClothingIcons/shirt4.png') },
  { id: 5, uri: require('../../assets/images/ClothingIcons/dress1.png') },
  { id: 6, uri: require('../../assets/images/ClothingIcons/dress2.png') },
  { id: 7, uri: require('../../assets/images/ClothingIcons/dress3.png') },
  { id: 8, uri: require('../../assets/images/ClothingIcons/shorts1.png') },
  { id: 9, uri: require('../../assets/images/ClothingIcons/shorts2.png') },
  { id: 10, uri: require('../../assets/images/ClothingIcons/shorts3.png') },
  { id: 11, uri: require('../../assets/images/ClothingIcons/skirt1.png') },
  { id: 12, uri: require('../../assets/images/ClothingIcons/skirt2.png') },
  { id: 13, uri: require('../../assets/images/ClothingIcons/skirt3.png') },
  { id: 14, uri: require('../../assets/images/ClothingIcons/skirt4.png') },
  { id: 15, uri: require('../../assets/images/ClothingIcons/socks1.png') },
  { id: 16, uri: require('../../assets/images/ClothingIcons/socks2.png') },
  { id: 17, uri: require('../../assets/images/ClothingIcons/socks3.png') }
];

export default function iconPicker({ visible, onIconSelected, onClose }) {
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
            <TouchableOpacity onPress={() => onIconSelected(item.uri)}>
              <Image source={item.uri} style={styles.iconImage} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
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
