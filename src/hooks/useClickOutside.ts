import { useEffect } from "react";

// тригерит колбэк, если происходит клик вне области HTML-элемента, на котором висит ref
export const useClickOutside = (
    ref: React.RefObject<HTMLDivElement>,
    callback: () => void
) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("touchstart", handleClick);
        };
    }, [ref, callback]);
};
