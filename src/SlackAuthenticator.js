'use strict';

const crypto = require('crypto');
const qs = require('qs');

const {
    RequestTooOld,
    SignatureNotProvided,
    TimestampNotProvided,
    SignatureCheckFailed,
} = require('./errors');

class SlackAuthenticator
{
    /**
     * @param {string} slackSigningSecret
     * @param {string} version
     */
    constructor(slackSigningSecret, version = 'v0') {
        // no secret configured => throw error
        if (!slackSigningSecret) {
            throw new Error('Missing slack signing secret !');
        }
        this.slackSigningSecret = slackSigningSecret;
        this.version = version;
    }

    /**
     * @public
     *
     * @param {string}     expectedSignature
     * @param {string}     requestBody
     * @param {string|int} slackTimestamp
     */
    validate(expectedSignature, requestBody, slackTimestamp) {
        let time = Math.floor(new Date().getTime()/1000);
        if (Math.abs(time - slackTimestamp) > 300) {
            // Request is too old => reject
            throw new RequestTooOld();
        }
        if (!expectedSignature) {
            throw new SignatureNotProvided();
        }
        if (!slackTimestamp) {
            // no timestamp provided => reject
            throw new TimestampNotProvided();
        }

        const actualSignature = this.sign(requestBody, slackTimestamp);

        if (!crypto.timingSafeEqual(
            Buffer.from(actualSignature, 'utf8'),
            Buffer.from(expectedSignature, 'utf8')
        )) {
            throw new SignatureCheckFailed();
        }
    }

    /**
     * @public
     *
     * @param {string} requestBody
     * @param {string} timestamp
     *
     * @returns {string} Slack format signature
     */
    sign(requestBody, timestamp) {
        const sigBasestring = `${this.version}:${timestamp}:${qs.stringify(requestBody, {format : 'RFC1738'})}`;
        const rawSignature = crypto.createHmac('sha256', this.slackSigningSecret)
            .update(sigBasestring, 'utf8')
            .digest('hex')
        ;

        return `${this.version}=${rawSignature}`;
    }
}

module.exports = SlackAuthenticator;
