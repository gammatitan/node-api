type StatusCode = number;

interface Response {
    [x: string]: StatusCode;
}

const RESPONSE: Response = {
    HTTP_OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORISED: 401,
};

export default RESPONSE;
