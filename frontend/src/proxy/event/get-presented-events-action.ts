"use server";
import getEventAction from "./get-event-using-id-action";
import getUserRoleEvents from "./get-user-role-events-action";

export default async function getModeratedEvents() {
    try {
        const userRoleEvents = await getUserRoleEvents();
        if (!userRoleEvents?.presentedEvents) return null;
        const { presentedEvents : presentedEventsIDs  } = userRoleEvents;
        const presentedEventsPromise = presentedEventsIDs.map(async (eventIDObj) => {
            const event = await getEventAction(eventIDObj.id);
            return event;
        });
        const presentedEvents = await Promise.all(presentedEventsPromise);
        return presentedEvents;
    } catch (error: any) {
        return null;
    }
}
