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
				return res.status( 409 ).send();

			}
			if ( req.body.password.length > 6 ) {
				console.log( 'ici' );
				bcrypt
					.hash( req.body.password, 10 )
					.then( ( hash ) => {
						const User = user.create( {
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							profilPicture: `${ req.protocol }://${ req.get( "host" ) }/profil/random-User.png`,
							password: hash,
						} );
						return res.status( 201 ).json( User );
					} )

					.catch( ( err ) => {
						const errors = signUpErrors( err );
						console.log( 'et non c le troisième' );
						return res.status( 409 ).send( { errors } );
					} );
			} else {
				const errors = signUpErrors( err );
				console.log( 'ou le quatrième...' );
				return res.status( 409 ).send( { errors } );;
			}
		} )
		.catch( ( err ) => {
			const errors = signUpErrors( err );
			console.log( 'ptn' );
			return res.status( 409 ).send( { errors } );
		} );
};
exports.login = ( req, res ) => {
	const email = req.body.email;
	user
		.findOne( { where: { email } } )
		.then( ( user ) => {
			if ( !user ) {
				const errors = signInErrors( err );
				return res.status( 500 ).json( { errors } );
			}
			bcrypt
				.compare( req.body.password, user.password )
				.then( ( valid ) => {
					if ( !valid ) {
						const errors = signInErrors( err );
						return res.status( 500 ).json( { errors } );
					}
					const token = createToken( user.id );
					res.cookie( "jwt", token, { httpOnly: true, sameSite: 'none', secure: true, maxAge } );
					res.status( 200 ).json( { user: user.id } );
				} )
				.catch( ( err ) => {
					const errors = signInErrors( err );
					return res.status( 500 ).json( { errors } );
				} );
		} )
		.catch( ( err ) => {
			const errors = signInErrors( err );
			return res.status( 500 ).json( { errors } );
		} );
};

module.exports.logout = ( req, res ) => {
	res.cookie( "jwt", "", { maxAge: 1 } );
	res.redirect( "" );
};
