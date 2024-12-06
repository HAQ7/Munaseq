import Events from "@/components/authenticated-content/event-lists/events";

export default async function UpcomingModeratedEvents() {
    return (
        <Events dateFilter="upcoming"/>
    );
}
