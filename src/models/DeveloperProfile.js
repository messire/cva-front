export class DeveloperProfile {
    constructor({
                    id,
                    firstName,
                    lastName,
                    role,
                    avatarUrl = null,
                    openToWork = false,
                    yearsOfExperience = null,
                    summary = null,
                    verificationStatus = "NotVerified",
                    skills = [],
                    projectsCount = 0
                }) {
        this.id = id;
        this.firstName = firstName ?? "";
        this.lastName = lastName ?? "";
        this.role = role ?? "";
        this.avatarUrl = avatarUrl;
        this.openToWork = Boolean(openToWork);
        this.verificationStatus = verificationStatus ?? "NotVerified";
        this.yearsOfExperience = yearsOfExperience ?? "";
        this.summary = summary ?? "";
        this.skills = Array.isArray(skills) ? skills : [];
        this.projectsCount = projectsCount;

        Object.freeze(this);
    }

    static fromApi(data) {
        return new DeveloperProfile(data);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}