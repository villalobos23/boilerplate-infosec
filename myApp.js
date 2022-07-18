const express = require('express');
const helmet = require("helmet");
const app = express();
app.use(helmet());
app.use(helmet.hidePoweredBy());//remove the header - information disclosure
app.use(helmet.frameguard({action: 'deny'}));//X-Frame-Options header to mitigate clickjacking - spoofing 
//NOTE the  up-to-date header to mitigate clickjacking is frame ancestors - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors

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
