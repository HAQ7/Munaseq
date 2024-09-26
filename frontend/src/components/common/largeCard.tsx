import React from "react";
import dateIcon from "@/assets/icons/uiw_date.svg";
import timeIcon from "@/assets/icons/mingcute_time-line.svg";
import locationIcon from "@/assets/icons/Frame 39.svg";
import Image from "next/image";
import Button from "./button";

export default function largeCard({
  image,
  title,
  description,
  time,
  date,
  location,
  cost,
  badges = [],
}): React.JSX.Element {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow">
          <Image className="rounded-2xl mb-2" src={image} alt="" />
          <div className="p-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="rounded-full bg-purple-100 px-2.5 py-1 ml-2 text-sm font-medium text-purple-800"
              >
                {badge}
              </span>
            ))}

            <h5 className="my-2 text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h5>

            <p className="mb-4 font-light text-gray-500 text-sm">
              {description}
            </p>
            <div>
              <div className="flex gap-5 mb-3 font-medium">
                <div className="flex gap-2">
                  <Image src={timeIcon} alt="" />
                  <p className="text-purple-700 text-base">{time}</p>
                </div>
                <div className="flex gap-2">
                  <Image src={dateIcon} alt="" />
                  <p className="text-purple-700 text-base">{date}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Image src={locationIcon} alt="" />
                <p className="text-purple-700 text-base">{location}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-2xl font-bold">{cost}</p>
              <Button>انضم الان</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
