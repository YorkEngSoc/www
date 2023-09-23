type ArrowIconT = {
  tw?: string;
};

export default function ArrowIcon({ tw }: ArrowIconT) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={tw}>
      <path
        fill="currentColor"
        d="M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6H10z"
      />
    </svg>
  );
}
