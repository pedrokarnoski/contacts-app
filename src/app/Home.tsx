import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Header } from "@/components/Header";
import { Input } from "@/components/Input";

import { colors } from "@/styles/colors";
import { Contact } from "@/components/Contact";

export function Home() {
  const [name, setName] = useState("");

  return (
    <View className="flex-1 bg-gray-200">
      <Header />

      <Input>
        <MaterialCommunityIcons
          name="account-search"
          size={16}
          color={colors.gray[300]}
        />
        <Input.Field
          placeholder="Pesquisar pelo nome..."
          onChangeText={setName}
          value={name}
        />
        <TouchableOpacity onPress={() => setName("")}>
          <MaterialCommunityIcons
            name="window-close"
            size={16}
            color={colors.gray[300]}
          />
        </TouchableOpacity>
      </Input>

      <Contact
        contact={{
          name: "Pedro",
          image: require("@/assets/pedro.jpg"),
        }}
      />
    </View>
  );
}
