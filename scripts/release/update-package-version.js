
const fs = require('fs');
const cliOptions = require('./cli-options');
// const { execSync } = require('child_process');
const { getPackage } = require('./workspaces');


// function run(command, opts) {
//   try {
//     const stdout = execSync(command, opts);

//     console.log(stdout.toString());
//   } catch (err) {
//     console.log(err.stdout.toString());
//     throw err;
//   }
// }


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

// function gitCommit(opts) {
//   const tag = `release-${opts.name}-${opts.version}`;

//   run('git config user.name "robot"');
//   run('git config user.email "robot@daifee.com"');
//   run('git add --all');
//   run(`git commit -m "${tag}"`);
//   run(`git tag ${tag}`);
//   run('git push --tags');
// }

function exec(opts) {
  const workspace = getPackage(opts.root, opts.name);

  if (!workspace) {
    throw new Error(`不存在 package: ${opts.name}`);
  }

  updatePackageVersion(
    workspace.packagePath,
    workspace.packageObj,
    opts.version,
  );

  // // commit
  // gitCommit(opts);
}

const options = cliOptions();
exec(options);
