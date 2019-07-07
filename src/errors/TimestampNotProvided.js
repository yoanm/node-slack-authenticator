'use strict';

const BaseError = require('./SlackAuthenticatorError');

class TimestampNotProvided extends BaseError
{
    constructor() {
        super('Slack timestamp not provided !', 400);
    }
}

module.exports = TimestampNotProvided;
