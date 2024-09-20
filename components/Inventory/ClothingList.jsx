import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ClothingListCard from "./ClothingListCard";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ClothingList() {
  const [clothingList, setClothingList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "Clothings"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const clothings = [];
      querySnapshot.forEach((doc) => {
        const clothingData = doc.data();
        clothingData.od = doc.id;
        clothings.push(clothingData);
      });
      setClothingList(clothings);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            paddingLeft: 20,
            paddingTop: 20,
            marginBottom: 5,
          }}
        >
          Clothes You Own
        </Text>
        <TouchableOpacity onPress={() => router.push('/clothingList/register_clothing')}>
          <Image
            source={require("./../../assets/images/addIcon.png")}
            style={{
              height: 30,
              width: 30,
              marginTop: 20,
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={clothingList}
        renderItem={({ item }) => (
          <ClothingListCard clothing={item} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
