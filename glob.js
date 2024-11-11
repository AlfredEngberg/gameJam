import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
import * as fs from 'node:fs';

function globTest() {
    const images = globSync(['**/*.{png,jpg,jpeg,gif,svg}'])
    const sounds = globSync(['**/*.{wav,ogg}'])
    return { images, sounds };
}
let files = globTest();
fs.writeFile('files.json', JSON.stringify(files), (err) => {
  if (err) throw err;
  console.log('Data written to file');
});
console.log("returned files", JSON.stringify(files));