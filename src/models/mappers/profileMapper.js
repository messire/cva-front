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

/**
 * @param {import('../DeveloperProfileDetails').DeveloperProfileDetails} model
 * @returns {DeveloperProfileDraft}
 */
export function mapProfileToDraft(model) {
    if (!model) return null;

    return {
        firstName: model.firstName || "",
        lastName: model.lastName || "",
        role: model.role || "",
        summary: model.summary || "",
        phone: model.phone || "",
        website: model.website || "",
        avatarUrl: model.avatarUrl || null,
        openToWork: Boolean(model.openToWork),
        yearsOfExperience: model.yearsOfExperience || 0,
        location: model.location ? { ...model.location } : { city: "", country: "" },
        socialLinks: model.socialLinks ? { ...model.socialLinks } : {},
        skills: Array.isArray(model.skills) ? [...model.skills] : [],
        projects: Array.isArray(model.projects) ? model.projects.map(p => ({ ...p })) : [],
        workExperience: Array.isArray(model.workExperience) ? model.workExperience.map(w => ({ ...w })) : [],
    };
}

/**
 * @param {DeveloperProfileDraft} draft
 * @returns {Object}
 */
export function mapDraftToUpdateRequest(draft) {
    return {
        firstName: draft.firstName?.trim() || "",
        lastName: draft.lastName?.trim() || "",
        role: draft.role?.trim() || null,
        summary: draft.summary?.trim() || null,
        phone: draft.phone?.trim() || null,
        website: draft.website?.trim() || null,
        avatarUrl: draft.avatarUrl?.trim() || null,
        openToWork: Boolean(draft.openToWork),
        yearsOfExperience: Number(draft.yearsOfExperience || 0),
        location: draft.location ? {
            city: draft.location.city?.trim() || null,
            country: draft.location.country?.trim() || null,
        } : null,
        socialLinks: draft.socialLinks || null,
        skills: Array.isArray(draft.skills) ? draft.skills : [],
        projects: Array.isArray(draft.projects) ? draft.projects : [],
        workExperience: Array.isArray(draft.workExperience) ? draft.workExperience : [],
    };
}
