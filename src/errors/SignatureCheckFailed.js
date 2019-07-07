'use strict';

const BaseError = require('./SlackAuthenticatorError');

class SignatureCheckFailed extends BaseError
{
    constructor() {
        super('Slack signature is not valid !', 404);
    }
}

module.exports = SignatureCheckFailed;
