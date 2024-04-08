import { colors } from "@/styles/colors";
import { View, ViewProps, TextInput, TextInputProps } from "react-native";

function Input({ children }: ViewProps) {
  return <View className="bg-gray-100 rounded-2xl flex-row items-center p-3 gap-2 -mt-7 mx-6">{children}</View>;
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      {...rest}
      placeholderTextColor={colors.gray[300]}
      className="flex-1 text-black"
    ></TextInput>
  );
}

Input.Field = Field;

export { Input };
