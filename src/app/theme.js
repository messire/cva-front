import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
    base: {
        borderRadius: "radii.button",
    },
    variants: {
        variant: {
            solid: {
                bg: "colorPalette.600",
                color: "colorPalette.contrast",
                _hover: { bg: "colorPalette.700" },
                _active: { bg: "colorPalette.800" },
            },
        },
    },
    defaultVariants: {
        variant: "solid",
    },
})

const customConfig = defineConfig({
    globalCss: {
        html: {
            colorPalette: "brand",
        },
    },
    theme: {
        recipes: {
            Button: buttonRecipe,
        },

        tokens: {
            colors: {
                brand: {
                    50: { value: { base: "#eef2ff", _dark: "#f7f8ff" } },
                    100: { value: { base: "#e0e7ff", _dark: "#eef0ff" } },
                    200: { value: { base: "#c7d2fe", _dark: "#e2e6ff" } },
                    300: { value: { base: "#a5b4fc", _dark: "#cdd3ff" } },
                    400: { value: { base: "#818cf8", _dark: "#b3bcff" } },

                    500: { value: { base: "#6366f1", _dark: "#9aa5ff" } },
                    600: { value: { base: "#4f46e5", _dark: "#818cf8" } },
                    700: { value: { base: "#4338ca", _dark: "#6366f1" } },
                    800: { value: { base: "#3730a3", _dark: "#4f46e5" } },
                    900: { value: { base: "#312e81", _dark: "#4338ca" } },

                    solid: { value: { base: "#4f46e5", _dark: "#818cf8" } },
                    emphasized: { value: { base: "#4338ca", _dark: "#6366f1" } },
                    contrast: { value: { base: "#ffffff", _dark: "#0b1220" } },

                    fg: { value: { base: "#4f46e5", _dark: "#818cf8" } },

                    muted: { value: { base: "#e0e7ff", _dark: "rgba(129,140,248,0.18)" } },
                    subtle: { value: { base: "#c7d2fe", _dark: "rgba(99,102,241,0.28)" } },
                },
            },

            radii: {
                card: { value: "16px" },
                button: { value: "12px" },
            },
        },

        semanticTokens: {
            colors: {
                bg: {
                    main: {
                        value: {
                            base: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)",
                            _dark: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
                        },
                    },
                    page: {
                        value: {
                            base: "#ffffffA0",
                            _dark: "#0b1220A0",
                        },
                    },
                    pageTop: {
                        value: {
                            base: "linear-gradient(180deg, rgba(99,102,241,0.10) 0%, rgba(255,255,255,0) 42%)",
                            _dark: "linear-gradient(180deg, rgba(129,140,248,0.12) 0%, rgba(11,18,32,0) 46%)",
                        },
                    },
                    card: {
                        value: {
                            base: "#ffffffA0",
                            _dark: "#1e293bA0",
                        },
                    },
                    glass: {
                        value: {
                            base: "rgba(255, 255, 255, 0.85)",
                            _dark: "rgba(15, 23, 42, 0.90)",
                        },
                    },
                },

                text: {
                    primary: {
                        value: {
                            base: "#1e293b",
                            _dark: "#f1f5f9",
                        },
                    },
                    secondary: {
                        value: {
                            base: "#64748b",
                            _dark: "#94a3b8",
                        },
                    },
                    brand: {
                        value: {
                            base: "#4f46e5",
                            _dark: "#818cf8",
                        },
                    },
                },

                border: {
                    subtle: {
                        value: {
                            base: "#E4E4E7",
                            _dark: "rgba(51, 65, 85, 0.8)",
                        },
                    },
                },

                assets: {
                    defaultUserPhoto: {
                        value: {
                            base: "/images/no-photo-light.svg",
                            _dark: "/images/no-photo-dark.svg",
                        },
                    },
                },
            },

            shadows: {
                soft: {
                    value: {
                        base: "0 10px 24px rgba(15,23,42,0.10)",
                        _dark: "0 10px 24px rgba(0,0,0,0.28)",
                    },
                },
                cardHover: {
                    value: {
                        base: "0 14px 32px rgba(15,23,42,0.14)",
                        _dark: "0 14px 32px rgba(0,0,0,0.36)",
                    },
                },
            },
        },
    },
})

export const system = createSystem(defaultConfig, customConfig)