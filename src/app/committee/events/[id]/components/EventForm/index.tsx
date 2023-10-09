"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
// import moment from "moment";
import { DateTime } from "luxon";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Controller, useForm } from "react-hook-form";
import { EventT } from "../../../../../pageFragments/EventsGrid";
import Form, { FormImageContext } from "../../../../components/Form";
import Input from "../../../../components/Input";

type EventFormT = {
  event?: EventT;
};

type EventInputsT = Omit<
  EventT,
  "placeholder_image" | "image" | "id" | "image_w" | "image_h"
> & {
  image: FileList;
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function EventForm({ event }: EventFormT) {
  const form = useForm<EventInputsT>();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Form
          endpoint="events"
          form={form}
          data={event}
          leftSide={
            <>
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
                      value={
                        field.value
                          ? DateTime.fromISO(field.value)
                          : DateTime.now()
                      }
                      onChange={(time) => {
                        if (time)
                          field.onChange(time.toString());
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
                  defaultValue={event?.end}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DateTimePicker
                      value={
                        field.value
                          ? DateTime.fromISO(field.value)
                          : DateTime.now()
                      }
                      onChange={(time) => {
                        if (time)
                          field.onChange(time.toString());
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
            </>
          }
          rightSide={
            <>
              <div className="flex flex-row items-center mb-2">
                <label className="text-4xl font-extrabold">Event Image</label>
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
                  </>
                )}
              </FormImageContext.Consumer>
            </>
          }
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
