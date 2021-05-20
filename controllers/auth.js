const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const request = require('request');
const config = require('../config/dev');

// Authentication middleware
// This middleware will check access token in authorization headers
// of a request
// It will verify access token against Auth0 JSON web key set
exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-sljrwyde.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://dev-sljrwyde.us.auth0.com/api/v2/',
  issuer: 'https://dev-sljrwyde.us.auth0.com/',
  algorithms: ['RS256'],
});

exports.checkRole = (role) => (req, res, next) => {
  const user = req.user;
  if (user && user[config.AUTH0_NAMESPACE + '/roles'].includes(role)) {
    next();
  } else {
    return res
      .status(401)
      .send('You are not authorized to access this resource!');
  }
};

exports.getAccessToken = (callback) => {
  const options = {
    methods: 'POST',
    url: 'https://dev-sljrwyde.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    form: {
      grant_type: 'client_credentials',
      client_id: 'hwc7BAGD9mjWbwXO8CgJX5D41symMeBz',
      client_secret:
        'xvxyD8PoSMh5CsT9hQwbRNAtdzTQmlWvz2uBBebYtWsgHLpvactKQYa0qFy6M6xG',
      audience: 'https://dev-sljrwyde.us.auth0.com/api/v2/',
    },
  };

  request(options, (error, res, body) => {
    if (error) {
      callback(error);
    }

    return callback(null, JSON.parse(body));
  });
};
