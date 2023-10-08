import { HTMLInputTypeAttribute } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type InputT<T extends FieldValues> = {
  defaultValue?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  required?: boolean;
  displayName: string;
  error: FieldError | undefined;
  ignoreMargin?: boolean;
  type?: HTMLInputTypeAttribute;
};

export default function Input<T extends FieldValues>({
  defaultValue,
  register,
  required,
  name,
  displayName,
  error,
  ignoreMargin,
  type,
}: InputT<T>) {
  return (
    <>
      <label
        className={`${!ignoreMargin && "mt-10"} text-4xl font-extrabold mb-2`}
      >
        {displayName}
      </label>
      <input
        type={type}
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
