type LazyImgT = {
  placeholder: string;
  src: string;
  alt: string;
  tw: string;
};

export default function LazyImg({ placeholder, src, alt, tw }: LazyImgT) {
  return (
    <img
      className={`bg-cover bg-center ${tw}`}
      src={src}
      alt={alt}
      style={{
        backgroundImage: `url(${placeholder})`,
      }}
      loading="lazy"
    />
  );
}
