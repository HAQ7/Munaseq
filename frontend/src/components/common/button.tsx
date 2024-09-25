export default function Button(props: {
    children: React.ReactNode;
    className?: string;
    outline?: boolean;
}) {
    if (props.outline) {
        return (
            <button
                className={
                    "relative bg-gradient-to-l h-10 p-[2px] from-[#AE00FE] to-[#652BB7] rounded-full grid place-items-center group " +
                    (props.className ? props.className : "")
                }
            >
                <div className="bg-white group-hover:bg-transparent rounded-full h-full w-full grid place-items-center mx-4 transition-all">
                    <p className="bg-gradient-to-l from-[#AE00FE] to-[#652BB7] bg-clip-text text-transparent group-hover:text-white transition-all">{props.children}</p>
                </div>
            </button>
        );
    }
    return (
        <button
            className={
                "px-4 h-10 bg-[length:120%] hover:bg-right transition-all bg-gradient-to-l from-[#AE00FE] to-[#652BB7] rounded-full text-white font-semibold grid place-items-center " +
                (props.className ? props.className : "")
            }
        >
            {props.children}
        </button>
    );
}
