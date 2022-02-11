const customMessages = {
    custom_message: { code: 200, message: 'custom message' },
    invalid_password: { code: 406, message: 'Your password must be between 8 and 20 characters, including at least 1 uppercase, 1 lowercase letter, 1 number digit, and a special character.' },
    proper_email: { code: 406, message: 'Please enter a proper email id with minimum length 3 and maxmimum length 255' },
    email_not_found: { code: 404, message: "We didn't recognise this email." },
    incorrect_password: { code: 406, message: 'Your email and/or password do not match' },
    usernsame_exists: { code: 406, message: 'Username already exists' },
    custom_message_jwt: { code: 401, message: 'Session Expired please login again' },
};
/**
 * Push notification messages
 */
const notifications = {};

const builder = {
    wrong_credentials: (prefix) => builder.prepare(403, prefix, 'Invalid credentials'),
    unauthorized: (prefix) => builder.prepare(401, prefix, 'Authentication Error, Please try logging again'),
    invalid_req: (prefix) => builder.prepare(406, prefix, 'invalid Request'),
    wrong_otp: (prefix) => builder.prepare(403, prefix, 'entered OTP is invalid'),
    server_error: (prefix) => builder.prepare(500, prefix, 'server error'),
    server_maintenance: (prefix) => builder.prepare(500, prefix, 'maintenance mode is active'),
    inactive: (prefix) => builder.prepare(403, prefix, 'inactive'),
    not_found: (prefix) => builder.prepare(404, prefix, 'not found'),
    not_matched: (prefix) => builder.prepare(406, prefix, 'not matched'),
    not_verified: (prefix) => builder.prepare(403, prefix, 'not verified'),
    not_activated: (prefix) => builder.prepare(406, prefix, 'not activated'),
    already_exists: (prefix) => builder.prepare(409, prefix, 'already exists'),
    already_verified: (prefix) => builder.prepare(409, prefix, 'already verified'),
    user_deleted: (prefix) => builder.prepare(406, prefix, 'deleted by admin'),
    user_blocked: (prefix) => builder.prepare(406, prefix, 'blocked by admin'),
    required_field: (prefix) => builder.prepare(419, prefix, 'field required'),
    minimum_length: (prefix) => builder.prepare(406, prefix, 'length should be 2 to 20'),
    too_many_request: (prefix) => builder.prepare(429, prefix, 'too many request'),
    expired: (prefix) => builder.prepare(417, prefix, 'expired'),
    canceled: (prefix) => builder.prepare(419, prefix, 'canceled'),
    created: (prefix) => builder.prepare(200, prefix, 'created'),
    updated: (prefix) => builder.prepare(200, prefix, 'updated'),
    deleted: (prefix) => builder.prepare(417, prefix, 'deleted'),
    blocked: (prefix) => builder.prepare(401, prefix, 'blocked'),
    success: (prefix) => builder.prepare(200, prefix, 'success'),
    verified: (prefix) => builder.prepare(200, prefix, 'verified'),
    successfully: (prefix) => builder.prepare(200, prefix, 'successfully'),
    error: (prefix) => builder.prepare(500, prefix, 'error'),
    no_prefix: (prefix) => builder.prepare(400, prefix, ''),
    no_message: (prefix) => builder.prepare(200, prefix, ''),
    custom: { ...customMessages },
    notifications,
};
Object.defineProperty(builder, 'prepare', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: (code, prefix, message) => ({
        code,
        message: `${prefix ? `${prefix} ${message}` : message}`,
    }),
});

module.exports = builder;
