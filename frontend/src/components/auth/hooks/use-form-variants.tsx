import { Variants } from "framer-motion";

export default function useFormVariants(): Variants {
    return {
        next: {
            x: "-50%",
            opacity: 0,
            display: "none",
            position: 'absolute'
        },
        past: {
            x: "50%",
            opacity: 0,
            display: "none",
            position: 'absolute'
        },
        active: {
            x: 0,
            opacity: 1,
            display: 'block',
            visibility: "visible",
            position: 'relative'
        },
    };
}
