import Events from "@/components/authenticated-content/event-lists/events";

export default async function UpcomingCoordinatedEvents() {

    return (
        <Events dateFilter="upcoming"/>
    );
}
