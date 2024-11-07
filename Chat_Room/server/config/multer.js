const multer = require('multer');
const path = require('path');

const photoStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		if(file.mimetype.startsWith('image')){
			cb(null, '/photos');
		} else if (file.mimetype.startsWith('video')) {
			cb(null, '/videos');
		}
	},
	filename: function(req, file, cb) {
		const uniquePic = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, `${uniquePic}-${file.originalname}`);
	}

});

const upload = multer({
	photoStorage: photoStorage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if(file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
			cb(null, true);
		} else {
			cb(new Error('Only image and video files allowed'), false);
		}
	}
});

module.exports = upload;

