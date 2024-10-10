import deco from "@/assets/auth-content-assets/deco-subtitle.svg";
import Image from "next/image";

export default function Subtitle(props: { children: React.ReactNode }) {
  return (
    <div className="border-b-2 border-custom-light-gray font-bold text-xl relative flex justify-between items-end">
      <div className="mb-1">{props.children}</div>
      <Image src={deco} alt="deco" className="" />
    </div>
  );
}
