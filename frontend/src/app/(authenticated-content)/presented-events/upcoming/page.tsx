import Events from "@/components/authenticated-content/event-lists/events";

export default async function UpcomingPresentedEvents() {
    return (
        <Events dateFilter="upcoming"/>
    );
}
