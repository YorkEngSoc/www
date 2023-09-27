import lexend from "../../pageFragments/lexend";
import "./index.css"

type SectionTitleT = {
  title: string;
  tw?: string;
};

export default function SectionTitle({ title, tw }: SectionTitleT) {
  return (
    <h1 className={`section-title ${tw ?? ""}`}>{title}</h1>
  );
}
