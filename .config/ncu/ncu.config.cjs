/**
 * @typedef ExceptionsMap
 * @type {object}
 * @property {string[]} major
 * @property {string[]} minor
 * @property {string[]} patch
 */

/**
 * @type {ExceptionsMap}
 */
const exceptions = {
  major: [],
  minor: ['@types/node'],
  patch: [],
};

/**
 * @type {import('npm-check-updates').RunOptions}
 */
const config = {
  packageManager: 'npm',
  target(packageName, _semver)  {
    for(const level of ['patch', 'minor', 'major']) {
      if(exceptions[level].includes(packageName))
        return level;
    }

    return 'latest';
  },
};

module.exports = config;
