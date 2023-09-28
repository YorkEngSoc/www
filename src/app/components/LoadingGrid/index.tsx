import "./index.css";

export default function LoadingGrid() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div className="px-2" key={`committee_member_${i}`}>
          <div className="aspect-square w-full md:w-3/4 mx-auto loading-gradient rounded-xl" />
          <div className="w-2/3 mx-auto loading-gradient rounded-lg h-10 mt-4" />
          <div className="w-1/2 mx-auto loading-gradient rounded-lg h-5 mt-4" />
        </div>
      ))}
    </>
  );
}
