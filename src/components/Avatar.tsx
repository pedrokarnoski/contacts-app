import { Image, ImageProps, View, Text } from "react-native";

const variants = {
  size: {
    medium: "h-14 w-14 rounded-2xl",
    large: "h-24 w-24 rounded-3xl",
  },
  text: {
    medium: "text-2xl",
    large: "text-5xl",
  },
};

type Props = {
  name: string;
  image?: ImageProps | null;
  variant?: "medium" | "large";
};

export function Avatar({ image, name, variant = "medium" }: Props) {
  return (
    <View>
      {image ? (
        <Image
          source={image}
          className={variants.size[variant]}
        />
      ) : (
        <View className={`${variants.size[variant]} items-center justify-center bg-white`}>
          <Text className={`${variants.text[variant]} font-semibold`}>
            {name[0].toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
}
