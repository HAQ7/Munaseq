
import MenuProfile from "./menu-profile";
import { Suspense } from "react";
import MenuProfileSkeleton from "./menu-profile-skeleton";
import Nav from "./Nav";



export default function Menu() {
    
    return (
        <div className="w-[22rem] h-screen rounded-3xl fixed bg-white shadow-menu">
            <Suspense fallback={<MenuProfileSkeleton/>}>
                <MenuProfile />
            </Suspense>
            <Nav />
            
        </div>
    );
}
