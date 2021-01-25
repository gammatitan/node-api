import RESPONSE from '../constants/response';

class ApiError {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    static badRequest = (message: string = 'Bad request') => {
        return new ApiError(RESPONSE.BAD_REQUEST, message);
    };

    static notFound = (message: string = 'Bad request') => {
        return new ApiError(RESPONSE.NOT_FOUND, message);
    };

    static internalServerError = (message: string = 'Internal server error') => {
        return new ApiError(RESPONSE.INTERNAL_SERVER_ERROR, message);
    };

    static unauthorised = () => {
        return new ApiError(RESPONSE.UNAUTHORISED, 'Unauthorised');
    };
}

export default ApiError;
