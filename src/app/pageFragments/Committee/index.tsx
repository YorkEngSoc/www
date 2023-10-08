import CommitteeGrid from "@components/CommitteeGrid";
import SectionTitle from "@components/SectionTitle";

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
      {(data || loading) && <CommitteeGrid data={data} loading={loading} />}
    </div>
  );
}
