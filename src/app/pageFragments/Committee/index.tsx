import SectionTitle from "@components/SectionTitle";
import LoadingGrid from "@components/LoadingGrid";
import Image from "next/image";

export type CommitteeMemberT = {
  id: number;
  name: string;
  email: string;
  image: string;
  position: string;
  placeholder_image: string;
  image_w: number;
  image_h: number;
};

type CommitteeT = {
  loading?: boolean;
  data?: CommitteeMemberT[] | null;
};

export default function Committee({ loading, data }: CommitteeT) {
  return (
    <div>
      <SectionTitle title="Our Committee" tw="pt-10" />
      {(data || loading) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-10 sm:gap-6 xl:gap-8 pt-10">
          {loading ? (
            <LoadingGrid />
          ) : (
            <>
              {data?.map((member, i) => (
                <div
                  className="px-2 text-dodger-blue-500"
                  key={`committe_member_${i}`}
                >
                  <Image
                    src={member.image}
                    alt={`${member.name}'s selfie.`}
                    className="w-full md:w-3/4 mx-auto aspect-square object-center object-cover rounded-xl"
                    width={member.image_w}
                    height={member.image_h}
                    placeholder="blur"
                    blurDataURL={`data:image/webp;base64,${member.placeholder_image}`}
                  />
                  <p className="text-center font-extrabold text-4xl pt-2">
                    {member.name}
                  </p>
                  <p className="text-center font-bold text-3xl">
                    {member.position}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
