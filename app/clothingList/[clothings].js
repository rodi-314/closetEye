import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, dbReal } from "../../configs/FirebaseConfig";
import { ref, get as getFirebase } from "firebase/database"; // Correct import for using get from Firebase Realtime Database
import ClothingsByModuleCard from "../../components/Inventory/ClothingsByModuleCard";

export default function ClothingByModule({}) {
  const navigation = useNavigation();
  const { clothings } = useLocalSearchParams();
  const [moduleName, setModuleName] = useState('');
  const [clothingList, setClothingList] = useState([]);

  useEffect(() => {
    const fetchModule = async () => {
      const q = query(collection(db, 'Modules'), where('key', '==', clothings));
      const querySnapshot = await getDocs(q);
      const moduleData = querySnapshot.docs.map(doc => doc.data()).find(Boolean);
      if (moduleData) {
        setModuleName(moduleData.name); 
      }
      getClothingList();
    };
    fetchModule();
  }, []);

  useEffect(() => {
    if (moduleName) {
      navigation.setOptions({
        headerShown: true,
        headerTitle: moduleName,
        headerStyle: {
          backgroundColor: "#6d5cc4",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontFamily: "outfit-medium",
        },
      });
    }
  }, [moduleName]);

  const getClothingList = async () => {
    const q = query(collection(db, 'Clothings'), where('moduleLink', '==', clothings));
    const querySnapshot = await getDocs(q);
    const clothes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter based on RFID 'in' status
    const filteredClothes = await Promise.all(clothes.map(async (clothing) => {
      const rfidRef = ref(dbReal, `inventory/${clothing.rfid}/in`);
      const rfidSnapshot = await getFirebase(rfidRef);
      if (rfidSnapshot.exists() && rfidSnapshot.val()) {
        return clothing;  // Include this clothing if 'in' is true
      }
      return null;
    }));

    setClothingList(filteredClothes.filter(Boolean));  // Update state with filtered list
  };

  return (
    <View>
      <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 10,
          paddingTop: 15,
          marginBottom: 5,
        }}>
        Clothes in This Module
      </Text>
      <FlatList
        data={clothingList}
        renderItem={({ item }) => (
          <ClothingsByModuleCard clothing={item} key={item.id} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
