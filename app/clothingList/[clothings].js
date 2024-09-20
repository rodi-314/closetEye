import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ClothingsByModuleCard from "../../components/Inventory/ClothingsByModuleCard";

export default function ClothingByModule({}) {
  const navigation = useNavigation();
  const { clothings } = useLocalSearchParams();
  const [moduleName, setModuleName] = useState('');
  const [clothingList,setClothingList] = useState([]);

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
    setClothingList(clothes); 
  };
  

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 10,
          paddingTop: 15,
          marginBottom: 5,
        }}
      >
        Clothes in This Module
      </Text>
      <FlatList
        data ={clothingList}
        renderItem={({item,index})=>(
          <ClothingsByModuleCard
            clothing={item}
            key={index}
          />
        )}
      />
    </View>
  );
}
