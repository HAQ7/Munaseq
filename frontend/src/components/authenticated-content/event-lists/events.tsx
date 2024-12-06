"use client";

import LogoLoading from "@/components/common/logo-loading";
import SmallCard from "@/components/common/small-card";
import { useEventContext } from "@/store/eventContext";
import { checkData } from "@/util/check-date";
import getDate from "@/util/get-date";

export default function Events({ dateFilter }: { dateFilter: string }) {
    const { events, loading } = useEventContext();
    const filteredEvents = events.filter((event: any) => {
        return checkData(event.startDateTime, event.endDateTime) === dateFilter;
    });

    return (
        <div className="flex mt-4 gap-8 flex-wrap lg:justify-start justify-center">
            {!loading ? (
                filteredEvents.map((event: any) => (
                    <SmallCard
                        key={event.id}
                        asEventCreator
                        image={event.imageUrl}
                        title={event.title}
                        date={getDate(event.startDateTime)}
                        userId={event.eventCreatorId}
                        eventId={event.id}
                        badges={event.categories}
                        isJoined
                    />
                ))
            ) : (
                <div className="grid place-items-center w-full">
                    <LogoLoading className="sm:w-32 w-20" />
                </div>
            )}

            {filteredEvents.length === 0 && !loading && (
                <div className="mt-5 text-custom-gray">
                    لا يوجد لديك فعاليات حالية
                </div>
            )}
        </div>
    );
}
