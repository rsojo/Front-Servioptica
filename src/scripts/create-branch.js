const { execSync } = require('child_process');
const readline = require('readline');

// Configurar la interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Preguntar al usuario por el nombre de la nueva rama
rl.question('Enter the name of the new branch: ', (branchName) => {
  try {
    // Switch to the dev branch
    execSync('git checkout dev');
    console.log('Changed to dev branch');

    // Pull the latest changes from origin/dev
    console.log('Pulling the latest changes from origin/dev...');
    execSync('git pull origin dev --no-rebase');
    console.log('Local dev branch is up-to-date with origin/dev');

    // Create the new branch from the updated dev
    execSync(`git checkout -b ${branchName}`);
    console.log(`New branch '${branchName}' created from the updated dev`);

  } catch (error) {
    console.error('Error executing commands:', error.message);
  }

  rl.close();
});