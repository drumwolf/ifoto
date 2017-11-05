const fs  = require('fs');
const dir = './' + process.argv[2] + '/';

fs.readdir(dir, (err, files) => {
	const dupes = [];
	const hash  = {};
	files.forEach( file => {
		const fileNumber = file.split('__')[0];
		hash[fileNumber] = (hash[fileNumber] + 1) || 1;
		if (hash[fileNumber] > 1) {
			dupes.push(fileNumber)
		}
	});
	console.log(dupes);
});
