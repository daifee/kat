
const fs = require('fs');
const cliOptions = require('./cli-options');
const { getPackage } = require('./workspaces');
const { extractPackageNameAndVersion } = require('./utils');


function writeJSON(filePath, obj) {
  const str = JSON.stringify(obj, null, 2);
  fs.writeFileSync(filePath, str);
}

function updatePackageVersion(packagePath, packageObj, newVersion) {
  const newObj = {
    ...packageObj,
    version: newVersion,
  };
  writeJSON(packagePath, newObj);
}

function exec(options) {
  const meta = extractPackageNameAndVersion(options['release-tag']);
  const workspace = getPackage(options.root, meta.name);

  if (!workspace) {
    throw new Error(`不存在 package: ${meta.name}`);
  }

  updatePackageVersion(
    workspace.packagePath,
    workspace.packageObj,
    meta.version,
  );
}

const opts = cliOptions();


exec(opts);
