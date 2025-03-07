import Subtitle from "@/components/common/subtitle";
import Title from "@/components/common/title";
import discover from "@/assets/icons/discover-active.svg";
import Image from "next/image";
import { Metadata } from "next";
import SmallCard from "@/components/common/small-card";
import getDate from "@/util/get-date";

import getEventsAction from "@/proxy/event/get-events-action";

export const metadata: Metadata = {
    title: "اكتشف",
};

export default async function Discover() {
    const eventList = await getEventsAction();
    
    if (eventList?.length === 0) {
        return (
            <div className="mt-5 text-custom-gray">
                لا يوجد فعاليات
            </div>
        );
    }
    return (
        <div>
            <Title>
                <Image src={discover} className="sm:w-14 w-10" alt="" />
                اكتشف فعاليات المنسقين
            </Title>
            <Subtitle>من أعلى المنسقين تقييما </Subtitle>
            <div className="flex mt-4 gap-8 flex-wrap lg:justify-start justify-center">
                {eventList?.map((event: any) => (
                    <SmallCard
                        image={event.imageUrl}
                        title={event.title}
                        date={getDate(event.startDateTime)}
                        userId={event.eventCreatorId}
                        eventId={event.id}
                        badges={event.categories}
                    />
                ))}
            </div>
        </div>
    );
}
