import React from 'react';
import { View, Image, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import icons from './icons'; // Make sure the path to Icons.js is correct

export default function IconPicker({ visible, onIconSelected, onClose }) {
  const iconEntries = Object.entries(icons).map(([id, uri]) => ({ id, uri }));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <FlatList
          data={iconEntries}
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
    backgroundColor: 'white',
    marginTop: 50,
  },
  iconImage: {
    width: 100,
    height: 100,
    margin: 10
  }
});
