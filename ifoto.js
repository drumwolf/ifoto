const fs  = require('fs');
const ExifImage = require('exif').ExifImage;
const dir = '/Users/drumwolf/Desktop/files/';

fs.readdir(dir, (err, files) => {
	const jpegs = files.filter( file => file.slice(-4).toUpperCase() === '.JPG' );
	jpegs.forEach(processJPG);
});

function processJPG(file) {
	try {
		new ExifImage({ image : dir + file }, function (error, exifData) {
			if (error)
				console.log('Error: '+error.message);
			else {
				renameJPG(file, exifData);
			}
		});
	} catch (error) {
		console.log('Error: ' + error.message);
	}
}
function renameJPG(file, exifData) {
	console.log(`=============================================`);
	console.log(`----------------${file}----------------`);
	console.log(exifData)
}