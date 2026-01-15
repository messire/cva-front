export class DeveloperProfile {
    constructor({
                    id,
                    firstName,
                    lastName,
                    role,
                    avatarUrl = null,
                    avatarOriginalUrl = null,
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
        this.avatarOriginalUrl = avatarOriginalUrl;
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

export class Location {
    constructor({ city = "", country = "" } = {}) {
        this.city = city ?? "";
        this.country = country ?? "";

        Object.freeze(this);
    }

    static fromApi(data) {
        return new Location(data);
    }
}

export class SocialLinks {
    constructor({
                    linkedIn = null,
                    gitHub = null,
                    twitter = null,
                    telegram = null
                } = {}) {
        this.linkedIn = linkedIn;
        this.gitHub = gitHub;
        this.twitter = twitter;
        this.telegram = telegram;
        Object.freeze(this);
    }

    static fromApi(data) {
        return new SocialLinks(data);
    }
}

export class Project {
    constructor({
                    id = null,
                    name = "",
                    description = "",
                    iconUrl = null,
                    linkUrl = null,
                    techStack = []
                } = {}) {
        this.id = id;
        this.name = name ?? "";
        this.description = description ?? "";
        this.iconUrl = iconUrl;
        this.linkUrl = linkUrl;
        this.techStack = Array.isArray(techStack) ? techStack : [];
        Object.freeze(this);
    }

    static fromApi(data) {
        return new Project(data);
    }
}

export class WorkExperience {
    constructor({
                    id = null,
                    company = "",
                    location = null,
                    role = "",
                    description = "",
                    startDate = null,
                    endDate = null,
                    techStack = []
                } = {}) {
        this.id = id;
        this.company = company ?? "";
        this.location = location ? Location.fromApi(location) : null;
        this.role = role ?? "";
        this.description = description ?? "";
        this.startDate = startDate;
        this.endDate = endDate;
        this.techStack = Array.isArray(techStack) ? techStack : [];
        Object.freeze(this);
    }

    static fromApi(data) {
        return new WorkExperience(data);
    }
}

export class DeveloperProfileDetails {
    constructor({
                    id,
                    firstName,
                    lastName,
                    email,
                    phone,
                    website = "",
                    role = "",
                    summary = "",
                    avatarUrl = null,
                    avatarOriginalUrl = null,
                    openToWork = false,
                    verified = "NotVerified",
                    yearsOfExperience = null,
                    location = null,
                    socialLinks = null,
                    skills = [],
                    projects = [],
                    workExperience = []
                }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone ?? "";
        this.website = website ?? "";
        this.role = role ?? "";
        this.summary = summary ?? "";
        this.avatarUrl = avatarUrl;
        this.avatarOriginalUrl = avatarOriginalUrl;
        this.openToWork = Boolean(openToWork);
        this.verified = verified;
        this.yearsOfExperience = yearsOfExperience ?? 0;
        this.location = location ? Location.fromApi(location) : null;
        this.socialLinks = socialLinks ? SocialLinks.fromApi(socialLinks) : null;
        this.skills = Array.isArray(skills) ? skills : [];
        this.projects = Array.isArray(projects)
            ? projects.map(Project.fromApi)
            : [];
        this.workExperience = Array.isArray(workExperience)
            ? workExperience.map(WorkExperience.fromApi)
            : [];

        Object.freeze(this);
    }

    static fromApi(data) {
        return new DeveloperProfileDetails(data);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
