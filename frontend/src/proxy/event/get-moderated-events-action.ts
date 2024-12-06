"use server";
import getEventAction from "./get-event-using-id-action";
import getUserRoleEvents from "./get-user-role-events-action";

export default async function getModeratedEvents() {
    try {
        const userRoleEvents = await getUserRoleEvents();
        if (!userRoleEvents?.moderatedEvents) return null;
        const { moderatedEvents: moderatedEventsIDs } = userRoleEvents;
        const moderatedEventsPromise = moderatedEventsIDs.map(
            async eventIDObj => {
                const event = await getEventAction(eventIDObj.id);
                return event;
            }
        );
        const moderatedEvents = await Promise.all(moderatedEventsPromise);
        return moderatedEvents;
    } catch (error: any) {
        return null;
    }
}
