import {Location} from "./Location";

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