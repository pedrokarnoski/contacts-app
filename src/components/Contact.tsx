import {
  TouchableOpacity,
  Text,
  View,
  ImageProps,
  TouchableOpacityProps,
} from "react-native";
import { Avatar } from "@/components/Avatar";

export type ContactProps = {
  name: string;
  image?: ImageProps;
};

type Props = TouchableOpacityProps & {
  contact: ContactProps;
};

export function Contact({ contact, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row items-center rounded-md gap-4">
        <Avatar name="Pedro" image={contact.image} />
        <Text className=" text-black font-medium text-lg">{contact.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
