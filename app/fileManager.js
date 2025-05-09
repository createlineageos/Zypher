function createFileManagerApp(container) {
  container.innerHTML = `
    <div class="file-manager-header">
      <h2>File Manager</h2>
      <button id="new-file">New File</button>
    </div>
    <div id="file-list" class="file-list"></div>
  `;

  const newFileButton = document.getElementById('new-file');
  newFileButton.addEventListener('click', () => createNewFile());

  loadFiles();

  function createNewFile() {
    const fileName = prompt("Enter file name:");

    if (fileName) {
      saveFile(fileName, '');
      loadFiles();
    }
  }

  function loadFiles() {
    const fileListContainer = document.getElementById('file-list');
    fileListContainer.innerHTML = '';

    const transaction = db.transaction(["files"], "readonly");
    const objectStore = transaction.objectStore("files");
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      const files = event.target.result;
      if (files.length > 0) {
        files.forEach((file) => {
          const fileElement = document.createElement('div');
          fileElement.classList.add('file');
          fileElement.innerHTML = `
            <div class="file-name">${file.name}</div>
            <button class="delete-file" data-id="${file.id}">Delete</button>
          `;

          const deleteButton = fileElement.querySelector('.delete-file');
          deleteButton.addEventListener('click', () => deleteFile(file.id));

          fileListContainer.appendChild(fileElement);
        });
      } else {
        fileListContainer.innerHTML = '<p>No files available</p>';
      }
    };
  }

  function deleteFile(fileId) {
    const transaction = db.transaction(["files"], "readwrite");
    const objectStore = transaction.objectStore("files");
    const request = objectStore.delete(fileId);

    request.onsuccess = () => {
      loadFiles();
    };

    request.onerror = (event) => {
      console.error("Error deleting file:", event);
    };
  }
}
