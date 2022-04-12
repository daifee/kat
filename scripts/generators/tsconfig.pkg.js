/**
 * 生成 `./tsconfig.pkg.json` 文件
 */
const fs = require('fs');
const path = require('path');

const root = process.cwd();

/**
 * name 包名 `@daifee/name`
 * path 绝对路径 `/path/to/name`
 * relativePath 相对路径 `./packages/name`
 */
function getPackages(subRoot) {
  return fs.readdirSync(path.join(root, subRoot))
    .map((dir) => {
      return {
        name: `@daifee/${dir}`,
        path: path.resolve(root, subRoot, dir),
        relativePath: `./${subRoot}/${dir}`,
      };
    })
    // 过滤条件1
    .filter((item) => {
      let filteredMsg = '';
      const metaFile = path.resolve(item.path, 'package.json');

      try {
        // eslint-disable-next-line
        const meta = require(metaFile);

        if (meta.name !== item.name) {
          filteredMsg = `package.name !== "@daifee/\${dirname}": ${item.relativePath}`;
        }
      } catch (err) {
        filteredMsg = `缺少文件：${metaFile}`;
      }
      // log
      // eslint-disable-next-line
      console.warn(filteredMsg);
      return !filteredMsg;
    })
    // 过滤条件2
    .filter((item) => {
      const indexFile = path.resolve(item.path, 'src/index.ts');
      return fs.existsSync(indexFile);
    });
}

const packagesRoot = [
  ...getPackages('packages'),
];

const config = {
  include: packagesRoot.map((pkg) => {
    return `${pkg.relativePath}/src/**/*.ts`;
  }),
  compilerOptions: {
    paths: Object.fromEntries(packagesRoot.map((pkg) => {
      return [pkg.name, [`${pkg.relativePath}/src`]];
    })),
  },
};

fs.writeFileSync(
  path.resolve(root, 'tsconfig.pkg.json'),
  JSON.stringify(config, null, 2),
);
