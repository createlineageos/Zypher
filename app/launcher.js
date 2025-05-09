function launchApp(appName) {
  const container = document.getElementById('app-container');
  container.innerHTML = '';

  switch(appName) {
    case 'notes':
      createNotesApp(container);
      break;
    case 'files':
      createFileApp(container);
      break;
    case 'terminal':
      createTerminal(container);
      break;
    case 'browser':
      createBrowserApp(container);
      break;
    default:
      container.innerHTML = '<p>App not found!</p>';
  }
}
