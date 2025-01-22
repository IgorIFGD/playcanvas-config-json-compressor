const {compressConfigJson} = require("./src/compressConfigJson");
const {addPakoModule, addPlaycanvasLoaderPatch} = require("./src/copyModules");
const {patchIndex} = require("./src/patchIndex");

(async function () {
    let projectPath = "./projects/";

    // Get command-line arguments
    const args = process.argv.slice(2);

    // Parse the arguments to find the directory parameter
    const directoryArg = args.find(arg => arg.startsWith('--directory='));

    // Extract the directory value
    const directoryName = directoryArg ? directoryArg.split('=')[1] : null;
    if (directoryName) {
        console.log('Project directory provided:', directoryName);
        projectPath = directoryName;
        if (!projectPath.endsWith('/')) projectPath = projectPath + '/';
    } else {
        console.log('No directory parameter provided, using "projects/" as default playcanvas project root');
        projectPath = './projects/';
    }

    try {
        compressConfigJson(projectPath);
        await addPakoModule(projectPath);
        await addPlaycanvasLoaderPatch(projectPath);
        patchIndex(projectPath);

        console.log('[Status] ✅ All done, your patched project is here: ' + projectPath);

    } catch (err) {
        console.log('[Error] ❌ Something went wrong, check the error message below :(');
        console.error(err);
    }
})();



