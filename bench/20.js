const {execSync} = require('child_process')

for (let i = 0; i < 20; i++) {
  execSync('node ./optimized.js', {stdio: 'inherit', cwd: __dirname})
}
