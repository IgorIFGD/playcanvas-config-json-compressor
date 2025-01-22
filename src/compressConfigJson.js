const fs = require('fs');
const path = require('path');
const pako = require('pako');

function compressConfigJson(projectDirectory) {
    const filePath = path.join(projectDirectory, 'config.json');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        console.error('Config file does not exist, please make sure the playcanvas projects is unzipped into "./projects" directory!', filePath);
        return;
    }

    // Check if the file has a .json extension
    if (path.extname(filePath).toLowerCase() !== '.json') {
        console.error('The file is not a JSON file:', filePath);
        return;
    }

    console.log('Compressing config.json, please be patient, this may take a while...');
    const startTimestamp = performance.now();

    try {
        // Read the original JSON file
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(jsonData);

        // Convert JSON to string and compress it using Pako
        const compressedData = pako.deflate(JSON.stringify(parsedData), { to: 'string' });

        // Determine the new file name with ".pack" extension
        const compressedFileName = `${filePath}.pack`;

        console.log(`Output file path ${compressedFileName}`);

        // Save the compressed data to the new file
        fs.writeFileSync(compressedFileName, compressedData, 'utf8');

        console.log(`Compression has been finished in ${Math.floor(performance.now() - startTimestamp)}ms`);
        console.log('Compressed config file saved as:', compressedFileName);

        removeFile(filePath);

    } catch (error) {
        console.error('An error occurred during compression:', error.message);
    }
}

function removeFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error removing the file:', err.message);
        } else {
            console.log('File successfully removed:', filePath);
        }
    });
}


module.exports = {compressConfigJson};