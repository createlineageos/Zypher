let db;

const openDatabase = () => {
  const request = indexedDB.open("zypherosDB", 1);

  request.onerror = (event) => {
    console.error("Error opening DB:", event);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database opened successfully.");
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: true });
    console.log("Database upgrade completed.");
  };
};

const saveFile = (name, content) => {
  if (!db) {
    console.log("Database not ready!");
