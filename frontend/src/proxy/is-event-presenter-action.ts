import { UserDataDto } from "@/dtos/user-data.dto";

const isEventPresenterAction = async (eventId: string, username: string) => {
    try {
        const eventAttendeesReq = await fetch(
            `https://munaseq-backend-jrsyk.ondigitalocean.app/event/allUsers/` + eventId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!eventAttendeesReq.ok) {
            throw new Error("Failed to fetch event attendees");
        }

        const eventAttendees: {
            eventCreator: UserDataDto;
            joinedUsers: UserDataDto[];
            presenters: UserDataDto[];
            moderators: UserDataDto[];
        } = await eventAttendeesReq.json();

        return (
            eventAttendees.eventCreator.username === username ||
            eventAttendees.presenters.some(
                user => user.username === username
            ) ||
            eventAttendees.moderators.some(user => user.username === username)
        );
    } catch (error) {
        return false;
    }
};

export default isEventPresenterAction;
