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
	// relevant exif data
	const jpgModel = exifData.image.Model;
	const jpgNumber = file.match(/\d{4}/)[0];
	const jpgModifyDate = exifData.image.ModifyDate;
	const jpgCreateDate = exifData.exif.CreateDate;
	const jpgDateTimeOriginal = exifData.exif.DateTimeOriginal;
	// test to see if exif data is valid
	const hasExifData = (jpgModel && jpgModifyDate === jpgCreateDate && jpgModifyDate === jpgDateTimeOriginal);
	// rename file if exif data is valid
	if (hasExifData) {
		console.log(`${file} =======> ${jpgModel} / ${jpgNumber} / ${jpgCreateDate}`)
	}
}