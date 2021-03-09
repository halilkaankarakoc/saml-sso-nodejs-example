const SamlAuthenticator = require('../authentication/SamlAuthenticator');

const handler = (req, res) => {
    const idp = SamlAuthenticator.Idp;
    const sp = SamlAuthenticator.Sp;

    const { id, context: authUrl } = sp.createLoginRequest(idp, 'redirect', req);

    res.redirect(authUrl);
}

module.exports = {
    method: 'get',
    path: '/sso/init-login',
    handler,
};