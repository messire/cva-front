import {create} from "zustand";

import * as catalogApi from "../api/catalog.api.js";
import {ApiResult} from "../common/ApiResult.js";
import {DeveloperProfile} from "../models/DeveloperProfile.js";
import {DeveloperProfileDetails} from "../models/DeveloperProfileDetails.js";

export const createApiResult = ({ok, message, problem}) => ({ok, message, problem});

export const useCatalogStore = create((set, get) => {
    return {
        profiles: [],
        profileDetails: {},

        fetchProfiles: async () => {
            const result = await catalogApi.fetchCatalog();

            if (!result.ok) {
                return ApiResult.fail(result.message, result.problem);
            }

            const profiles = Array.isArray(result.data)
                ? result.data.map(DeveloperProfile.fromApi)
                : [];

            set({profiles});

            return ApiResult.ok("Profiles fetched successfully", profiles);
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
    }
});