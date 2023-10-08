"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { CommitteeMemberT } from "../../../../../pageFragments/Committee";
import Input from "../../../../components/Input";
import { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Id, toast } from "react-toastify";
import {
  updateGeneralErrorToast,
  updateToast,
} from "../../../../components/toastUtils";
import Form, { FormImageContext } from "../../../../components/Form";

type MemberFormT = {
  member?: CommitteeMemberT;
};

type InputsT = Omit<
  CommitteeMemberT,
  "id" | "placeholder_image" | "image_w" | "image_h"
> & {
  image: FileList;
};

export default function MemberForm({ member }: MemberFormT) {
  const form = useForm<InputsT>();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Form
      endpoint="members"
      data={member}
      form={form}
      leftSide={
        <>
          <Input
            displayName="Name"
            error={errors.name}
            name="name"
            register={register}
            ignoreMargin
            defaultValue={member?.name}
            required
          />
          <Input
            displayName="Email"
            error={errors.email}
            name="email"
            register={register}
            ignoreMargin
            defaultValue={member?.email}
            required
            type="email"
          />
          <Input
            displayName="Position"
            error={errors.position}
            name="position"
            register={register}
            ignoreMargin
            defaultValue={member?.position}
            required
          />
        </>
      }
      rightSide={
        <>
          <div className="flex flex-row items-center mb-2">
            <label className="text-4xl font-extrabold">Member Image</label>
            <input
              className="ml-4"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              {...register("image")}
            />
          </div>
          <FormImageContext.Consumer>
            {(imageURL) => (
              <>
                {imageURL && (
                  <img
                    className="aspect-square w-1/2 object-cover rounded-lg mx-auto mb-4"
                    src={imageURL}
                  />
                )}
              </>
            )}
          </FormImageContext.Consumer>
        </>
      }
    />
  );
}
