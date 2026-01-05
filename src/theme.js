import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: {value: "#eef2ff"},
          100: {value: "#e0e7ff"},
          200: {value: "#c7d2fe"},
          300: {value: "#a5b4fc"},
          400: {value: "#818cf8"},
          500: {value: "#6366f1"},
          600: {value: "#4f46e5"},
          700: {value: "#4338ca"},
          800: {value: "#3730a3"},
          900: {value: "#312e81"},
        },
      },
      radii: {
        card: {value: "16px"},
        button: {value: "12px"},
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
              base: "rgba(226, 232, 240, 0.8)",
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
            _dark: "0 10px 24px rgba(0,0,0,0.28)"
          },
        },
        cardHover: {
          value: {
            base: "0 14px 32px rgba(15,23,42,0.14)",
            _dark: "0 14px 32px rgba(0,0,0,0.36)"
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig);