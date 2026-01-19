import {create} from "zustand";

import * as catalogApi from "../api/catalog.api.js";
import {ApiResult} from "../../../shared/utils/ApiResult.js";
import {DeveloperProfile, DeveloperProfileDetails} from "../../../entities/profile/model/profile.model.js";

const PAGE_SIZE = 10;

const defaultQuery = Object.freeze({
    search: "",
    skills: [],
    openToWork: undefined,
    verificationStatus: undefined,
    page: 1,
    pageSize: PAGE_SIZE,
    sortField: "updatedAt",
    sortOrder: "desc",
});

function normalizeQuery(query) {
    const page = Number.isFinite(query.page) && query.page >= 1 ? query.page : 1;

    return {
        ...defaultQuery,
        ...query,
        search: (query.search ?? "").trim(),
        skills: Array.isArray(query.skills) ? query.skills.filter(Boolean) : [],
        openToWork: typeof query.openToWork === "boolean" ? query.openToWork : undefined,
        verificationStatus: query.verificationStatus || undefined,
        page,
        PAGE_SIZE,
        sortField: query.sortField || "updatedAt",
        sortOrder: query.sortOrder || "desc",
    };
}

export const useCatalogStore = create((set, get) => {
    return {
        items: [],
        pagination: null,
        sorting: null,
        query: normalizeQuery(defaultQuery),
        isLoading: false,
        error: null,
        profileDetails: {},

        replaceQuery: (nextQuery) => {
            set({query: normalizeQuery(nextQuery)});
        },

        setQuery: (partial) => {
            const prev = get().query;
            const nextRaw = {...prev, ...partial};

            const affectsPaging =
                partial.search !== undefined ||
                partial.openToWork !== undefined ||
                partial.verificationStatus !== undefined ||
                partial.sortField !== undefined ||
                partial.sortOrder !== undefined ||
                partial.skills !== undefined;

            const next = normalizeQuery({
                ...nextRaw,
                page: affectsPaging ? 1 : nextRaw.page,
            });

            set({query: next});
        },

        resetFilters: () => {
            set({query: normalizeQuery(defaultQuery)});
        },

        fetchProfiles: async () => {
            const query = get().query;

            set({isLoading: true, error: null});

            const result = await catalogApi.fetchCatalog(query);

            if (!result.ok) {
                set({
                    isLoading: false,
                    error: result.message || "Failed to fetch catalog",
                    items: [],
                    pagination: null,
                    sorting: null,
                });

                return ApiResult.fail(result.message, result.problem);
            }

            const dto = result.data;

            const items = Array.isArray(dto?.items)
                ? dto.items.map(DeveloperProfile.fromApi)
                : [];

            set({
                isLoading: false,
                error: null,
                items,
                pagination: dto?.pagination ?? null,
                sorting: dto?.sorting ?? null,
            });

            return ApiResult.ok("Profiles fetched successfully", items);
        },

        fetchProfileDetails: async (id) => {
            const result = await catalogApi.fetchProfileById(id);
            if (!result.ok) {
                return ApiResult.fail(result.message, result.problem);
            }

            const details = DeveloperProfileDetails.fromApi(result.data);
            set((state) => ({
                profileDetails: {
                    ...state.profileDetails,
                    [id]: details
                }
            }));

            return ApiResult.ok("Profile details fetched");
        },
    };
});