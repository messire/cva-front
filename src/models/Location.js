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