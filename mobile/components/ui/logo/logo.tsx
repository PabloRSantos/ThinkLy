import { Image } from "expo-image";
import { cssInterop } from "nativewind";

cssInterop(Image, { className: "style" });

export default function Logo() {
  return (
    <Image
      source={require("../../../assets/svg/logo.svg")}
      className="w-[108] h-[108] mb-12"
    />
  );
}
