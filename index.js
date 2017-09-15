//wak-jwks/index.js

module.exports = verify;

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const ms = require('ms');

// @token jwt token
// @options options to pass to the jwksClient
//      - currently only supports jwksUri
// @cb - callback function
//      - if successful returns the decoded token
//      - if an error occurs it returns the Error
function verify(token, options, cb){

  // jwksClient goes to the specified uri to get the signing key
  // once we have the signing key we can use it to
  // verify the token

    const client = jwksClient({
      cache: true,
      cacheMaxEntries: 5, // Default value
      cacheMaxAge: ms('10h'), // Default value
      rateLimit: true,
      jwksRequestsPerMinute: 10, // Default value
      strictSsl: true, // Default value
      jwksUri: options.jwksUri
    });


    client.getSigningKey(options.kid, (err, key) => {

      if(key){
          const signingKey = key.publicKey || key.rsaPublicKey;

        // now use the key to verify and decode the token

        jwt.verify(token, signingKey, function(err, decoded){
         if(err){
            return cb(err);
         }
         else {
           return cb(null, decoded);
         }
        });
      }
     else{
       return cb(err);
     }

});
}
