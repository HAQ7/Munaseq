import Events from "@/components/authenticated-content/event-lists/events";

export default async function PastJoinedEvents() {
    return (
        <Events dateFilter="past"/>
    );
}
