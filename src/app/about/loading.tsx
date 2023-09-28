import Committee from "../pageFragments/Committee";
import AboutBase from "./base";

export default function AboutLoading() {
  return (
    <AboutBase>
      <Committee loading={true} />
    </AboutBase>
  );
}
