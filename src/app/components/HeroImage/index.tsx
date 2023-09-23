import Image from "next/image";
import space from "./assets/space.jpg";
import bridge from "./assets/bridge.jpg";

export default function HeroImage() {
  return (
    <div className="absolute z-0 w-full h-full top-0 left-0 mix-blend-normal">
      <Image
        src={space}
        className="w-full aspect-video object-cover translate-x-0 translate-y-0 left-[60%] absolute -z-10"
        alt="An image of space."
      />
      <Image
        src={bridge}
        className="w-full aspect-video object-cover translate-x-0 translate-y-0 left-[80%] top-[15%] absolute z-40"
        alt="An image of a bridge."
      />
    </div>
  );
}
