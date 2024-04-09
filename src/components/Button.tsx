import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <View className="absolute bottom-0 mb-6 ml-6">
      <TouchableOpacity {...rest} activeOpacity={0.7}>
        <Text className="font-medium text-lg">{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
