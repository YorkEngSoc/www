import EventsGrid from "../pageFragments/EventsGrid";
import EventsBase from "./base";

export default function EventsLoading() {
  return (
    <EventsBase>
      <EventsGrid loading={true} />
    </EventsBase>
  );
}
