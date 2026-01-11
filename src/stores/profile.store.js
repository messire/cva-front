import {create} from "zustand";

import * as profileApi from "../api/profile.api.js";
import {ApiResult} from "../common/ApiResult.js";
import {DeveloperProfileDetails} from "../models/DeveloperProfileDetails.js";

export const useProfileStore = create((set, get) => ({
    myProfile: null,
    isLoading: false,

    loadMyProfile: async () => {
        set({isLoading: true});
        try {
            const res = await profileApi.fetchMyProfile();

            if (!res.success) {
                set({myProfile: null});
                return ApiResult.fail(res.message, res.problem);
            }

            const details = DeveloperProfileDetails.fromApi(res.data);
            set({myProfile: details});
            return ApiResult.ok("Profile loaded");
        } finally {
            set({isLoading: false});
        }
    },

    createMyProfile: async (request) => {
        set({isLoading: true});
        try {
            const res = await profileApi.createMyProfile(request);
            if (!res.success) {
                return ApiResult.fail(res.message, res.problem);
            }

            const details = DeveloperProfileDetails.fromApi(res.data);
            set({myProfile: details});
            return ApiResult.ok("Profile created");
        } finally {
            set({isLoading: false});
        }
    },

    updateHeader: async (request) => {
        const res = await profileApi.updateHeader(request);
        if (!res.success) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Header updated");
    },

    updateSummary: async (request) => {
        const res = await profileApi.updateSummary(request);
        if (!res.success) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Summary updated");
    },

    updateContacts: async (request) => {
        const res = await profileApi.updateContacts(request);
        if (!res.success) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Contacts updated");
    },

    replaceSkills: async (skills) => {
        const res = await profileApi.replaceSkills(skills);
        if (!res.success) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Skills updated");
    }
}));