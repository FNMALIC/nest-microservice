const fs = require("fs");
const path = require("path");
module.exports = {
  apps: fs.readdirSync(appsDir).filter(f => fs.statSync(path.join(appsDir, f)).isDirectory()).map(service => ({
    name: service,
    script: `dist/apps/${service}/main.js`,
    watch: false,
    restart_delay: 3000,
  }))
};
