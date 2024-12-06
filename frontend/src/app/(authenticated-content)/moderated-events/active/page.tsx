import Events from "@/components/authenticated-content/event-lists/events";

export default async function ActiveModeratedEvents() {
    return (
        <Events dateFilter="active"/>
    );
}
