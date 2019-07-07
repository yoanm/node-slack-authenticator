'use strict';

class SlackAuthenticatorError extends Error
{
    constructor(message, httpCode = 500) {
        super(message);
        this.httpCode = httpCode;
    }
}

module.exports = SlackAuthenticatorError;

