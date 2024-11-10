'use client'

import { useFormStatus } from "react-dom";
import LogoLoading from "./logo-loading";

export default function LoadingWrapper({children, isLoading}: {children: React.ReactNode, isLoading?: boolean}) {
    const {pending} = useFormStatus();
    return (
        <>
            {isLoading || pending ? (
                <LogoLoading className={"w-14 aspect-square"} />
            ) : (
                children
            )}
        </>
    )

}