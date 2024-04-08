import { useEffect, useState, useId } from "react";
import { Alert, TouchableOpacity, View, SectionList, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";

import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Contact, ContactProps } from "@/components/Contact";

import { colors } from "@/styles/colors";

type SectionListDataProps = {
  title: string;
  data: ContactProps[];
};

export function Home() {
  const [contacts, setContacts] = useState<SectionListDataProps[]>([]);
  const [name, setName] = useState("");

  async function fetchContacts() {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name,
          sort: "firstName",
        });

        const list = data
          .map((contact) => ({
            id: contact.id ?? useId(),
            name: contact.name,
            image: contact.image,
          }))
          .reduce<SectionListDataProps[]>((acc: any, item) => {
            const firstLetter = item.name.charAt(0).toUpperCase();

            const existingEntry = acc.find(
              (entry: SectionListDataProps) => entry.title === firstLetter
            );

            if (existingEntry) {
              existingEntry.data.push(item);
            } else acc.push({ title: firstLetter, data: [item] });

            return acc;
          }, []);

        setContacts(list);
      }
    } catch (err) {
      console.log(err);

      Alert.alert("Contatos", "Não foi possível carregas os contatos.");
    }
  }

  useEffect(() => {
    fetchContacts();
  }, [name]);

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

      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Contact contact={item} />}
        renderSectionHeader={({ section }) => (
          <Text className="text-lg font-bold bg-blue w-8 h-8 text-white text-center align-middle rounded-xl mt-8">
            {section.title}
          </Text>
        )}
        ItemSeparatorComponent={() => (
          <View className="w-full h-[1px] mt-3 bg-gray-300/50" />
        )}
        contentContainerStyle={{
          paddingLeft: 24,
          paddingRight: 16,
          paddingBottom: 16,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
