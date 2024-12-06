import Events from "@/components/authenticated-content/event-lists/events";


export default async function PastCoordinatedEvents() {
    return (
        <Events dateFilter="past"/>
    );
}
