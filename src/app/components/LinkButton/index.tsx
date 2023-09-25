import Link from "next/link";
import "./index.css";
import lexend from "../../pageFragments/lexend";

type LinkButtonT = {
  href: string;
  tw?: string;
  children: JSX.Element | string;
};

export default function LinkButton({ href, tw, children }: LinkButtonT) {
  return (
    <Link href={href} className={`link-button ${lexend.className} ${tw}`}>
      {children}
    </Link>
  );
}
