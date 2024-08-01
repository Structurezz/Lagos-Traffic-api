export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

export class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
        this.statusCode = 422;
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}

export class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
    }
}
