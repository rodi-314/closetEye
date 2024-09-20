import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function OutfitList() {
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
          Outfits You Own
        </Text>
        <TouchableOpacity>
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
    </View>
  );
}
