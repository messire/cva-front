import { Icons } from "../ui/icons.js";

const neonRings = {
    Verified: {
        boxShadow: "0 0 0 2px rgba(66,153,225,.9), 0 0 12px rgba(66,153,225,.6), 0 0 24px rgba(66,153,225,.35)",
    },
    Fake: {
        boxShadow: "0 0 0 2px rgba(245,101,101,.9), 0 0 12px rgba(245,101,101,.6)",
    },
    Premium: {
        boxShadow: "0 0 0 2px rgba(236,201,75,.9), 0 0 14px rgba(236,201,75,.7), 0 0 30px rgba(236,201,75,.45)",
    },
};

export function getVerificationUi(status) {
    switch (status) {
        case "Fake":
            return {
                label: "Fake",
                icon: Icons.Warning,
                badgeProps: {colorPalette: "red"},
                ringProps: {
                    borderRadius: "full",
                    ...neonRings.Fake
                },
            };
        case "Verified":
            return {
                label: "Verified",
                icon: Icons.Verified,
                badgeProps: {colorPalette: "blue"},
                ringProps: {
                    borderRadius: "full",
                    ...neonRings.Verified
                },
            };
        case "Premium":
            return {
                label: "Premium",
                icon: Icons.Premium,
                badgeProps: {colorPalette: "yellow"},
                ringProps: {
                    borderRadius: "full",
                    ...neonRings.Premium
                },
            };
        case "NotVerified":
        default:
            return null;
    }
}

export function getOpenToWorkUi(openToWork) {
    if (!openToWork) return null;
    return {
        label: "Open to work",
        badgeProps: {colorPalette: "green", variant: "subtle"},
    };
}
