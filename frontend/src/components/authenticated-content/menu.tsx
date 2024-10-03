
import MenuProfile from "./menu-profile";
import { Suspense } from "react";
import MenuProfileSkeleton from "./menu-profile-skeleton";
import Nav from "./Nav";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export default function Menu() {

    const headersList = headers();
    const username: string = headersList.get("x-username") as string;

    if (!username) {
        redirect("/signin");
    }
    
    return (
        <div className="w-[22rem] h-screen rounded-3xl fixed bg-white shadow-menu">
            <Suspense fallback={<MenuProfileSkeleton/>}>
                <MenuProfile />
            </Suspense>
            <Nav username={username} />
            
        </div>
    );
}
