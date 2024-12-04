import Subtitle from "@/components/common/subtitle";
import Link from "next/link";
import TabIndicator from "@/components/common/tab-indicator";
import SelectEvents from "@/components/common/select-events";

export default function CoordinatedEvents({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Subtitle>
                <div className="gap-8 sm:flex hidden">
                    <Link
                        href="/coordinated-events/active"
                        className="relative text-nowrap"
                    >
                        الفعاليات الحالية
                        <TabIndicator layoutId="active-coordinated-events-tab" tab="/coordinated-events/active" />
                    </Link>
                    <Link
                        href="/coordinated-events/upcoming"
                        className="relative text-nowrap"
                    >
                        الفعاليات القادمة{" "}
                        <TabIndicator layoutId="active-coordinated-events-tab" tab="/coordinated-events/upcoming" />
                    </Link>
                    <Link
                        href="/coordinated-events/past"
                        className="relative text-nowrap"
                    >
                        الفعاليات الماضية{" "}
                        <TabIndicator layoutId="active-coordinated-events-tab" tab="/coordinated-events/past" />
                    </Link>
                </div>
                <div className="sm:hidden block">
                    
                <SelectEvents />
                </div>
            </Subtitle>
            {children}
        </>
    );
}
