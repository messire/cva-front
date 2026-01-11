import {create} from "zustand";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function loadTokens() {
    try {
        return {
            accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
        };
    } catch {
        return {accessToken: null, refreshToken: null};
    }
}

function persistTokens(accessToken, refreshToken) {
    try {
        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        } else {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        }

        if (refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
        else {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
    } catch {
    }
}

export const useAuthStore = create((set, get) => {
    const initial = loadTokens();

    return {
        accessToken: initial.accessToken,
        refreshToken: initial.refreshToken,
        refreshPromise: null,

        isAuthenticated: () => {
            const s = get();
            return Boolean(s.accessToken || s.refreshToken);
        },

        setTokens: ({accessToken, refreshToken}) => {
            const at = accessToken ?? null;
            const rt = refreshToken ?? null;

            set({accessToken: at, refreshToken: rt});
            persistTokens(at, rt);
        },

        clear: () => {
            set({
                accessToken: null,
                refreshToken: null,
                refreshPromise: null,
            });
            persistTokens(null, null);
        },

        /**
         * Single-flight refresh.
         * @param {(refreshToken: string) => Promise<{accessToken: string, refreshToken?: string}>} refreshFn
         */
        refresh: async (refreshFn) => {
            const {refreshToken, refreshPromise} = get();

            if (!refreshToken) {
                get().clear();
                throw new Error("No refresh token");
            }

            if (refreshPromise) {
                return refreshPromise;
            }

            const promise = (async () => {
                try {
                    const result = await refreshFn(refreshToken);

                    if (!result?.accessToken) {
                        throw new Error("Refresh did not return accessToken");
                    }

                    const nextRefresh = result.refreshToken ?? refreshToken;

                    get().setTokens({
                        accessToken: result.accessToken,
                        refreshToken: nextRefresh,
                    });

                    return result;
                } catch (e) {
                    get().clear();
                    throw e;
                } finally {
                    set({refreshPromise: null});
                }
            })();

            set({refreshPromise: promise});
            return promise;
        },
    };
});