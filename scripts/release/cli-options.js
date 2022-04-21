
const minimist = require('minimist');
// const { execSync } = require('child_process');


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

module.exports = cliOptions;
