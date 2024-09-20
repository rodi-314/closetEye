import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ModuleListCard from "./ModuleListCard";
import { TouchableOpacity } from "react-native";
import { router } from 'expo-router';

export default function ModuleList() {
  const [moduleList, setModuleList] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "Modules"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const modules = [];
      querySnapshot.forEach((doc) => {
        const moduleData = doc.data();
        moduleData.id = doc.id;
        modules.push(moduleData);
      });
      setModuleList(modules);
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
          Modules You Own
        </Text>
        <TouchableOpacity onPress={() => router.push('/functionList/register')}>
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
        data={moduleList}
        renderItem={({ item }) => (
          <ModuleListCard module={item} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
