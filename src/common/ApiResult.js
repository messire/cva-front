export class ApiResult {
    constructor(success, message, data = null, problem = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.problem = problem;

        Object.freeze(this);
    }

    static ok(message, data = null) {
        return new ApiResult(true, message, data, null);
    }

    static fail(message, problem = null) {
        return new ApiResult(false, message, null, problem);
    }
}