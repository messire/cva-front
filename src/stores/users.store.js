import {create} from "zustand";
import * as usersApi from "../api/users.api.js";

export const useUserStore = create((set, get) => {
    return {
        users: [],

        fetchUsers: async () => {
            const result = await usersApi.fetchUsers();
            if (!result.ok) {
                return {success: false, message: result.message, problem: result.problem};
            }

            set({users: Array.isArray(result.data) ? result.data : []});
            return {success: true, message: "Users fetched successfully"};
        },

        fetchUser: async (id) => {
            const result = await usersApi.fetchUserById(id);
            if (!result.ok) {
                return {success: false, message: result.message, problem: result.problem};
            }

            set((state) => ({
                users: state.users.map((u) => (u.id === id ? result.data : u)),
            }));

            return {success: true, data: result.data};
        },

        createUser: async (newUser) => {
            const result = await usersApi.createUser(newUser);

            if (!result.ok) {
                return {success: false, message: result.message, problem: result.problem};
            }

            if (!result.data) {
                await get().fetchUsers();
                return {success: true, message: "User created."};
            }

            set((state) => ({users: [...state.users, result.data]}));
            return {success: true, message: "User created."};
        },

        updateUser: async (id, updates) => {
            const result = await usersApi.updateUser(id, updates);
            if (!result.ok) {
                return {success: false, message: result.message, problem: result.problem};
            }

            set((state) => ({
                users: state.users.map((u) => {
                    if (u.id !== id) {
                        return u;
                    }

                    if (result.data && typeof result.data === "object") {
                        return result.data;
                    }

                    return {...u, ...updates};
                }),
            }));

            return {success: true, message: result.message};
        },

        deleteUser: async (id) => {
            const result = await usersApi.deleteUser(id);
            if (!result.ok) {
                return {success: false, message: result.message, problem: result.problem};
            }

            const deletedId = result.data?.id ?? id;

            set((state) => ({
                users: state.users.filter((u) => u.id !== deletedId),
            }));

            return {success: true, message: "User deleted successfully."};
        }
    }
});