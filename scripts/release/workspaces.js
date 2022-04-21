
const fs = require('fs');
const glob = require('glob');
const path = require('path');


function readJSON(filePath) {
  const str = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(str);
}

function getWorkspaceList(workspacePath) {
  // eslint-disable-next-line no-param-reassign
  workspacePath = path.resolve(workspacePath);
  const packagePath = path.resolve(workspacePath, './package.json');

  const packageObj = readJSON(packagePath);

  let result = [{
    path: workspacePath, // packages/queue
    packagePath, // packages/queue/package.json
    packageObj, // {}
  }];

  if (!packageObj.workspaces) {
    return result;
  }

  packageObj.workspaces.forEach((pattern) => {
    const workspacePathList = glob.sync(pattern, {
      cwd: workspacePath,
    });

    // eslint-disable-next-line no-shadow
    workspacePathList.forEach((workspacePath) => {
      result = result.concat(getWorkspaceList(workspacePath));
    });
  });

  return result;
}

function getPackage(projectPath, packageName) {
  const packageList = getWorkspaceList(projectPath);

  let package = null;
  packageList.forEach((item) => {
    if (item.packageObj.name === packageName) {
      package = item;
    }
  });

  return package;
}


module.exports = { getPackage };
