import { Injectable } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class LoggerService {
  path: string;
  constructor() {
    this.__init();
  }

  private __init() {
    this.path = join(process.cwd(), 'logs');
    if (!existsSync(this.path))
      mkdirSync(this.path, { recursive: true });
  }

  log(err) {
    try {
      let d = {
        timestamp: new Date().toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        service: err.service,
        method: err.method,
        endpoint: err.endpoint,
        status: err.status,
        error: err.data?.details || 'Undefined error',
      };
      let path = join(this.path, `stderr.log`)
      let log = `[Nest]\t${d.timestamp}\t${d.method}\t${d.endpoint}\t${d.status}\t${d.error}\r`;
      appendFileSync(path, log);
    } catch (error) {
      console.error('Logging failed:', error);
    }
  }
}
