import {create} from "zustand";

import * as profileApi from "../api/profile.api.js";
import {ApiResult} from "../../../shared/utils/ApiResult.js";
import {DeveloperProfileDetails} from "../../../entities/profile/model/profile.model.js";

export const useProfileStore = create((set, get) => ({
    myProfile: null,
    isLoading: false,

    loadMyProfile: async () => {
        set({isLoading: true});
        try {
            const res = await profileApi.fetchMyProfile();

            if (!res.ok) {
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
            if (!res.ok) {
                return ApiResult.fail(res.message, res.problem);
            }

            const details = DeveloperProfileDetails.fromApi(res.data);
            set({myProfile: details});
            return ApiResult.ok("Profile created");
        } finally {
            set({isLoading: false});
        }
    },

    updateMyProfile: async (request) => {
        set({isLoading: true});
        try {
            const res = await profileApi.updateMyProfile(request);
            if (!res.ok) {
                return ApiResult.fail(res.message, res.problem);
            }
            const details = DeveloperProfileDetails.fromApi(res.data);
            set({myProfile: details});
            return ApiResult.ok("Profile updated");
        } finally {
            set({isLoading: false});
        }
    },

    updateHeader: async (request) => {
        const res = await profileApi.updateHeader(request);
        if (!res.ok) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Header updated");
    },

    updateSummary: async (request) => {
        const res = await profileApi.updateSummary(request);
        if (!res.ok) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Summary updated");
    },

    updateContacts: async (request) => {
        const res = await profileApi.updateContacts(request);
        if (!res.ok) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Contacts updated");
    },

    replaceSkills: async (skills) => {
        const res = await profileApi.replaceSkills(skills);
        if (!res.ok) {
            return ApiResult.fail(res.message, res.problem);
        }
        set({myProfile: DeveloperProfileDetails.fromApi(res.data)});
        return ApiResult.ok("Skills updated");
    },

    addExperience: async (payload) => {
        const res = await profileApi.createWorkExperience(payload);
        if (!res.ok) return ApiResult.fail(res.message, res.problem);
        await get().loadMyProfile();
        return ApiResult.ok("Experience added");
    },

    editExperience: async (id, payload) => {
        const res = await profileApi.updateWorkExperience(id, payload);
        if (!res.ok) return ApiResult.fail(res.message, res.problem);
        await get().loadMyProfile();
        return ApiResult.ok("Experience updated");
    },

    removeExperience: async (id) => {
        const res = await profileApi.deleteWorkExperience(id);
        if (!res.ok) return ApiResult.fail(res.message, res.problem);
        await get().loadMyProfile();
        return ApiResult.ok("Experience removed");
    },

    addProject: async (payload) => {
        const res = await profileApi.createProject(payload);
        if (!res.ok) return ApiResult.fail(res.message, res.problem);
        await get().loadMyProfile();
        return ApiResult.ok("Project added");
    },

    editProject: async (id, payload) => {
        const res = await profileApi.updateProject(id, payload);
        if (!res.ok) return ApiResult.fail(res.message, res.problem);
        await get().loadMyProfile();
        return ApiResult.ok("Project updated");
    },

    removeProject: async (id) => {
        const res = await profileApi.deleteProject(id);
        if (!res.ok) return ApiResult.fail(res.message, res.problem);
        await get().loadMyProfile();
        return ApiResult.ok("Project removed");
    }
}));
