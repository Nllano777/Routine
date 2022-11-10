const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('db/notes-db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    if (req.body) {
        console.log(req.body);
        const { title, text } = req.body;
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, 'db/notes-db.json');
        res.json('Note added successfully');
    } else {
        res.error('Cannot add empty note');
    }
});

module.exports = notes;