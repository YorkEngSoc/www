import SectionTitle from "@components/SectionTitle";

export default function Contact() {
  return (
    <div className="pb-10">
      <SectionTitle title="Contact Us" />
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="flex flex-col pt-4 text-white pl-10">
          <p className="text-4xl">
            Feel free to contact us, we would love to hear from you, and discuss
            any partnerships.
          </p>
          <p className="my-auto text-5xl">
            University of York
            <br />
            York
            <br />
            North Yorkshire
            <br />
            YO10 5DD
            <br />
          </p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.2234701539815!2d-1.0560092223021016!3d53.94553842972077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48793033f3156963%3A0x3bd499f2010024d7!2sPhysics%20and%20Electronic%20Engineering%20Buildings!5e0!3m2!1sen!2suk!4v1695642716354!5m2!1sen!2suk"
          className="border-0 mx-auto w-1/2 aspect-square"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
