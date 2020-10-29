const prompt = require('prompt-sync')();
const files = require('./utils/sourceCode.json');
const fs = require('fs');
const chalk = require('chalk');

const Bot = () => {
    const botName = prompt(chalk.magenta('[Name] Bot name: '));
    let botPrefix = prompt(chalk.magenta('[Prefix] Bot prefix: '));
    const botToken = prompt(chalk.magenta('[Token] Bot token: '));
    files['.env'].code = `TOKEN=${botToken}\nPREFIX=${botPrefix}`;

    if(!botPrefix) botPrefix = '!';
    if(!botName) return console.log(chalk.red('[ERR] Please, inform your bot name.'));
    if(!botToken) return console.log(chalk.red('[ERR] Please, inform TOKEN correctly.'));

    createSourceBot(botName);
}

function createSourceBot(botName) {
    const root = botName + '-';

    fs.mkdir(root, { recursive: true }, (err) => {
        if (err) throw err;
    });

    for (var file = 0; file < files.length; file++) {
        fs.mkdir(root + files[file].path, { recursive: true }, (err) => { 
            if (err) throw err;
        });

        fs.writeFile(root + files[file].path + file, files[file].code, (err) => {
            if (err) throw err;
        });
    }
    
    console.log(chalk.green(`The bot ${botName} was created.`));
}

Bot();
