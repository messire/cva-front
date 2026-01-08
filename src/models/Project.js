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