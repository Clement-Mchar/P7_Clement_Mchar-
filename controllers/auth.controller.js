const bcrypt = require( "bcrypt" );
const { user } = require( "../models" );
const jwt = require( "jsonwebtoken" );
const { signUpErrors, signInErrors } = require( '../utils/errors.utils' );


const maxAge = 24 * 60 * 60 * 1000;
const createToken = ( id ) => {
	return jwt.sign( { id }, process.env.TOKEN_SECRET, {
		expiresIn: maxAge,
	} );
};

exports.signUp = ( req, res ) => {
	
	user.findOne( { where: { email: req.body.email } } )
		.then( ( userFind ) => {
			if ( userFind ) {
				return res.status( 200 ).send();
			}
			if ( req.body.password.length > 6 ) {
				bcrypt
					.hash( req.body.password, 10 )
					.then( ( hash ) => {
						const User = user.create( {
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							profilPicture: `${ req.protocol }://${ req.get( "host" ) }/profil/random-User.png`,
							password: hash,
							isAdmin: req.body.email == "admin@admin.admin" ? true : false,
						} );
						return res.status( 201 ).json( User );
					} )

					.catch( ( err ) => {
						const errors = signUpErrors( err );
						return res.status( 200 ).send(  );
					} );
			} else {
				const errors = signUpErrors( err );
				return res.status( 500 ).send(  );;
			}
		} )
		.catch( ( err ) => {
			const errors = signUpErrors( err );
			return res.status( ).send(  );
		} );
};
exports.login = ( req, res ) => {
	const email = req.body.email;
	user
		.findOne( { where: { email } } )
		.then( ( user ) => {
			if ( !user ) {
				
				res.status(200).send();
			}
			bcrypt
				.compare( req.body.password, user.password )
				.then( ( valid ) => {
					if ( !valid ) {
						
						return res.status(403).json(  );
					}
					const token = createToken( user.id );
					res.cookie( "jwt", token, { httpOnly: true, sameSite: 'none', secure: true,   maxAge } );
					res.status( 200 ).json();
				} )
				.catch( ( err ) => {
					
					res.status(200).send();
				} );
		} )
		.catch( ( err ) => {
			res.status(200).send();
		} );
};

module.exports.logout = ( req, res ) => {
	res.cookie( "jwt", "", { maxAge: 1 } );
	res.redirect( "" );
};
