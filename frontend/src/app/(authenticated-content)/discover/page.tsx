import Subtitle from "@/components/common/subtitle";
import Title from "@/components/common/title";
import discover from "@/assets/icons/discover-active.svg";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اكتشف",
};

export default function Discover() {
  return (
    <div>
      <Title>
        <Image src={discover} alt="" />
        اكتشف فعاليات المنسقين
      </Title>
      <Subtitle>من أعلى المنسقين تقييما </Subtitle>
    </div>
  );
}
