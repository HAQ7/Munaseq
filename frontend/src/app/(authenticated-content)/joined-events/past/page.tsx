import SmallCard from "@/components/common/small-card";
import { checkData } from "@/util/check-date";
import getDate from "@/util/get-date";
import getJoinedUserEventsAction from "@/proxy/get-joined-events-action";
export default async function PastJoinedEvents() {
    const eventList = await getJoinedUserEventsAction();
    let numEventRendered = 0;
    return (
        <div className="flex mt-4 gap-8 flex-wrap lg:justify-start justify-center">
            {eventList.map(async (event: any) => {
                if (
                    checkData(event.startDateTime, event.endDateTime) === "past"
                ) {
                    numEventRendered++;
                    return (
                        <SmallCard
                        
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
                    لا يوجد لديك فعاليات سابقة
                </div>
            )}
        </div>
    );
}
