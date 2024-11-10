export default function Label({
    children,
    label,
    className
}: {
    children: React.ReactNode;
    label: string;
    className?: string;
}) {
    return (
        <div className=" relative">
            <h4 className="font-medium pb-1">{label}</h4>
            <div className={className}>{children ? children : 'لا يوجد'}</div>
        </div>
    );
}
