const fs  = require('fs');
const ExifImage = require('exif').ExifImage;
const dir = './';

fs.readdir(dir, (err, files) => {
	const jpegs = files.filter( file => file.slice(-4).toUpperCase() === '.JPG' );
	jpegs.forEach(processJPG);
});

function processJPG(file) {
	try {
		new ExifImage({ image : 'myImage.jpg' }, function (error, exifData) {
			if (error)
				console.log('Error: '+error.message);
			else {
				console.log(exifData);
			}
		});
	} catch (error) {
		console.log('Error: ' + error.message);
	}
}
