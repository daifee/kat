

const { execSync } = require('child_process');
const cliOptions = require('./cli-options');
const { getPackage } = require('./workspaces');
const { extractPackageNameAndVersion } = require('./utils');

const opts = cliOptions();
const meta = extractPackageNameAndVersion(opts['release-tag']);

const workspace = getPackage(opts.root, meta.name);

if (workspace) {
  throw new Error(`不存在 package: ${meta['release-tag']}`);
}

function run(command, options) {
  try {
    const stdout = execSync(command, options);
    console.log(stdout.toString());
  } catch (err) {
    console.log(err.stdout.toString());
    throw err;
  }
}

run('yarn npm publish', {
  cwd: workspace.path,
});
