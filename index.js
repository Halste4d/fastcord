const prompt = require('prompt-sync')();
const files = require('./utils/sourceCode.json');
const fs = require('fs');
const chalk = require('chalk')

const Bot = () => {
    const botName = prompt(chalk.magenta('[Name] Bot name: ')) || 'Untitled';
    let botPrefix = prompt(chalk.magenta('[Prefix] Bot prefix: ')) || '!';
    const botToken = prompt(chalk.magenta('[Token] Bot token: ')) || 'NoToken';
    files['.env'].code = `TOKEN=${botToken}\nPREFIX=${botPrefix}`;
    
    createSourceBot(botName)
}

function createSourceBot(botName) {
    const root = `${botName}-bot`

    fs.mkdir(root, { recursive: true }, (err) => {
        if (err) throw err;
    });

    for(file in files) {
        fs.mkdir(root + files[file].path, { recursive: true }, (err) => { 
            if (err) throw err;
        });

        fs.writeFile(root + files[file].path + file, files[file].code, (err) => {
            if (err) throw err;
        });
    }
    
    console.log(chalk.green('The bot ' + botName + ' was created.'))
}

Bot()
