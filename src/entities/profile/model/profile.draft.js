/**
 * @typedef {Object} DeveloperProfileDraft
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} role
 * @property {string} summary
 * @property {string} phone
 * @property {string} website
 * @property {string|null} avatarUrl
 * @property {boolean} openToWork
 * @property {number} yearsOfExperience
 * @property {Object|null} location
 * @property {Object|null} socialLinks
 * @property {Array} skills
 * @property {Array} projects
 * @property {Array} workExperience
 */

export const createEmptyProfileDraft = () => ({
    firstName: "",
    lastName: "",
    role: "",
    summary: "",
    phone: "",
    website: "",
    avatarUrl: null,
    openToWork: false,
    yearsOfExperience: 0,
    location: { city: "", country: "" },
    socialLinks: {},
    skills: [],
    projects: [],
    workExperience: [],
});
