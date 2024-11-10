import Subtitle from "@/components/common/subtitle";
import Title from "@/components/common/title";
import discover from "@/assets/icons/discover-active.svg";
import Image from "next/image";
import { Metadata } from "next";
import SmallCard from "@/components/common/small-card";
import getDate from "@/util/get-date";
import getUserAction from "@/proxy/get-user-using-id-action";
import { UserDataDto } from "@/dtos/user-data.dto";
import getEventsAction from "@/proxy/get-events-action";

export const metadata: Metadata = {
    title: "اكتشف",
};

export default async function Discover() {
    const eventList = await getEventsAction();
    if (eventList.length === 0) {
        return (
            <div className="mt-5 text-custom-gray">
                لا يوجد فعاليات
            </div>
        );
    }
    return (
        <div>
            <Title>
                <Image src={discover} alt="" />
                اكتشف فعاليات المنسقين
            </Title>
            <Subtitle>من أعلى المنسقين تقييما </Subtitle>
            <div className="flex mt-4 gap-8 flex-wrap">
                {eventList.map(async (event: any) => (
                    <SmallCard
                        image={event.imageUrl}
                        title={event.title}
                        date={getDate(event.startDateTime)}
                        presenter={await getUserAction(
                            event.eventCreatorId
                        ).then((user: UserDataDto) => {
                            if (!user) {
                                return "غير معروف";
                            }
                            return user.firstName + " " + user.lastName;
                        })}
                        badges={event.categories}
                    />
                ))}
            </div>
        </div>
    );
}
