import Events from "@/components/authenticated-content/event-lists/events";

export default async function PastModeratedEvents() {
    return (
        <Events dateFilter="past"/>
    );
}
