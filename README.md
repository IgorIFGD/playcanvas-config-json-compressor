## Playcanvas config.json file minifier 

Got tired of huge size of `config.json` file in your playcanvas build? This package will help you to get rid of it!
The result is achieved by precompressing a `config.json` into a binary form `config.json.pack` using some sort of LZMA-compression (thanks to [pako](https://github.com/nodeca/pako)) and minor patching of playcanvas engine code (especially `pc.AppBase.prototype.configure` method is overwritten)
Should work with any project exported from Playcanvas editor after April 2022 (but may also work with earlier projects, give it a try).

Caution: the original `config.json` file is deleted during the conversion, so make sure you have backed it up before starting!


## Usage
1. Clone this repository to your PC.
2. Create a MY_AWESOME_GAME directory within `projects`, so the path should look like `projects/MY_AWESOME_GAME`. Yes, you can use any name you like for this directory instead of MY_AWESOME_GAME :) 
3. Open a terminal window from the root of this package (where the index.js is) and run following commands sequence:

```bash

# First of all, Install dependencies
$ npm install

# Start the conversion
$ npm start -- --directory=projects/MY_AWESOME_GAME

# Alternatively, you can place all your files directly into `projects` folder and run simple `npm start`:
$ npm start

```
4. Your awesome game is patched, enjoy the result!
    
