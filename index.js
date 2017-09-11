//wak-jwks/index.js

module.exports = verify;

const getPem = require('rsa-pem-from-mod-exp');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');


function verify(cb){

const client = jwksClient({
  strictSsl: true, // Default value
  jwksUri: 'https://4cast-pro.au.auth0.com/.well-known/jwks.json'
});

const kid = 'REY2ODA1MUM4RDZDNjI0RjgxMUQ3QzVFQkVCNENBNDk2NjNDNEVDMg';
client.getSigningKey(kid, (err, key) => {

		 	const signingKey = key.publicKey || key.rsaPublicKey;
      const token  = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJFWTJPREExTVVNNFJEWkROakkwUmpneE1VUTNRelZGUWtWQ05FTkJORGsyTmpORE5FVkRNZyJ9.eyJpc3MiOiJodHRwczovLzRjYXN0LXByby5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTlhZTFiMmQ3NDBjNTkyZTE0M2Q4NzQyIiwiYXVkIjpbImh0dHBzOi8vYXBwLjRjYXN0LmNvbS5hdTo4NDQzIiwiaHR0cHM6Ly80Y2FzdC1wcm8uYXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImF6cCI6IlprR2tuMWlJNnNJMUR3NmVWUG5MY0ttTVQ2a0o4ZVBWIiwiZXhwIjoxNTA1MTEyNjU4LCJpYXQiOjE1MDUxMDU0NTgsInNjb3BlIjoib3BlbmlkIn0.ixtl_qQpkwDc7V4P0nYWssLJ7JTuwcIAndw-MWRgR4ci9JZ2q2O0dAp8ms9qOAVRjDNELxYKzKJmjgijN7Gawac7GAm563LXe8zDwigA2Y5YTHZ4pYLfQoJy9KYCy_VL1hGZBp3KCq99uxu6hDbEyI9tCHIWNESKMZ_2dOG-wBFdm2cRABFq9uclHDF3oo0F9i_T7vvSORyC3TqqcWd_FNfim50ThE9vq_EuaRcYb3MuHLovY8f0m4fuPMGR98LTecoxOsMwyX0hMHEk3i7zldYg_Y992rKCvAJ9_6ejeFbhr5I662pl4wfjeWM6_4Epc_LjQZxxTx-qqoHcsbS-BA'
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
