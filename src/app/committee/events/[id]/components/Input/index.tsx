import { FieldError, UseFormRegister } from "react-hook-form";
import { InputsT } from "../EventForm";

type InputT = {
  defaultValue?: string;
  register: UseFormRegister<InputsT>;
  name: keyof InputsT;
  required?: boolean;
  displayName: string;
  error: FieldError | undefined;
  ignoreMargin?: boolean;
};

export default function Input({
  defaultValue,
  register,
  required,
  name,
  displayName,
  error,
  ignoreMargin,
}: InputT) {
  return (
    <>
      <label
        className={`${!ignoreMargin && "mt-10"} text-4xl font-extrabold mb-2`}
      >
        {displayName}
      </label>
      <input
        defaultValue={defaultValue}
        {...register(name, { required })}
        className="text-input"
      />
      {error && (
        <span className="text-red-500 text-xl font-bold mb-2">
          This field is required
        </span>
      )}
    </>
  );
}
