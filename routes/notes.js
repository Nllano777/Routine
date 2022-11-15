const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

const dbPath = './db/notes-db.json';

notes.get('/', (req, res) => {
    readFromFile(dbPath).then((allNotes) => res.json(JSON.parse(allNotes)));
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

        readAndAppend(newNote, dbPath);
        res.json('Note added successfully');
    } else {
        res.error('Cannot add empty note');
    }
});

notes.delete('/:id', (req, res) => {
    readFromFile(dbPath)
        .then((allNotes) => {
            var id = req.params.id;
            allNotes = JSON.parse(allNotes);
            for (var i = 0; i < allNotes.length; i++) {
                if (allNotes[i].id === id) {
                    allNotes.splice(i, 1);
                }
            }
            writeToFile(dbPath, allNotes);
            res.json('Note deleted');
        })
        .catch(() => res.error('Unable to delete note'));
});

module.exports = notes;