const { prompt } = require('inquirer');
const { mkdir, writeFile } = require('fs');
const { join } = require('path');
const { exec } = require('child_process');
const source = require('./utils/source.json');

prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Bot name:'
    },

    {
        type: 'input',
        name: 'prefix',
        message: 'Bot prefix:'
    },

    {
        type: 'password',
        name: 'token',
        message: 'Bot token:'
    },

    {
        type: 'list',
        name: 'library',
        message: 'Bot library:',
        choices: [
            'discord.js',
            'eris'
        ]
    }
]).then(async ({ name, prefix, token, library }) => {
    const root = name.toLowerCase();

    await mkdir(root, { recursive: true }, err => {
        if (err) throw err;
    });

    writeFile(join(root, '.env'), 'TOKEN=' + token + '\nPREFIX=' + prefix, { recursive: true }, err => { 
        if (err) throw err;
    });

    writeFile(join(root, '.gitignore'), 'node_modules/\n.env', { recursive: true }, err => {
        if (err) throw err;
    });

    writeFile(join(root, 'index.js'), source[library], { recursive: true }, err => {
        if (err) throw err;
        else exec('cd ' + root + ' && npm init -y && npm install dotenv ' + library, err => {
            if (err) throw err;
        });
    });
});
