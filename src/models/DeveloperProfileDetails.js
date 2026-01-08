import {Location} from "./Location";
import {SocialLinks} from "./SocialLinks";
import {Project} from "./Project";
import {WorkExperience} from "./WorkExperience";

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