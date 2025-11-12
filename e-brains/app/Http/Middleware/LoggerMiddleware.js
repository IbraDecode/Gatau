import winston from 'winston';
const logger = winston.createLogger({ transports: [new winston.transports.Console()] });
export function LoggerMiddleware(ctx, next) {
  logger.info(`${ctx.from?.id || 'unknown'} ${ctx.message?.text || ''}`);
  return next();
}
