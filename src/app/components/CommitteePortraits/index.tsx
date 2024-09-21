import Image from "next/image";
import harry from "./assets/harry.jpg";

export default function CommitteePortraits() {
  return (
    <div className="flex flex-row w-2/3 mx-auto justify-between pt-16">
      <Image
        src={harry}
        alt="A picture from the building/construction event."
        className="aspect-square w-full md:w-1/4 rounded-lg object-cover inline"
      />
    </div>
  );
}
