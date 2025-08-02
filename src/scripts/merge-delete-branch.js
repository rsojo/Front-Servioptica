const { execSync } = require('child_process')
const readline = require('readline')

// Función para verificar si una rama existe
function branchExists(branchName) {
  try {
    execSync(`git rev-parse --verify ${branchName}`)
    return true
  } catch (error) {
    return false
  }
}

// Configurar la interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Preguntar al usuario por el nombre de la rama que se va a mergear y eliminar
rl.question('Enter the name of the branch to merge and delete: ', (branchName) => {
  try {
    // Verificar si la rama existe
    if (!branchExists(branchName)) {
      throw new Error(`Branch "${branchName}" does not exist. Please enter a valid branch name.`)
    }

    // Verificar si estamos en la rama dev
    const currentBranch = execSync('git branch --show-current').toString().trim()
    if (currentBranch !== 'dev') {
      console.log('You are not on the dev branch. Switching to dev...');
      execSync('git checkout dev');
    }

    // Pull the latest changes from origin/dev
    console.log('Pulling the latest changes from origin/dev...')
    execSync('git pull origin dev --no-rebase')

    // Hacer merge de la rama especificada en dev
    execSync(`git merge ${branchName}`)
    console.log(`Branch '${branchName}' merged into dev`)

    // Push the updated dev branch to origin/dev
    console.log('Pushing the updated dev branch to origin/dev...')
    execSync('git push origin dev')
    console.log('dev branch pushed to origin/dev')

    // Eliminar la rama localmente
    execSync(`git branch -d ${branchName}`)
    console.log(`Branch '${branchName}' deleted locally`)

    // Eliminar la rama del repositorio remoto
    execSync(`git push origin --delete ${branchName}`)
    console.log(`Branch '${branchName}' deleted from remote`)
  } catch (error) {
    console.error('Error:', error.message)
  }

  rl.close()
})