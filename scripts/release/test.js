

const { execFileSync } = require('child_process');
const cliOptions = require('./cli-options');
const { getPackage } = require('./workspaces');
const { extractPackageNameAndVersion } = require('./utils');

const opts = cliOptions();
const meta = extractPackageNameAndVersion(opts['release-tag']);

const workspace = getPackage(opts.root, meta.name);


if (!workspace) {
  throw new Error(`不存在 package: ${meta['release-tag']}`);
}

const stdout = execFileSync('./scripts/test.sh', {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PACKAGE: workspace.path.replace(/^packages\//, ''),
  },
  encoding: 'utf-8',
});


console.log(stdout);
