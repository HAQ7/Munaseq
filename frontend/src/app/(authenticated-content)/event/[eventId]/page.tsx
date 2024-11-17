import getEventAction from "@/proxy/get-event-using-id-action";
import Image from "next/image";
import { EventDataDto } from "@/dtos/event-data.dto";
import Tag from "@/components/common/category";
import Button from "@/components/common/button";
import userIcon from "@/assets/icons/user-gradiant.svg";
import { UserDataDto } from "@/dtos/user-data.dto";
import getUserAction from "@/proxy/get-user-using-id-action";

export default async function EventPage({
    params,
}: {
    params: { eventId: string };
}) {
    const event: EventDataDto = await getEventAction({
        eventId: params.eventId,
    });
    const user: UserDataDto = await getUserAction(event.eventCreatorId);
    console.log(event);
    return (
        <section className="grid place-items-center">
            <div className="bg-white w-full max-w-[1100px] shadow-lg rounded-xl md:p-8 overflow-hidden">
                <div className="flex relative md:flex-row flex-col">
                    <div className="w-full md:max-w-[600px] aspect-[7/5] relative">
                        <Image
                            src={event.imageUrl}
                            alt="image of the event"
                            fill
                            className="object-cover rounded-2xl shadow-menu  md:rounded-b-2xl rounded-b-none rounded-t-2xl"
                        />
                    </div>
                    <div className="flex-1 text-xl gap-5 flex flex-col md:min-w-72 p-8 ">
                        <h1 className="font-bold ">معلومات الحضور</h1>
                        <div className="text-custom-black gap-2 flex flex-col">
                            <p>
                                {"تاريخ بدأ الفعالية: " +
                                    new Date(
                                        event.startDateTime
                                    ).toLocaleDateString()}
                            </p>
                            <p>
                                {"تاريخ انتهاء الفعالية: " + new Date(
                                    event.endDateTime
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                {(event.isOnline ? "حضوري" : "عن بعد") +
                                    " " +
                                    (event.gender === "BOTH"
                                        ? "للجميع"
                                        : event.gender === "MALE"
                                        ? "للذكور"
                                        : "للإناث")}
                            </p>
                            <p>{event.location}</p>
                        </div>
                    </div>
                </div>
                <div className="md:mt-10 md:p-0 p-8">
                    <div className="flex flex-wrap">
                        {event.categories.map((category: string) => {
                            return <Tag key={category}>{category}</Tag>;
                        })}
                    </div>
                    <div className="grid gap-3">
                        <h1 className="font-bold text-3xl">{event.title}</h1>
                        <div className="flex items-center">
                            <Image
                                src={userIcon}
                                alt="user icon"
                                className="w-10"
                            />
                            <div className="text-[#AE00FE] font-semibold text-xl">
                                <p>
                                    {"المنسق " +
                                        user.firstName +
                                        " " +
                                        user.lastName}
                                </p>
                            </div>
                        </div>
                        <div className="text-custom-black">
                            {event.description}
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-5">
                        <Button gradient>الانضمام للفعالية</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
