import { UserDataDto } from "@/dtos/user-data.dto";

const getAllUsers = async (eventId: string) => {
    const eventAttendeesReq = await fetch(
        `${process.env.BACKEND_URL}/event/allUsers/` + eventId,
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

    return eventAttendees;
};

export default getAllUsers;
