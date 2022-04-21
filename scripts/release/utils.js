

function extractPackageNameAndVersion(gitTag) {
  const reg = /^release-(.+)@([^@]+)/;
  const matches = reg.exec(gitTag);

  return {
    name: matches[1],
    version: matches[2],
  };
}

module.exports = {
  extractPackageNameAndVersion,
};
