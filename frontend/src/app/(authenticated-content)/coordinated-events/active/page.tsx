import SmallCard from "@/components/common/small-card";
import GetUserEventsAction from "@/proxy/get-user-events-action";
import { checkData } from "@/util/check-date";
import getDate from "@/util/get-date";

export default async function ActiveCoordinatedEvents() {
    const eventList = await GetUserEventsAction();
    let numEventRendered = 0;
    return (
        <div className="flex mt-4 gap-8 flex-wrap lg:justify-start justify-center">
            {eventList.map(async (event: any) => {
                if (
                    checkData(event.startDateTime, event.endDateTime) ===
                    "active"
                ) {
                    numEventRendered++;
                    return (
                        <SmallCard
                            asEventCreator
                            image={event.imageUrl}
                            title={event.title}
                            date={getDate(event.startDateTime)}
                            userId={event.eventCreatorId}
                            eventId={event.id}
                            badges={event.categories}
                            isJoined
                        />
                    );
                }
            })}
            {numEventRendered === 0 && (
                <div className="mt-5 text-custom-gray">
                    لا يوجد لديك فعاليات حالية
                </div>
            )}
        </div>
    );
}
