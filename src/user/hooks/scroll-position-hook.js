import { useEffect, useState } from "react";

export const useScroll2 = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            if (Math.floor(window.pageYOffset) > 1 && Math.floor(window.pageYOffset) < 12) {
                setScrollPosition(window.pageYOffset);
            }
            if (Math.floor(window.pageYOffset) > 500 && Math.floor(window.pageYOffset) < 525) {
                setScrollPosition(window.pageYOffset);
            }
        }
        window.addEventListener("scroll", updatePosition);
        updatePosition();
        return () => window.removeEventListener("scroll", updatePosition);
    }, [])

    return scrollPosition;
}