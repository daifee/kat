/**
 * 发布新版本
 * 参数：
 * - package
 * - version
 * 任务：
 * - 更新版本信息
 * - commit, tag
 * - publish
 */
const fs = require('fs');
const minimist = require('minimist');
const glob = require('glob');
const path = require('path');


/**
 * 命令行参数
 *
 * @returns {object}
 * @property name {string} (package.json).name
 * @property version {string} (package.json).version
 * @property root {string} 项目根目录
 */
function cliOptions() {
  const argv = minimist(process.argv.slice(2));
  if (!argv.root) {
    argv.root = process.cwd();
  }

  return argv;
}

function readJSON(filePath) {
  const str = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(str);
}

function writeJSON(filePath, obj) {
  const str = JSON.stringify(obj, null, 2);
  fs.writeFileSync(filePath, str);
}

function getWorkspaceList(workspacePath) {
  // eslint-disable-next-line no-param-reassign
  workspacePath = path.resolve(workspacePath);
  const packagePath = path.resolve(workspacePath, './package.json');

  const packageObj = readJSON(packagePath);

  let result = [{
    path: workspacePath,
    packagePath,
    packageObj,
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


function exec(opts) {
  const workspace = getPackage(opts.root, opts.name);

  if (!workspace) {
    throw new Error(`不存在 package: ${opts.name}`);
  }
  // update
  workspace.packageObj.version = opts.version;
  writeJSON(workspace.packagePath, workspace.packageObj);
}

const options = cliOptions();
exec(options);
