const prompt = require('prompt-sync')();
const files = require('./utils/sourceCode.json');
const fs = require('fs');
const chalk = require('chalk');
const child_process = require('child_process');

const Bot = () => {
    const botName = prompt(chalk.magenta('[Name] Bot name: ')) || 'Untitled';
    const botPrefix = prompt(chalk.magenta('[Prefix] Bot prefix: ')) || '!';
    const botToken = prompt(chalk.magenta('[Token] Bot token: '));

    if (!botToken) throw new Error('Invalid bot token!');

    const botLibrary = prompt(chalk.magenta('[Library] Bot library[discord.js, eris]: ')) || 'discord.js';

    if (!['eris', 'discord.js'].includes(botLibrary)) throw new Error('Invalid bot library!');

    files['.env'].code = `TOKEN=${botToken}\nPREFIX=${botPrefix}`;

    createSourceBot(botName, botLibrary)
}

function createSourceBot(botName, botLibrary) {
    const root = botName + '-bot'

    fs.mkdir(root, { recursive: true }, (err) => {
        if (err) throw err;
    });

    fs.writeFile(root + files['.env'].path + '.env', files['.env'].code, { recursive: true }, (err) => { 
        if (err) throw err;
    });

    fs.writeFile(root + files['index.js'].path + 'index.js', files['index.js'].code[botLibrary], (err) => {
        if (err) throw err;
        else child_process.exec('cd ' + root + ' && npm init -y && npm install dotenv ' + botLibrary, function (err, out) {
            if (err) throw 'Error when trying to instal dependencies: ' + err.message;
 
            console.log(chalk.yellow('Dependencies installed...'));
        });
    });

    console.log(chalk.green('The bot ' + botName + ' was created.'));
}

Bot();