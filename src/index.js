// @flow

const fs = require('fs');
const marked = require('marked');

// Local.
const markup = require('./markup');

const main = (inputDir: string = 'entries', outputDir: string = 'html'): void => {
    type Posting = {
        path: string,
        // First line of the file.
        title: string,
        text: string,
    }

    const cleanDir = (dir: string): void => {
        fs.readdirSync(dir).forEach((path) => {
            fs.unlinkSync(`${dir}/${path}`)
        });
    };

    const writeToFS = (posting: Posting): void => {
        fs.appendFileSync(
            posting.path
            , HTML(posting)
        )
    };
   
    // Posting with HTML.
    const HTML = (posting: Posting): string => {
        return `${ markup.htmlBefore(posting.title, markup.style) }
        ${ posting.text }
        ${ markup.htmlAfter }`;
    };
    
    const title = text => text.split("\n")[0].replace(/#\s/, '');
    const content = text => marked(text);
    const replaceExtension = filename => `./${outputDir}/${filename.replace(/\.md/, '.html')}`;
    
    cleanDir(outputDir);
    
    fs.readdirSync(inputDir)
    .filter(filename => filename.match(/\.md/))
    .forEach(filename => {
        const text = fs.readFileSync(`./${inputDir}/${filename}`, 'utf8');
        const outputFilename = replaceExtension(filename);
        writeToFS({
            path: outputFilename
            , title: title(text)
            , text: content(text)
        })
    })
};

module.exports = { main };
