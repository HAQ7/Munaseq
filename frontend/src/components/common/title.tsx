import React from "react";
import Image from "next/image";
import discover from "@/assets/icons/discover-active.svg";

export default function title(props: { children: React.ReactNode }) {
  return (
    <div className="mb-6 mt-20">
      <h1 className="font-bold text-4xl flex gap-4">{props.children}</h1>
    </div>
  );
}
