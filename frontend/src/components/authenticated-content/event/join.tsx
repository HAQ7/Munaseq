"use client";
import Button from "@/components/common/buttons/button";
import { useToast } from "@/hooks/use-toast";
import joinEventAction from "@/proxy/event/join-event-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import LogoLoading from "@/components/common/logo-loading";

export default function JoinButton({
    eventId,
    children,
}: {
    eventId: string;
    children?: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { toast } = useToast();
    const router = useRouter();
    const getErrorMessage: () => string = () => {
        switch (error) {
            case "GENDER":
                return "الجنس غير مطابق للفعالية";
            case "JOINED":
                return "تم الانضمام مسبقاً";
            case "CREATOR":
                return "لا يمكنك الانضمام لفعالية قمت بإنشائها";
            default:
                return "حدث خطأ ما، الرجاء المحاولة مرة أخرى";
        }
    };

    return (
        <div className="grid place-items-center">
            {error && (
                <motion.p layout className="text-red-500 text-lg">
                    {getErrorMessage()}
                </motion.p>
            )}
            {!isLoading ? (
                <div className="w-full flex justify-end mt-5">
                    <Button
                        onClick={async () => {
                            setIsLoading(true);
                            const res = await joinEventAction(eventId);
                            if (res.error) {
                                setError(res.error);
                                setIsLoading(false);
                                return;
                            }
                            setIsLoading(false);
                            toast({
                                duration: 5000,
                                title: "تم الانضمام للفعالية",
                            });
                            router.push("/joined-events/upcoming");
                        }}
                        gradient
                        className="relative z-10"
                    >
                        الانضمام للفعالية
                    </Button>
                </div>
            ) : (
                <LogoLoading className="w-20" />
            )}
            {children}
        </div>
    );
}
