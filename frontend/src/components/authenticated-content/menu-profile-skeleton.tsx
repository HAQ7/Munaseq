import { Skeleton } from "../common/shadcn-ui/skeleton";

export default function MenuProfileSkeleton() {
    return (
        <div className="flex gap-3 p-5">
            <Skeleton className="w-20 aspect-square rounded-full " />

            <div className="mt-2">
                <div className="font-bold text-lg">
                    <Skeleton className="w-44 h-6" />
                </div>
                <div className="text-custom-gray mt-2">
                    <Skeleton className="w-40 h-5" />
                </div>
            </div>
        </div>
    );
}
