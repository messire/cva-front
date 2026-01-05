import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from 'react-dom/client'
import {StrictMode} from 'react'

import {system} from "./theme.js";

import {ColorModeProvider} from "./components/ui/color-mode.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ChakraProvider value={system}>
                <ColorModeProvider>
                    <App/>
                </ColorModeProvider>
            </ChakraProvider>
        </BrowserRouter>
    </StrictMode>,
)