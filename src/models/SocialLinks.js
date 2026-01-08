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