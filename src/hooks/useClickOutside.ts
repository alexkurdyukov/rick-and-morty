import { useEffect } from "react";

// по клику вне html элемента на котором висит реф, срабатывает колбэк
// в проекте использовался для отслеживания клика вокруг всплывающих окон, чтобы их закрывать
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
