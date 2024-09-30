"use client";
import { useState, useRef } from "react";

export default function TextField(props: {
    placeholder: string;
    className?: string;
    name: string;
    type?: string;
}) {
    const inputRef = useRef({} as HTMLInputElement);
    const [inputHasText, setInputHasText] = useState(false);
    return (
        <div className="h-20 relative">
            <div className="absolute w-full flex justify-center items-center h-10 bottom-0 2xl:text-base text-md ">
                <input
                    autoComplete="on"
                    id={props.name}
                    ref={inputRef}
                    type={props.type || "text"}
                    name={props.name}
                    onBlur={() => {
                        setInputHasText(inputRef.current.value !== "");
                    }}
                    maxLength={100}
                    className={
                        "h-10 w-full border-b border-gray-300 focus:outline-none peer z-10 bg-transparent " +
                        (props.className || "")
                    }
                />{" "}
                <label
                    htmlFor={props.name}
                    className={
                        "absolute rtl:right-3 ltr:left-3 text-gray-400  peer-focus:text-primary transition-all h-full grid place-items-center " +
                        (inputHasText
                            ? "-translate-y-[90%] text-sm"
                            : "peer-focus:-translate-y-[90%] peer-focus:text-sm")
                    }
                >
                    {props.placeholder}
                </label>
            </div>
        </div>
    );
}
