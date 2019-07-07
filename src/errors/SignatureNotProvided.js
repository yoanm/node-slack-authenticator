'use strict';

const BaseError = require('./SlackAuthenticatorError');

class SignatureNotProvided extends BaseError
{
    constructor() {
        super('Slack signature not provided !', 400);
    }
}

module.exports = SignatureNotProvided;

