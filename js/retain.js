$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                created: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        saveNotes: function() {
            var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(model.getAllNotes()));
            console.log(url);
            window.open(url, '_blank');
            window.focus();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            var saveNoteForm = $('#save-note-form');
            saveNoteForm.submit(function(e){
                octopus.saveNotes();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content +
                        '<span class="note-date">' +
                        new Date(note.created).toString() +
                        '</span>' +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});