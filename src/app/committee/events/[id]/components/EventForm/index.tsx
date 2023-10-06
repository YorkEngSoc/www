import { ThemeProvider, createTheme } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EventT } from "../../../../../pageFragments/EventsGrid";
import "./index.css";
import { useEffect, useState } from "react";
import Input from "../Input";
import moment, { Moment } from "moment";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type EventFormT = {
  event?: EventT;
};

export type InputsT = Omit<EventT, "placeholder_image" | "image" | "id"> & {
  image: FileList;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function EventForm({ event }: EventFormT) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputsT>();
  const supabase = createClientComponentClient();

  const imageState = watch("image");
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [existingImage, _] = useState<string | undefined>(
    event?.image as string | undefined
  );

  useEffect(() => {
    if (imageState && imageState[0]) {
      setImageURL(URL.createObjectURL(imageState[0]));
      setImage(imageState[0]);
    }
  }, [imageState]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const imageStr = event?.image as string | undefined;
      if (imageStr && imageStr.length > 0) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("events").getPublicUrl(imageStr);

        setImageURL(publicUrl);
      }
    }
    return () => {
      ignore = true;
    };
  }, [event]);

  const onSubmit: SubmitHandler<InputsT> = (data) => {
    const formData = new FormData();
    if (image) formData.append("image", image);

    formData.append(
      "event",
      JSON.stringify({
        ...data,
        image: image ? undefined : event?.image,
        id: event?.id,
      })
    );

    fetch("/api/events", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <form
          className="w-3/4 mx-auto grid gird-rows-1 grid-cols-2 text-white pb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <Input
              name="title"
              defaultValue={event?.title}
              register={register}
              required
              displayName="Title"
              error={errors.title}
              ignoreMargin
            />
            <Input
              name="short_description"
              defaultValue={event?.short_description}
              register={register}
              required
              displayName="Short description"
              error={errors.short_description}
            />
            <label className="text-4xl font-extrabold mb-2 mt-10">
              Start date and time
            </label>
            <div className="mb-2">
              <Controller
                name="start"
                control={control}
                defaultValue={event?.start}
                rules={{ required: true }}
                render={({ field }) => (
                  <DateTimePicker
                    value={field.value ? moment(field.value) : moment()}
                    onChange={(time) => {
                      if (time) field.onChange(time.utc().format());
                    }}
                    className="w-max"
                  />
                )}
              />
            </div>
            {errors.start && (
              <span className="text-red-500 text-xl font-bold mb-2">
                This field is required
              </span>
            )}
            <label className="text-4xl font-extrabold mb-2 mt-10">
              End date and time
            </label>
            <div className="mb-2">
              <Controller
                name="end"
                control={control}
                defaultValue={event?.start}
                rules={{ required: true }}
                render={({ field }) => (
                  <DateTimePicker
                    value={field.value ? moment(field.value) : moment()}
                    onChange={(time) => {
                      if (time) field.onChange(time.utc().format());
                    }}
                    className="w-max"
                  />
                )}
              />
            </div>
            {errors.end && (
              <span className="text-red-500 text-xl font-bold mb-2">
                This field is required
              </span>
            )}
            <Input
              name="location"
              defaultValue={event?.location}
              register={register}
              required
              displayName="Location"
              error={errors.location}
            />
            <Input
              name="form"
              defaultValue={event?.form}
              register={register}
              displayName="Form link"
              error={errors.form}
            />
            <label className="text-4xl font-extrabold mb-2 mt-10">Body</label>
            <input
              defaultValue={event?.body}
              {...register("body", { required: true })}
              className="text-input"
            />
            {errors.body && (
              <span className="text-red-500 text-xl font-bold mb-2">
                This field is required
              </span>
            )}
            <button
              type="submit"
              className="p-4 bg-dodger-blue-500 rounded-lg text-white w-2/3 mt-10"
            >
              Submit
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center mb-2">
              <label className="text-4xl font-extrabold">Event Image</label>
              <input
                className="ml-4"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                {...register("image")}
              />
            </div>
            {imageURL && (
              <>
                <img
                  className="aspect-video w-full object-cover rounded-lg mb-10"
                  src={imageURL}
                />
                <img
                  className="aspect-square w-1/2 object-cover rounded-lg mx-auto mb-4"
                  src={imageURL}
                />
              </>
            )}
          </div>
        </form>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
