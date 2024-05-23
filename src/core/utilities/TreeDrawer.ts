import chalk from 'chalk';
import {stringifyToken} from '@/utils/logging-utils.js';
import type {Class, Token} from '@/utils/types.js';
import type {Logger} from '../generic/Logger.js';
import type {AbstractModule} from '../module/AbstractModule.js';

export interface TreeDrawerOptions {
  indent: number;
  logger: Logger;
}

export class TreeDrawer {
  public constructor(private readonly options: TreeDrawerOptions) {}

  public reportModule(moduleClass: Class<AbstractModule>): void {
    const element: string = moduleClass.name;
    const padding: string = '|   '.repeat(this.options.indent);

    if (this.options.indent === 0) {
      this.options.logger.log(chalk.cyan('└── ') + chalk.cyanBright(element));
    } else {
      this.options.logger.log(chalk.cyan(padding + '├── ') + chalk.cyanBright(element));
    }
  }

  public reportError(error: Error): void {
    const padding: string = '|   '.repeat(this.options.indent);

    this.options.logger.log(chalk.red(padding + '|'));
    this.options.logger.log(chalk.red(padding + '└── ' + error.message));
  }

  public reportProvider(token: Token, timing?: string): void {
    const element: string = stringifyToken(token);
    const padding: string = '|   '.repeat(this.options.indent);

    this.options.logger.log(
      chalk.cyan(padding) +
        chalk.green('├── ') +
        chalk.greenBright(element) +
        chalk.green(timing ? ` (${timing})` : ''),
    );
  }

  public reportModuleTiming(timing: string): void {
    const padding: string = '|   '.repeat(this.options.indent);

    this.options.logger.log(chalk.cyan(padding + `└── ${timing}`));
    this.options.logger.log(chalk.cyan(padding));
  }

  public createBranch(): TreeDrawer {
    return new TreeDrawer({
      ...this.options,
      indent: this.options.indent + 1,
    });
  }
}
