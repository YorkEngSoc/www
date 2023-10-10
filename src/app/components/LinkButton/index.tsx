import Link from "next/link";
import { HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy } from "react";

type LinkButtonT = {
  href: string;
  tw?: string;
  children: JSX.Element | string;
  target?: HTMLAttributeAnchorTarget;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
};

export default function LinkButton({
  href,
  tw,
  children,
  target,
  referrerPolicy,
}: LinkButtonT) {
  return (
    <Link
      href={href}
      className={`link-button ${tw}`}
      target={target}
      referrerPolicy={referrerPolicy}
    >
      {children}
    </Link>
  );
}
