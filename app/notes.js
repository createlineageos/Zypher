function createNotesApp(container) {
  container.innerHTML = `
    <div class="app-header">
      <h2>Notes</h2>
      <button id="add-note">+ Add Note</button>
    </div>
    <div id="notes-list" class="notes-list"></div>
  `;

  const addNoteButton = document.getElementById('add-note');
  addNoteButton.addEventListener('click', () => createNewNote());

  loadNotes();

  function createNewNote() {
    const noteTitle = prompt("Enter note title:");
    const noteContent = prompt("Enter note content:");

    if (noteTitle && noteContent) {
      saveNote(noteTitle, noteContent);
    }
  }

  function saveNote(title, content) {
    saveFile(title, content);
    loadNotes();
  }

  function loadNotes() {
    const notesListContainer = document.getElementById('notes-list');
    notesListContainer.innerHTML = '';

    const transaction = db.transaction(["files"], "readonly");
    const objectStore = transaction.objectStore("files");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const notes = event.target.result.filter(file => file.name);
      if (notes.length > 0) {
        notes.forEach((note) => {
          const noteElement = document.createElement('div');
          noteElement.classList.add('note');
          noteElement.innerHTML = `
            <div class="note-title">${note.name}</div>
            <div class="note-content">${note.content.slice(0, 100)}...</div>
            <button class="delete-note" data-id="${note.id}">Delete</button>
          `;

          const deleteButton = noteElement.querySelector('.delete-note');
          deleteButton.addEventListener('click', () => deleteNote(note.id));

          notesListContainer.appendChild(noteElement);
        });
      } else {
        notesListContainer.innerHTML = '<p>No notes available</p>';
      }
    };
  }

  function deleteNote(noteId) {
    const transaction = db.transaction(["files"], "readwrite");
    const objectStore = transaction.objectStore("files");
    const request = objectStore.delete(noteId);

    request.onsuccess = () => {
      loadNotes();
    };

    request.onerror = (event) => {
      console.error("Error deleting note:", event);
    };
  }
}
