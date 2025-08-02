const { execSync } = require('child_process');
const readline = require('readline');

// Función para verificar si una rama existe
function branchExists(branchName) {
  try {
    execSync(`git rev-parse --verify ${branchName}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Configurar la interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Preguntar al usuario por el nombre de la rama que se va a actualizar
rl.question('Enter the name of the branch you want to update from dev: ', (branchName) => {
  try {
    // Verificar si la rama existe
    if (!branchExists(branchName)) {
      throw new Error(`Branch "${branchName}" does not exist. Please enter a valid branch name.`);
    }

    // Cambiar a la rama especificada
    execSync(`git checkout ${branchName}`);
    console.log(`Switched to branch '${branchName}'`);

    // Hacer pull de los últimos cambios en dev
    console.log('Merging latest changes from dev into the branch...');
    execSync('git fetch origin dev');
    execSync('git merge origin/dev');

    console.log(`Branch '${branchName}' updated with changes from dev`);

  } catch (error) {
    console.error('Error:', error.message);
  }

  rl.close();
});