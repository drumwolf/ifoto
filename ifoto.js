const fs  = require('fs');
const ExifImage = require('exif').ExifImage;
const dir = './';

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
				setFilename(file, exifData);
			}
		});
	} catch (error) {
		console.log('Error: ' + error.message);
	}
}
function setFilename(file, exifData) {
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
		const filenameModel = setFilenameModel(jpgModel);
		const filenameDate = setFilenameDate(jpgCreateDate);
		const newFilename = `${filenameModel}${jpgNumber}__${filenameDate}.JPG`;
		console.log(`${file} =======> ${newFilename}`)
	}
}
function setFilenameDate(datetime) {
	let [ date, time ] = datetime.split(' ');
	date = date.replace(/\:/g,"-");
	time = time.replace(/\:/g,".");
	return `${date} (${time})`;
}
function setFilenameModel(model) {
	if (model.match(/ipad/i)) { return "IPAD" }
	if (model.match(/iphone/i)) { return "IPHONE" }
	return null;
}
