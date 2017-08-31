const fs  = require('fs');
const ExifImage = require('exif').ExifImage;
const dir = './files/';

fs.readdir(dir, (err, files) => {
	const jpegs = [];
	const pngs  = [];
	const movs  = [];
	files.forEach( file => {
		const ext = file.slice(-4).toUpperCase();
		if (ext === '.JPG') { jpegs.push(file) }
		if (ext === '.PNG') { pngs.push(file) }
		if (ext === '.MOV') { movs.push(file) }
	});
	pngs.forEach(processNonEXIF)
	movs.forEach(processNonEXIF)
	jpegs.forEach(processJPG);
});

function processNonEXIF(file) {
	fs.stat(dir + file, (err,stat) => {
		const fileNum  = file.match(/\d{4}/);
		const fileExt  = file.slice(-4).toUpperCase();
		const fileTime = stat.mtime;
		const myear  = fileTime.getYear() + 1900;
		const mmonth = ('0' + (fileTime.getMonth() + 1)).slice(-2);
		const mdate  = ('0' + fileTime.getDate()).slice(-2);
		const mtime  = fileTime.toString().split(" ")[4].replace(/:/g, '.');
		const newFilename = `XXXXX${fileNum}__${myear}-${mmonth}-${mdate} (${mtime})${fileExt}`;
		renameFile(file, newFilename);
	});
}
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
function renameFile(file, newFilename) {
	const callback = function(err){
        if (err) throw err;
        console.log(file + " ----> " + newFilename);
    }
	fs.rename(dir + file, dir + newFilename, callback);
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
		renameFile(file, newFilename)
	} else {
		processNonEXIF(file);
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
