const multer = require("multer");

//on utilise le package multer pour l'upload de fichiers (ici, des images)

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

// on set les mime types pour éviter les problèmes de format

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./uploads/post");
	},
	filename: (req, file, callback) => {
		const extension = {
			"image/jpg": "jpg",
			"image/jpeg": "jpg",
			"image/png": "png",
		};

		callback(
			null,
			file.fieldname + Date.now() + "." + extension[file.mimetype]
		);
	},
});

// on indique au multer la destination des images, on remplace les extensions par celles prévues par les mime types
// on ajoute un timestamp au nom du fichier
module.exports = multer({ storage: storage }).single("picture");

// on exporte le multer 
