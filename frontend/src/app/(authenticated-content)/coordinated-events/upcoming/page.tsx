import SmallCard from "@/components/common/small-card";
import GetUserEventsAction from "@/proxy/get-user-events-action";
import { checkData } from "@/util/check-date";
import getDate from "@/util/get-date";

export default async function UpcomingCoordinatedEvents() {
    const eventList = await GetUserEventsAction();
    let numEventRendered = 0;
    
    return (
        <div className="flex mt-4 gap-8 flex-wrap">
            {eventList.map(async (event: any) => {
                if (
                    checkData(event.startDateTime, event.endDateTime) ===
                    "upcoming"
                ) {
                    numEventRendered++;
                    return (
                        <SmallCard
                            image={event.imageUrl}
                            title={event.title}
                            date={getDate(event.startDateTime)}
                            userId={event.eventCreatorId}
                            badges={event.categories}
                        />
                    );
                }
            })}
            {numEventRendered === 0 && (
                <div className="mt-5 text-custom-gray">
                    لا يوجد لديك فعاليات قادمة
                </div>
            )}
        </div>
    );
}
