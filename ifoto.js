const fs  = require('fs');
const ExifImage = require('exif').ExifImage;
const dir = './';

fs.readdir(dir, (err, files) => {
	const jpegs = files.filter( file => file.slice(-4).toUpperCase() === '.JPG' );
	jpegs.forEach(renameJPG);
});

function renameJPG(file) {
	console.log(file)
}
