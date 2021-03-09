const SamlAuthenticator = require('../authentication/SamlAuthenticator');

const handler = async (req, res) => {
    try {
        const idp = SamlAuthenticator.Idp;
        const sp = SamlAuthenticator.Sp;

        const { extract } = await sp.parseLoginResponse(idp, 'post', req);

        const firstName = extract.attributes.firstName;
        const lastName = extract.attributes.lastName;
        const email = extract.attributes.email;

        res.render('auth-success', { title: 'Success', message: 'Successfully Authenticated!.', user: { firstName, lastName, email } });
    } catch (error) {
        console.error('Error occured when parsing login response', error);
        res.render('auth-fail', { title: 'FAILED', message: 'Authentication failed.' + error.message });
    }
};

module.exports = {
    method: 'post',
    path: '/sso/acs',
    handler,
};
