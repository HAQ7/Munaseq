import Events from "@/components/authenticated-content/event-lists/events";

export default async function UpcomingJoinedEvents() {

    return (
        <Events dateFilter="upcoming"/>
    );
}
