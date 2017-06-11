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
	const jpgModel = exifData.image.Model;
	const jpgNumber = file.match(/\d{4}/)[0];
	const jpgModifyDate = exifData.image.ModifyDate;
	const jpgCreateDate = exifData.exif.CreateDate;
	const jpgDateTimeOriginal = exifData.exif.DateTimeOriginal;
	console.log(`=============================================`);
	console.log(file);
	console.log(`Model:   ${jpgModel}`);
	console.log(`Nummer:  ${jpgNumber}`);
	console.log(`ModifyDate:       ${jpgModifyDate}`);
	console.log(`CreateDate:       ${jpgCreateDate}`);
	console.log(`DateTimeOriginal: ${jpgDateTimeOriginal}`);
}