import { useEffect, useState, useId, useRef } from "react";
import { Alert, TouchableOpacity, View, SectionList, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import BottomSheet from "@gorhom/bottom-sheet";

import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Contact, ContactProps } from "@/components/Contact";

import { colors } from "@/styles/colors";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";

type SectionListDataProps = {
  title: string;
  data: ContactProps[];
};

export function Home() {
  const [contacts, setContacts] = useState<SectionListDataProps[]>([]);
  const [contactSelected, setContactSelected] = useState<Contacts.Contact>();
  const [name, setName] = useState("");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
  const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

  async function handleOpenDetails(id: string) {
    const response = await Contacts.getContactByIdAsync(id);
    setContactSelected(response);

    handleBottomSheetOpen();
  }

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

        setContactSelected(data[0]);
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
        renderItem={({ item }) => (
          <Contact contact={item} onPress={() => handleOpenDetails(item.id)} />
        )}
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

      {/* <View className="flex-1 gap-2 items-center justify-center">
        <MaterialCommunityIcons
          name="emoticon-sad"
          size={32}
          color={colors.gray[500]}
        />
        <Text className="text-lg">Não há dados.</Text>
      </View> */}

      {contactSelected && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[0.01, 264]}
          handleComponent={() => null}
          backgroundStyle={{ backgroundColor: "transparent" }}
        >
          <Avatar
            name={contactSelected.name}
            image={contactSelected.image}
            variant="large"
            containerStyle={{
              marginBottom: -50,
              alignSelf: "center",
              zIndex: 1,
            }}
          />
          <View className="flex-1 bg-gray-100 rounded-t-[32px] pt-16 items-center p-8">
            <Text className="mt-3 mb-1 font-bold text-3xl">
              {contactSelected.name}
            </Text>

            {contactSelected.phoneNumbers && (
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons
                  name="phone"
                  size={18}
                  color={colors.blue}
                />
                <Text className="text-lg font-medium text-gray-400">
                  {contactSelected.phoneNumbers[0].number}
                </Text>
              </View>
            )}

            <Button title="Fechar" onPress={handleBottomSheetClose} />
          </View>
        </BottomSheet>
      )}
    </View>
  );
}
