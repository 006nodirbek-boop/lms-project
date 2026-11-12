
export class NotFoundError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }
}

export class ConflictError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }
}

export class InternalServerError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }
}

export class BadRequestError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }
}

export class UnauthorizedError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }
}

export class ForBiddenError extends Error{
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }
}