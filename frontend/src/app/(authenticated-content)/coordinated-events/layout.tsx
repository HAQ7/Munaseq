import Subtitle from "@/components/common/subtitle";
import Link from "next/link";
import TabIndicator from "@/components/authenticated-content/event-lists/tab-indicator";
import Dropdown from "@/components/common/dropdown-options";
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
                        <TabIndicator tab="/coordinated-events/active" />
                    </Link>
                    <Link
                        href="/coordinated-events/upcoming"
                        className="relative text-nowrap"
                    >
                        الفعاليات القادمة{" "}
                        <TabIndicator tab="/coordinated-events/upcoming" />
                    </Link>
                    <Link
                        href="/coordinated-events/past"
                        className="relative text-nowrap"
                    >
                        الفعاليات الماضية{" "}
                        <TabIndicator tab="/coordinated-events/past" />
                    </Link>
                </div>
            
            </Subtitle>
            {children}
        </>
    );
}
