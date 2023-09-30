import Image from "next/image";
import pink from "../../pageFragments/EventsGrid/assets/pink.jpg";

export default function Loading() {
  return (
    <main className="grid">
      <div className="w-full h-[40vh] relative">
        <Image
          src={pink}
          alt="Placeholder image, loading event..."
          placeholder="blur"
          className="w-full h-full object-cover event-gradient"
        />
        <div className="absolute w-full h-full top-0 left-0 bg-dodger-blue-950 bg-opacity-40 event-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-1/4 loading-gradient rounded-xl"></div>
      </div>
      <div className="w-1/2 mx-auto flex flex-row event-shard relative border-l-2 border-b-2 border-zinc-700 rounded-bl-xl">
        <div className="w-2/3 pt-2 pl-4">
          <div className="w-3/4 h-12 rounded-xl loading-gradient" />
          <div className="pt-10">
            <div className="w-5/6 h-5 rounded-md loading-gradient" />
            <div className="w-2/3 h-5 rounded-md loading-gradient mt-1" />
            <div className="w-1/2 h-5 rounded-md loading-gradient mt-1" />
            <div className="w-5/6 h-5 rounded-md loading-gradient mt-1" />
            <div className="w-2/3 h-5 rounded-md loading-gradient mt-1" />
          </div>
        </div>
        <div className="w-1/3 pt-2 pr-2 pl-6 pb-10 border-l-2 border-zinc-700">
          <div>
            <div className="w-1/2 h-8 loading-gradient rounded-md" />
            <div className="w-3/4 h-8 loading-gradient rounded-md mt-2" />
            <div className="w-3/4 h-8 loading-gradient rounded-md mt-1" />
          </div>
          <div className="pt-10">
            <div className="w-1/2 h-8 loading-gradient rounded-md" />
            <div className="w-1/4 h-8 loading-gradient rounded-md mt-2" />
          </div>
          <div className="pt-10">
            <div className="w-full loading-gradient h-11 rounded-lg" />
          </div>
        </div>
      </div>
    </main>
  );
}
