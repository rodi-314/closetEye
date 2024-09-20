import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ClothingListCard from './ClothingListCard';

export default function ClothingList() {
  
  const [clothingList, setClothingList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'Clothings'));
    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
      const clothings = [];
      querySnapshot.forEach((doc) => {
        const clothingData = doc.data();
        clothingData.od = doc.id;
        clothings.push(clothingData);
      });
      setClothingList(clothings);
    })
    return () => unsubscribe();
  }, []);
  
  return (
    <View>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            paddingLeft: 20,
            paddingTop: 20,
            marginBottom: 5
        }}>Clothes You Own</Text>
        <FlatList 
            data={clothingList}
            renderItem={({ item }) => (
                <ClothingListCard clothing={item} key={item.id} />
            )}
            keyExtractor={item => item.id}
        />
    </View>
);
}