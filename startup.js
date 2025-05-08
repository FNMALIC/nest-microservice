// start-all.mjs
const fs = require('fs')
const cp = require('child_process')

const appsDir = './apps';

const folders = fs.readdirSync(appsDir, {withFileTypes: true});
const services = folders.filter(dirent => dirent.isDirectory()).map(dir => dir.name);


for (const service of services) {
  console.log(`🔄 Starting ${service}.`);
  const child = cp.spawn('pnpm', ['nest', 'start', service, '--watch'], {
    stdio: 'inherit',
    shell: true
  });

  child.on('close', code => {
    if (code !== 0) {
      console.error(`❌ ${service} exited with code ${code}`);
    }
  });
}
