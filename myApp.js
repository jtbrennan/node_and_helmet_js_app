const express = require('express');
const helmet = require('helmet');
const app = express();
var timeInSeconds = 90*24*60*60;

// Set security-related HTTP headers
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter()); // Enable XSS filtering
app.use(helmet.noSniff()); // Prevent MIME sniffing
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}));
app.use(helmet.noCache());

app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  dnsPrefetchControl: false     // disable
}))

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"], // Allow only same-origin scripts
    styleSrc: ["'self'"],
    imgSrc: ["'self'"],
    objectSrc: ["'none'"],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"]
  }
}));

app.get('/test', (req, res) => {
  res.send('<script>alert("XSS Attack");</script>');
});






































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
