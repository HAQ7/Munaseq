import Events from "@/components/authenticated-content/event-lists/events";

export default async function PastPresentedEvents() {
    return (
        <Events dateFilter="past"/>
    );
}
