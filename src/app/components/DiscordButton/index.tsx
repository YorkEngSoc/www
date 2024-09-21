import DiscordLogo from "@components/DiscordLogo";
import LinkButton from "@components/LinkButton";

type DiscordButtonT = {
  tw?: string;
};

export default function DiscordButton({ tw }: DiscordButtonT) {
  return (
    <LinkButton
      href="/discord"
      tw={`discord-button ${tw ?? ""}`}
      target="_blank"
      referrerPolicy="no-referrer"
    >
      <DiscordLogo tw="w-full max-h-7 fill-white" />
    </LinkButton>
  );
}
