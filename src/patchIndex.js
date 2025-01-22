const fs = require('fs');
const path = require('path');



function modifyIndexHtml(htmlFilePath) {
    // Check if the file exists
    if (!fs.existsSync(htmlFilePath)) {
        console.error('File index.html does not exist:', htmlFilePath);
        return;
    }

    try {
        // Read the HTML file
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        let updatedHtmlContent;

        /* special logic for projects with Famobi GameInterface */
        if(htmlContent.includes('GameInterface.init')) {
            if(htmlContent.includes('"__start__.js"') && !htmlContent.includes('pako.min.js')) {
                updatedHtmlContent = htmlContent.replace(
                    '"__start__.js"',
                    '"pako.min.js", "__start__.js"'
                );
            } else {
                throw new Error('[ERROR] ❌ __start__.js: file reference not found')
            }

            if(htmlContent.includes('"playcanvas-stable.min.js"') && !htmlContent.includes('"playcanvas-config-loader-patch.js"')) {
                updatedHtmlContent = updatedHtmlContent.replace(
                    '"playcanvas-stable.min.js"',
                    '"playcanvas-stable.min.js", "playcanvas-config-loader-patch.js"'
                );
            } else {
                throw new Error('[ERROR] ❌ playcanvas-stable.min.js: file reference not found')
            }
        } else {
            if(htmlContent.includes(`<script src="__start__.js"></script>`) && !htmlContent.includes('pako.min.js')) {
                updatedHtmlContent = htmlContent.replace(
                    `<script src="__start__.js"></script>`,
                    `<script src="__start__.js"></script>\n<script src="pako.min.js"></script>`
                );
            } else {
                throw new Error('[ERROR] ❌ __start__.js: file reference not found')
            }

            if(htmlContent.includes(`<script src="playcanvas-stable.min.js"></script>`) && !htmlContent.includes('"playcanvas-config-loader-patch.js"')) {
                updatedHtmlContent = updatedHtmlContent.replace(
                    `<script src="playcanvas-stable.min.js"></script>`,
                    `<script src="playcanvas-stable.min.js"></script>\n<script src="playcanvas-config-loader-patch.js"></script>`
                );
            } else {
                throw new Error('[ERROR] ❌ playcanvas-stable.min.js: file reference not found');
            }
        }


        // Save the modified HTML content back to the file
        const outputFilePath = path.join(
            path.dirname(htmlFilePath),
            path.basename(htmlFilePath)
        );
        fs.writeFileSync(outputFilePath, updatedHtmlContent, 'utf8');

        console.log('index.html file is successfully patched and saved as:', outputFilePath);

    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

function patchIndex(projectDirectory) {
    console.log('Patching index.html...');
    const filePath = path.join(projectDirectory, 'index.html');
    modifyIndexHtml(filePath);
}

module.exports = {patchIndex};