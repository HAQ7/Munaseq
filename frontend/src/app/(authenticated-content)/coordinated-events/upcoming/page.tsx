import SmallCard from "@/components/common/small-card";
import { UserDataDto } from "@/dtos/user-data.dto";
import GetUserEventsAction from "@/proxy/get-user-events-action";
import getUserAction from "@/proxy/get-user-using-id-action";
import getDate  from "@/util/get-date";

export default async function UpcomingCoordinatedEvents() {
    const eventList = await GetUserEventsAction();
    console.log(eventList);
    if (eventList.length === 0) {
        return <div className="mt-5 text-custom-gray">لا يوجد لديك فعاليات قادمة</div>;
    }
    return (
        <div className="flex mt-4 gap-8 flex-wrap">
            {eventList.map(async (event: any) => (
                <SmallCard
                    image={event.imageUrl}
                    title={event.title}
                    date={getDate(event.startDateTime)}
                    presenter={await getUserAction(event.eventCreatorId).then(
                        (user: UserDataDto) => {
                            if (!user) {
                                return "غير معروف";
                            }
                            return user.firstName + " " + user.lastName;
                        }
                    )}
                    badges={event.categories}
                />
            ))}
        </div>
    );
}
