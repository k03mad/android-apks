import chalk from 'chalk';

export const stringStyle = chalk.yellow;

/**
 * @param {string} text
 * @returns {string}
 */
export const linkStyle = text => chalk.blue(chalk.underline(text));

/**
 * @param {string} text
 * @returns {string}
 */
export const headerStyle = text => chalk.magenta(chalk.bold(chalk.bgBlackBright(` ${text} `)));
