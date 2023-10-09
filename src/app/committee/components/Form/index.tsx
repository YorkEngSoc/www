"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { Id, toast } from "react-toastify";
import { CommitteeMemberT } from "../../../pageFragments/Committee";
import { EventT } from "../../../pageFragments/EventsGrid";
import { updateGeneralErrorToast, updateToast } from "../toastUtils";

interface FormInputI {
  image: FileList;
}

type FormT<T extends FormInputI> = {
  data?: EventT | CommitteeMemberT;
  leftSide: React.ReactNode;
  rightSide: React.ReactNode;
  endpoint: "members" | "events";
  form: UseFormReturn<T, any, undefined>;
};

export const FormImageContext = createContext<string | undefined>(undefined);

export default function Form<T extends FormInputI>({
  data,
  leftSide,
  rightSide,
  endpoint,
  form,
}: FormT<T>) {
  const { handleSubmit, watch } = form;
  const supabase = createClientComponentClient();
  const toastId = useRef<Id | null>(null);
  const router = useRouter();
  const [blockSubmit, setBlockSubmit] = useState<boolean>(false);

  const imageState = watch("image" as Path<T>);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (imageState && imageState[0]) {
      setImageURL(URL.createObjectURL(imageState[0]));
      setImage(imageState[0]);
    }
  }, [imageState]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const imageStr = data?.image as string | undefined;
      const bucketName = endpoint === "events" ? endpoint : "committee";
      if (imageStr && imageStr.length > 0) {
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(imageStr);

        setImageURL(publicUrl);
      }
    }
    return () => {
      ignore = true;
    };
  }, [data]);

  const onSubmit: SubmitHandler<T> = (inputData) => {
    const formData = new FormData();
    if (image) formData.append("image", image);

    toastId.current = toast.loading("Uploading...", { autoClose: false });

    const dataName = endpoint === "events" ? "event" : "member";

    formData.append(
      dataName,
      JSON.stringify({
        ...inputData,
        image: data?.image,
        id: data?.id,
      })
    );

    setBlockSubmit(true);

    fetch("/api/data", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const responseBody: { message: string; id?: number } = await res.json();
        updateToast({
          responseBody,
          status: res.status,
          redirectUrl: data?.id
            ? undefined
            : `/committee/${endpoint}/${responseBody.id}`,
          ref: toastId,
          router: router,
          setBlockSubmit,
        });
      })
      .catch((e) => {
        console.error(e);

        updateGeneralErrorToast(toastId, setBlockSubmit);

        setBlockSubmit(false);
      });
  };

  const onDelete: SubmitHandler<T> = () => {
    const formData = new FormData();
    const dataName = endpoint === "events" ? "eventId" : "memberId";
    formData.append(dataName, data?.id.toString() ?? "-1");

    toastId.current = toast.loading("Deleting...", { autoClose: false });

    setBlockSubmit(true);

    fetch("/api/data", {
      method: "DELETE",
      body: formData,
    })
      .then(async (res) => {
        const responseBody: { message: string } = await res.json();
        updateToast({
          responseBody,
          status: res.status,
          redirectUrl: `/committee`,
          ref: toastId,
          router: router,
          setBlockSubmit,
        });
      })
      .catch((e) => {
        console.error(e);

        updateGeneralErrorToast(toastId, setBlockSubmit);
      });
  };

  return (
    <form className="w-3/4 mx-auto grid gird-rows-1 grid-cols-2 text-white pb-10">
      <div className="flex flex-col">
        {leftSide}
        <div className={`flex flex-row w-2/3 ${data?.id && "gap-4"}`}>
          <button
            type="submit"
            className={`p-4 bg-dodger-blue-500 rounded-lg text-white mt-10 disabled:bg-dodger-blue-800 disabled:text-zinc-400 ${
              data?.id ? "w-1/2" : "w-full"
            }`}
            disabled={blockSubmit}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
          {data?.id && (
            <button
              type="submit"
              className="p-4 bg-red-500 rounded-lg text-white mt-10 disabled:bg-red-800 disabled:text-zinc-400 w-1/2"
              disabled={blockSubmit}
              onClick={handleSubmit(onDelete)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <FormImageContext.Provider value={imageURL}>
          {rightSide}
        </FormImageContext.Provider>
      </div>
    </form>
  );
}
