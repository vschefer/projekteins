const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

class Note {
  constructor(noteData) {
    this.status = 'active';
    this.title = noteData.title;
    this.content = noteData.content;
    this.importance = noteData.importance;
    this.date_due = noteData.date_due;
    this.date = new Date().toISOString();
  }
}

function addNote(noteData) {
  let note = new Note(noteData);
  db.insert(note);
};

function getNotes(callback) {
  db.find({}, function(err, notes) {
    callback(notes);
  });
};

function getNote(noteid, callback) {
  db.findOne({ _id: noteid }, function(err, note) {
    callback(note);
  });
};

function updateNote(noteid, noteData) {
  db.update({ _id: noteid }, { $set: {
    title: noteData.title,
    content: noteData.content,
    importance: noteData.importance,
    date_due: noteData.date_due
  } }, { multi: true });
};

function deleteNote(noteid) {
  db.remove({ _id: noteid }, {});
};

module.exports = {
  all : getNotes,
  add : addNote,
  get : getNote,
  update : updateNote,
  delete : deleteNote
};
