import getProfileAction from "@/proxy/get-profile-action";
import userCircle from "@/assets/icons/user-circle.svg";
import Image from "next/image";
import convertBase64ToImage from "@/util/convertBase64ToImage";

import { cookies } from "next/headers";
import Dropdown from "./dropdown";


export default async function MenuProfile() {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    let data: any;
    if (token) {
        data = await getProfileAction(token.value);
    }
    return (
        <div className="flex gap-3 p-5 items-center">
            <div className="w-20 aspect-square relative rounded-full overflow-hidden">
                {data.profilePicture ? (
                    <Image
                        src={convertBase64ToImage(data.profilePicture)}
                        alt="preview"
                        fill
                        priority
                    />
                ) : (
                    <Image src={userCircle} alt="user-circle" fill priority />
                )}
            </div>
            <div className="mt-2">
                <div className="font-bold text-lg text-nowrap overflow-ellipsis overflow-hidden w-44">
                    {data.firstName + " " + data.lastName}
                </div>
                <div className="text-custom-gray text-nowrap overflow-ellipsis overflow-hidden w-44">
                    {data.username}
                </div>
            </div>
            <Dropdown />
        </div>
    );
}
