import SmallCard from "@/components/common/small-card";
import testImage from "@/assets/land-assets/event-image.svg";
export default function ActiveJoinedEvents() {
    return (
        <div className="flex mt-4 gap-8 flex-wrap lg:justify-start justify-center">
            <SmallCard
                image={testImage}
                title="دورة في البرمجة"
                time="3 ساعات"
                date="12/12/12"
                presenter="خسام القنام"
                rate={4.7}
                cost="200 ريال"
                badges={["البرمجة"]}
            />
            <SmallCard
                image={testImage}
                title="دورة في البرمجة"
                time="3 ساعات"
                date="12/12/12"
                presenter="خسام القنام"
                rate={4.7}
                cost="200 ريال"
                badges={["البرمجة"]}
            />
            <SmallCard
                image={testImage}
                title="دورة في البرمجة"
                time="3 ساعات"
                date="12/12/12"
                presenter="خسام القنام"
                rate={4.7}
                cost="200 ريال"
                badges={["البرمجة"]}
            />
            <SmallCard
                image={testImage}
                title="دورة في البرمجة"
                time="3 ساعات"
                date="12/12/12"
                presenter="خسام القنام"
                rate={4.7}
                cost="200 ريال"
                badges={["البرمجة"]}
            />
        </div>
    );
}
