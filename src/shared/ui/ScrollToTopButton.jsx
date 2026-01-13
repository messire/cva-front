import {useEffect, useState} from "react";
import {IconButton} from "@chakra-ui/react";

import {Icons} from "./icons.js";

const SCROLL_OFFSET = 104;

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > SCROLL_OFFSET);
        };

        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <IconButton
            aria-label="Scroll to top"
            position="fixed"
            bottom="24px"
            right="24px"
            zIndex="sticky"
            rounded="full"
            boxShadow="lg"
            colorPallete="brand"
            onClick={() =>
                window.scrollTo({top: 0, behavior: "smooth"})
            }
        >
            <Icons.Up/>
        </IconButton>
    );
};

export default ScrollToTopButton;
