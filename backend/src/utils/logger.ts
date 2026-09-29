export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export class Logger {
  private static formatMessage(level: LogLevel, message: string, context?: any, correlationId?: string): string {
    const timestamp = new Date().toISOString();
    const corrStr = correlationId ? ` [corr:${correlationId}]` : '';
    const ctxStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}]${corrStr} ${message}${ctxStr}`;
  }

  static info(message: string, context?: any, correlationId?: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message, context, correlationId));
  }

  static warn(message: string, context?: any, correlationId?: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, context, correlationId));
  }

  static error(message: string, error?: any, correlationId?: string): void {
    const errorDetails = error instanceof Error 
      ? { message: error.message, stack: error.stack } 
      : error;
    console.error(this.formatMessage(LogLevel.ERROR, message, errorDetails, correlationId));
  }

  static debug(message: string, context?: any, correlationId?: string): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context, correlationId));
    }
  }
}
