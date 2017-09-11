//wak-jwks/index.js

module.exports = verify;

const getPem = require('rsa-pem-from-mod-exp');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');


function verify(token, options, cb){

const client = jwksClient({
  strictSsl: true, // Default value
  jwksUri: options.jwksUri//'https://4cast-pro.au.auth0.com/.well-known/jwks.json'
});


client.getSigningKey(options.kid, (err, key) => {

		 	const signingKey = key.publicKey || key.rsaPublicKey;
            jwt.verify(token, signingKey, function(err, decoded){
             if(err){
                return cb(err);
             }
             else {
               return cb(null, decoded);
             }


           });



  // Now I can use this to configure my Express or Hapi middleware
});
}
