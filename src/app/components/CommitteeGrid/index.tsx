import LoadingGrid from "@components/LoadingGrid";
import Image from "next/image";
import { CommitteeMemberT } from "../../pageFragments/Committee";
import Link from "next/link";
import LazyImg from "@components/LazyImg";

type CommitteeGridT = {
  data?: CommitteeMemberT[] | null;
  loading?: boolean;
  isAdmin?: boolean;
};

type MemberWrapperT = {
  memberId?: number;
  children: React.ReactNode;
};

function MemberWrapper({ memberId, children }: MemberWrapperT) {
  if (memberId) {
    return (
      <Link
        href={`/committee/members/${memberId}`}
        className="px-2 text-dodger-blue-500"
      >
        {children}
      </Link>
    );
  }

  return <div className="px-2 text-dodger-blue-500">{children}</div>;
}

export default function CommitteeGrid({
  data,
  loading,
  isAdmin,
}: CommitteeGridT) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-10 gap-8 pt-10">
      {loading ? (
        <LoadingGrid />
      ) : (
        <>
          {isAdmin && (
            <Link
              href="/committee/members/new"
              className="p-2 text-white bg-dodger-blue-500 rounded-lg mx-auto my-auto"
            >
              Add member
            </Link>
          )}
          {data?.map((member, i) => (
            <MemberWrapper
              memberId={isAdmin ? member.id : undefined}
              key={`committe_member_${i}`}
            >
              <LazyImg
                src={member.image}
                placeholder={member.placeholder_image}
                alt={`${member.name}'s selfie.`}
                tw="w-3/4 mx-auto aspect-square object-center object-cover rounded-xl"
              />
              <p className="text-center font-extrabold text-4xl pt-2">
                {member.name}
              </p>
              <p className="text-center font-bold text-3xl">
                {member.position}
              </p>
            </MemberWrapper>
          ))}
        </>
      )}
    </div>
  );
}
