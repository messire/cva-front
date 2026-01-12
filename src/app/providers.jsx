import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {StrictMode} from "react";

import {system} from "./theme.js";
import {ColorModeProvider} from "../shared/ui/color-mode.jsx";

export const AppProviders = ({children}) => (
    <StrictMode>
        <BrowserRouter>
            <ChakraProvider value={system}>
                <ColorModeProvider>
                    {children}
                </ColorModeProvider>
            </ChakraProvider>
        </BrowserRouter>
    </StrictMode>
);
