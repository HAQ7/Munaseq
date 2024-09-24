export default function Button(props: {
    children: React.ReactNode;
    className?: string;
    outline?: boolean;
}) {
    console.log(props);
    if (props.outline) {
        return (
            <button
                className={
                    "relative bg-gradient-to-l h-10 p-[1.5px] from-[#AE00FE] to-[#652BB7] rounded-full grid place-items-center" +
                    (props.className ? props.className : "")
                }
            >
                <div className="bg-white rounded-full h-full w-full grid place-items-center mx-4">
                    <p className="bg-gradient-to-l from-[#AE00FE] to-[#652BB7] bg-clip-text text-transparent">{props.children}</p>
                </div>
            </button>
        );
    }
    return (
        <button
            className={
                "px-4 h-10 bg-gradient-to-l from-[#AE00FE] to-[#652BB7] rounded-full text-white font-semibold grid place-items-center " +
                (props.className ? props.className : "")
            }
        >
            {props.children}
        </button>
    );
}
