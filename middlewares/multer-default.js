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
		callback(null, "./uploads/default");
	},
	filename: 'random-User.png'
});
const maxSize = 500000;

// on indique au multer la destination des images, on remplace les extensions par celles prévues par les mime types
// on ajoute un timestamp au nom du fichier
module.exports = multer({ storage: storage, limits: { fileSize: maxSize } }).single("profilPicture");

// on exporte le multer
