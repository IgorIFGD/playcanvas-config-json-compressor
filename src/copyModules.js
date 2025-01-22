const fs = require('fs');
const path = require('path');

async function copyFile(sourceFilePath, destinationFolderPath) {
    return new Promise((resolve, reject) => {
        // Ensure the destination folder exists
        if (!fs.existsSync(destinationFolderPath)) {
            fs.mkdirSync(destinationFolderPath, { recursive: true });
        }

        // Get the file name from the source file path
        const fileName = path.basename(sourceFilePath);

        // Define the destination file path
        const destinationFilePath = path.join(destinationFolderPath, fileName);

        // Copy the file
        fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
            if (err) {
                console.error('Error copying the file:', err.message);
                reject(err);
            } else {
                console.log('File successfully copied to:', destinationFilePath);
                resolve();
            }
        });
    })
}


async function copyModules(projectFolderName) {
    console.log('Copying pako.js module into a projects folder...')

    const sourcePath = path.join(__dirname, '../assets', 'pako.min.js');
    const destinationPath = projectFolderName;

    await copyFile(sourcePath, destinationPath);
}

async function addPlaycanvasLoaderPatch(projectFolderName) {
    console.log('Copying playcanvas-config-loader-patch.js module into a projects folder...')

    const sourcePath = path.join(__dirname, '../assets', 'playcanvas-config-loader-patch.js');
    const destinationPath = projectFolderName;

    await copyFile(sourcePath, destinationPath);
}



module.exports = {addPakoModule: copyModules, addPlaycanvasLoaderPatch};