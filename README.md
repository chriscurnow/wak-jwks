# wak-jwks
A Wakanda node module to enable authentication with Auth0.

Requires Wakanda Server 2.1+.

This is definitely a work in progress.

Use it at your own risk.

Assumes you already have a access token from Auth0 (ie following client login).

Pass the access token in the Authorisation header of a request to Wakanda.

On the Wakanda end you will need to run this inside a node worker.

When you receive the request at the Wakanda end, you will need to extract the token from the Authorisation header.

Then pass the token to this module. If the token is valid it will return the decoded token, otherwise it will return an error.

Here is some sample Wakanda code.
```js
exports.checkAuthorisation = function(request){
	
	const threadify = require( 'threadify' );
	const jwt = threadify.require( 'jwt-worker' );
	
	var returnInfo = {success: false}
	
	 var token = request.headers['AUTHORIZATION'];
      if(token){
      	if(token.indexOf("Bearer ")==0) {
    		token = token.substring(7);			
		        var checkResult = jwt.checkToken(token);        
		        if(checkResult.code){
		        	// an error occured
		        	// this seems do with how Threadify returns results
		        	// if an error occurs the result will include a 'code' attribute
		        	// if no error occurs the 'code' attribute will not be present
		        	
		          returnInfo.success=false;
		          returnInfo.message=checkResult.data;
		          
		        } else {
		        	
		        returnInfo.success=true;
		        	//TODO do some checking on the decoded result.	          
		        }
      		}
		   else{
			returnInfo.message="Authorization Header not properly formed"
		   }
      } else {
        returnInfo.message="Authorization Header not found"
      }
           
      return returnInfo;
}
```

And then, in jwt-worker, we have: 

```js
	exports.checkToken = function(token, callback){
	
	const wakJwks = requireNode('wak-jwks');
	
	const options={
			kid: <your kid here>,
			jwksUri: 'https://<your-domain>.auth0.com/.well-known/jwks.json'
		}
		
	wakJwks(token, options, (err, decoded) => {
				if(!err){
					callback(null, decoded);
				}
				else {
					callback(err);
				}		
			});
	
}
```

Pull requests and issues are welcome at https://github.com/chriscurnow/wak-jwks

When I have done some more testing I will add some documentation here.
