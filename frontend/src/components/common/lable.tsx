export default function Label({
    children,
    label,
}: {
    children: React.ReactNode;
    label: string;
}) {
    return (
        <div className=" relative">
            <h4 className="font-medium pb-1">{label}</h4>
            <p className="">{children ? children : 'لا يوجد'}</p>
        </div>
    );
}
