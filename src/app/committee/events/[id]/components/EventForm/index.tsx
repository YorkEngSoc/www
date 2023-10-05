import { ThemeProvider, createTheme } from "@mui/material";
import {
    DateTimePicker,
    LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Controller, useForm } from "react-hook-form";
import { EventT } from "../../../../../pageFragments/EventsGrid";
import "./index.css";

type EventFormT = {
  event: EventT;
};

type Inputs = Omit<EventT, "placeholder_image" | "image" | "id">;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function EventForm({ event }: EventFormT) {
  const { register, control } = useForm<Inputs>();

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <form className="w-1/2 mx-auto flex flex-col text-white">
          <label className="text-4xl font-extrabold mb-2">Title</label>
          <input
            defaultValue={event.title}
            {...register("title")}
            className="text-input"
          />
          <label className="text-4xl font-extrabold mb-2">Short description</label>
          <input
            defaultValue={event.short_description}
            {...register("short_description")}
            className="text-input"
          />
          <label className="text-4xl font-extrabold mb-2">Start date and time</label>
          <div className="mb-10">
            <Controller
              name="start"
              control={control}
              defaultValue={event.start}
              render={({ field }) => (
                <DateTimePicker
                  value={field.value}
                  onChange={(time) => field.onChange(time)}
                  className="w-max"
                />
              )}
            />
          </div>
          <label className="text-4xl font-extrabold mb-2">End date and time</label>
          <div className="mb-10">
            <Controller
              name="end"
              control={control}
              defaultValue={event.start}
              render={({ field }) => (
                <DateTimePicker
                  value={field.value}
                  onChange={(time) => field.onChange(time)}
                  className="w-max"
                />
              )}
            />
          </div>
          <label className="text-4xl font-extrabold mb-2">Location</label>
          <input
            defaultValue={event.location}
            {...register("location")}
            className="text-input"
          />
          <label className="text-4xl font-extrabold mb-2">Form link</label>
          <input
            defaultValue={event.form}
            {...register("form")}
            className="text-input"
          />
          <label className="text-4xl font-extrabold mb-2">Body</label>
          <input
            defaultValue={event.body}
            {...register("body")}
            className="text-input"
          />
        </form>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
