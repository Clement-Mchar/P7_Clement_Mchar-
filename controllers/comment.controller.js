const { user, comment, post, like } = require( "../models" );
const jwt = require( 'jsonwebtoken' );

module.exports.readComment = async ( req, res ) => {
	try {
		const comments = await comment.findAll( {
			where: { postId: req.params.id },
			include: [
				{ model: user, attributes: [ "firstName", "lastName", "picture" ] },
				{ model: like, attributes: [ "postId" ] },
				{ model: comment, attributes: [ "firstName", "lastName", "message" ] }
			]
		} );
		return res.json( comments );
	} catch ( err ) {
		console.log( err );
		return res.status( 500 ).json( err );
	}
};

module.exports.createComment = async ( req, res ) => {
	const { message } = req.body;
	const id = req.params.id;
	const token = req.cookies.jwt;
	const decodedToken = jwt.verify( token, process.env.TOKEN_SECRET );
	const userId = decodedToken.id;
	req.auth = { userId };
	try {
		const userComment = await user.findOne( { where: { id: req.auth.userId } } );
		const postComment = await post.findOne( {
			where: { id },
			include: [
				{ model: user, attributes: [ "firstName", "lastName", "profilPicture" ] },
				{ model: like, attributes: [ "postId" ] },
				{ model: comment, attributes: [ "firstName", "lastName", "message" ] }
			],
		} );

		await comment.create( {
			firstName: userComment.firstName,
			lastName: userComment.lastName,
			message,
			userId: userComment.id,
			postId: postComment.id
		} );
		return res.json();
	} catch ( err ) {
		console.log( err );
		return res.status( 500 ).json( err );
	}
};

module.exports.deleteComment = async ( req, res ) => {
	const id = req.params.id;
	try {
			await post.findOne({where: {id }})
			await comment.destroy( {where: {postId: post.id }});
			return res.json( { message: "Comment deleted !" } );
		
	} catch ( err ) {
		console.error();
		return res.status( 500 ).json( { error: "Something went wrong" } );
	}
};

module.exports.updateComment = async ( req, res ) => {
	const id = req.params.id;
	const token = req.cookies.jwt;
	const decodedToken = jwt.verify( token, process.env.TOKEN_SECRET );
	const userId = decodedToken.id;
	req.auth = { userId };
	try {
		const postComment = await post.findOne( {
			where: { id },
			include: [
				{ model: user, attributes: [ "firstName", "lastName", "profilPicture" ] },
				{ model: like, attributes: [ "postId" ] },
				{ model: comment, attributes: [ "firstName", "lastName", "message" ] }
			],
		} );
		const Comment = await comment.findOne( {
			where: { postId: postComment.id },
		} );
		if ( comment.userId === req.auth.userId ) {
			comment.message = req.body.message;
			await Comment.save();
			return res.json();
		}
		return res.json( { message: "You can't do that" } );
	} catch ( err ) {
		console.log( err );
		return res.status( 500 ).json( { error: "Something went wrong" } );
	}
}; 