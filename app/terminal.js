function createTerminalApp(container) {
  container.innerHTML = `
    <div class="terminal-header">
      <h2>Terminal</h2>
    </div>
    <div id="terminal-output" class="terminal-output"></div>
    <input id="terminal-input" class="terminal-input" type="text" placeholder="Type command..." autofocus />
  `;

  const inputField = document.getElementById('terminal-input');
  inputField.addEventListener('keydown', handleCommand);

  function handleCommand(event) {
    if (event.key === 'Enter') {
      const command = inputField.value.trim();
      if (command) {
        executeCommand(command);
        inputField.value = '';
      }
    }
  }

  function executeCommand(command) {
    const outputContainer = document.getElementById('terminal-output');
    let output = '';

    switch (command.toLowerCase()) {
      case 'ls':
        output = 'file1.txt\nfile2.txt\nnote1\nnote2';
        break;
      case 'clear':
        outputContainer.innerHTML = '';
        return;
      case 'help':
        output = 'Available commands: ls, clear, help';
        break;
      default:
        output = `Command not found: ${command}`;
    }

    outputContainer.innerHTML += `<div class="terminal-line">${output}</div>`;
    outputContainer.scrollTop = outputContainer.scrollHeight;
  }
}
