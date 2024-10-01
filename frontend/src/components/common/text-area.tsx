export default function TextArea(props: {
    placeholder: string;
    className?: string;
    name: string;
    cols?: number;
    rows?: number;
}) {
    return (
        <div className="relative grid place-items-center">
            <textarea
                id={props.name}
                name={props.name}
                cols={props.cols}
                placeholder={props.placeholder}
                maxLength={500}
                className="w-full h-28 min-h-32 border-b border-gray-400 rounded-md focus:outline-none peer resize-none bg-transparent z-10 px-3"
            />
        </div>
    );
}
