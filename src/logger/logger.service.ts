import { stat, writeFile, rename, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import {
  LoggerService as ILoggerService,
  Injectable,
  LogLevel,
} from '@nestjs/common';
import { LOG_LEVEL, LOG_SIZE } from 'src/constants';

@Injectable()
export class LoggerService implements ILoggerService {
  private readonly level: number;
  private readonly size: number;
  private readonly dir: string;

  constructor() {
    this.level = LOG_LEVEL;
    this.size = LOG_SIZE;
    this.dir = join(`./logs/`);
    this.makeLogDir(this.dir);
  }

  log(data: any) {
    this.write('log', data);
  }

  error(data: any) {
    this.write('error', data);
  }

  warn(data: any) {
    this.write('warn', data);
  }

  debug?(data: any) {
    this.write('debug', data);
  }

  verbose?(data: any) {
    this.write('verbose', data);
  }

  private async write(type: LogLevel, data) {
    const [level, color] = this.useLevelColor(type);

    if (level > this.level) {
      return;
    }

    const pid = process.pid;
    const datetime = new Date(Date.now()).toLocaleString();
    const message = `[Nest] ${pid}  - ${datetime}     ${data}`;

    this.printToConsole(color, message);

    if (type === 'error') {
      await this.writeToFile('errors', message);
    } else {
      await this.writeToFile('logs', message);
    }
  }

  private async writeToFile(
    name: 'errors' | 'logs',
    data: string,
  ): Promise<void> {
    const file = `${name}.log`;
    const filename = join(this.dir, file);

    try {
      const stats = await stat(filename);

      if (!stats.isFile || stats.size >= this.size) {
        const archiveFilename = this.getArchiveFilename(name);
        await rename(filename, archiveFilename);
      }
    } catch {
    } finally {
      await writeFile(filename, `${data}\n`, { flag: 'a' });
    }
  }

  private async makeLogDir(name: string) {
    try {
      await mkdir(name, { recursive: true });
    } catch (error) {
      console.error(error);
    }
  }

  private printToConsole(color: string, data: string): void {
    console.log(`${color}${data}\x1b[0m`);
  }

  private getArchiveFilename(name: string) {
    const datetime = new Date(Date.now())
      .toISOString()
      .replace(/[:\.]+/g, '-')
      .replace(/[T]+/g, '_');

    return join(`./logs/${name}_${datetime}.log`);
  }

  private useLevelColor(type: LogLevel): [number, string] {
    switch (type) {
      case 'error':
        return [1, '\x1b[31m'];
      case 'warn':
        return [2, '\x1b[33m'];
      case 'log':
        return [3, '\x1b[32m'];
      case 'verbose':
        return [4, '\x1b[36m'];
      case 'debug':
        return [5, '\x1b[37m'];
      default:
        return [0, '\x1b[37m'];
    }
  }
}
