

const { execSync } = require('child_process');
const path = require('path');

try {
  const std = execSync('yarn npm publish', {
    cwd: path.resolve(process.cwd(), './packages/queue'),
  });
  console.log(std.toString());
} catch (err) {
  console.log(err.stdout.toString());
  throw err;
}
