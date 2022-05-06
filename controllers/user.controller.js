const { user, post, like, comment } = require( "../models" );
const fs = require( "fs" );
const jwt = require( "jsonwebtoken" );
module.exports.getAllUsers = async ( req, res ) => {
	const users = await user.findAll();
	res.status( 200 ).json( users );
};

module.exports.getUser = async ( req, res ) => {
	const id = req.params.id;
	try {
		const users = await user.findOne( {
			where: { id },
			include: [
				{ model: post, attributes: [ "firstName", "lastName", "message" ] },
			],
		} );
		return res.json( users );
	} catch ( err ) {
		console.log( err );
		return res.status( 500 ).json( { error: "Something went wrong" } );
	}
};

module.exports.updatePicture = async ( req, res ) => {
	const id = req.params.id;

	try {
		const users = await user.findOne( {
			where: { id },
		} );
		const resultHandler = ( err ) => {
			if ( err ) {
				console.log( "unlink failed", err );
			} else {
				console.log( "file deleted" );
			}
		};
		const defaultPic = "random-User.png";
		const filename = await users.profilPicture.split( "/profil/" )[ 1 ];
		if ( filename !== defaultPic ) {
			fs.unlink(
				`${ __dirname }/../uploads/profil/${ filename }`,
				resultHandler
			);
		}
		users.bio = req.body.bio;
		users.profilPicture = `${ req.protocol }://${ req.get( "host" ) }/profil/${ req.file.filename }`;

		await users.save();
		return res.json( { users } );
	} catch ( err ) {
		console.log( err );
		return res.status( 500 ).json( { error: "Something went wrong" } );
	}
};
module.exports.updateBio = async ( req, res ) => {
	const id = req.params.id;

	try {
		const users = await user.findOne( {
			where: { id },
		} );

		users.bio = req.body.bio;


		await users.save();
		return res.json( { users } );
	} catch ( err ) {
		console.log( err );
		return res.status( 500 ).json( { error: "Something went wrong" } );
	}
};

module.exports.deleteUser = async ( req, res ) => {
	const id = req.params.id;
	try {
		const User = await user.findOne( { where: { id } } );
		const Post = await post.findOne( { where: { userId: User.id } } );
		await comment.destroy( { where: { postId: Post.id } } );
		await like.destroy( { where: { postId: Post.id } } );
		await post.destroy( { where: { userId: User.id }, include: "likes", include: "comments" } );
		await user.destroy( {
			where: { id }, include: "posts", include: "likes", include: "comments"
		} );

		return res.json( { message: "user deleted !" } );

	} catch ( err ) {
		console.log( err );
		return res.status( 500 ).json( { error: "Something went wrong" } );
	}

};
