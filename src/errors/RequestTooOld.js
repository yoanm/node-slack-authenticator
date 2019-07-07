'use strict';

const BaseError = require('./SlackAuthenticatorError');

class RequestTooOld extends BaseError
{
    constructor() {
        super('Request too old !', 404);
    }
}

module.exports = RequestTooOld;
