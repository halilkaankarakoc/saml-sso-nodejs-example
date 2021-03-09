const samlify = require('samlify');

const privates = {
    idp: null,
    sp: null
};

samlify.setSchemaValidator({
    validate: (response) => {
        /* implment your own or always returns a resolved promise to skip */
        return Promise.resolve('skipped');
    }
});

class SamlAuthenticator {

    constructor() {
        throw new Error('This class cannot be initialized');
    }

    static get Idp() {
        if (!privates.idp) {
            throw new Error('You must first call init method');
        }
        return privates.idp;
    }

    static get Sp() {
        if (!privates.sp) {
            throw new Error('You must first call init method');
        }
        return privates.sp;
    }

    static init(idpConfig, spConfig) {
        if (!idpConfig) {
            throw new Error('idpConfig is missed');
        }

        if (!spConfig) {
            throw new Error('spConfig is missed');
        }

        if (!privates.idp) {
            privates.idp = samlify.IdentityProvider(idpConfig)
        }

        if (!privates.sp) {
            privates.sp = samlify.ServiceProvider(spConfig);
        }
    }
}

module.exports = SamlAuthenticator;