const fs = require('fs');
const path = require('path');
const registerRoutes = require('./util/registerRoutes');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const SamlAuthenticator = require('./authentication/SamlAuthenticator');

const idpConfig = {
    metadata: fs.readFileSync(path.join(__dirname, './metadatas/idp_metadata.xml'))
};

const spConfig = {
    metadata: fs.readFileSync(path.join(__dirname, './metadatas/sp_metadata.xml'))
};

SamlAuthenticator.init(idpConfig, spConfig);

const app = express();
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const routes = registerRoutes();

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});
