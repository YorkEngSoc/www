import Image from "next/image";
import construction from "./assets/construction.jpg";
import chartered from "./assets/chartered.jpg";
import qfactor from "./assets/qfactor.jpg";

export default function AboutImages() {
  return (
    <div className="flex flex-row w-2/3 mx-auto justify-between pt-16">
      <Image
        src={construction}
        alt="A picture from the building/construction event."
        className="aspect-square w-1/4 rounded-lg object-cover"
      />
      <Image
        src={chartered}
        alt="A picture from the 'Life as a chartered engineer' event."
        className="aspect-square w-1/4 rounded-lg object-cover"
      />
      <Image
        src={qfactor}
        alt="A picture from QFactor 2023."
        className="aspect-square w-1/4 rounded-lg object-cover"
      />
    </div>
  );
}
