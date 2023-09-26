import DiscordLogo from "@components/DiscordLogo";
import LinkButton from "@components/LinkButton";
import "./index.css";

type DiscordButtonT = {
  tw?: string;
};

export default function DiscordButton({ tw }: DiscordButtonT) {
  return (
    <LinkButton href="" tw={`discord-button ${tw ?? ""}`}>
      <DiscordLogo tw="w-full max-h-7 fill-white" />
    </LinkButton>
  );
}
