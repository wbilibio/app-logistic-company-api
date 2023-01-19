import Redis from 'ioredis';
import { ICacheRepository } from './interfaces';

type RedisConfig = {
  host: string;
  port?: string;
  password?: string;
  timeout?: string;
  maxRetries?: string;
};

export class RedisCacheRepository<T = any> extends ICacheRepository<T> {
  private static _client: Redis;

  public static connect(config: RedisConfig): void {
    if (RedisCacheRepository._client) {
      console.log('RedisCacheRepository already connected');
      return;
    }

    try {
      RedisCacheRepository._client = new Redis({
        host: config.host,
        port: parseInt(config.port ?? '6379'),
        password: config.password,
        commandTimeout: parseInt(config.timeout ?? '3000'),
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        reconnectOnError: (err) => {
          const targetError = 'READONLY';
          return err.message.includes(targetError);
        },
        maxRetriesPerRequest: parseInt(config.maxRetries ?? '1'),
      });

      console.log('RedisCacheRepository connected');
    } catch (err) {
      RedisCacheRepository.logErrorWhile('connecting', err);
    }
  }

  public static disconnect(): void {
    if (RedisCacheRepository._client) {
      RedisCacheRepository._client.disconnect();
    }
  }

  public async save(key: string, value: T, ttl?: number): Promise<T> {
    try {
      RedisCacheRepository.validateConnection();

      const valueStr = JSON.stringify(value);
      ttl
        ? await RedisCacheRepository._client.set(key, valueStr, 'EX', ttl)
        : await RedisCacheRepository._client.set(key, valueStr);
    } catch (err) {
      RedisCacheRepository.logErrorWhile(
        `saving { ${key}: ${value as unknown as string} }`,
        err,
      );
    }

    return value;
  }

  public async getValuesByPattern(pattern: string): Promise<T[]> {
    try {
      RedisCacheRepository.validateConnection();

      const stream = RedisCacheRepository._client.scanStream({
        match: pattern,
        count: 10,
      });

      const result: T[] = await new Promise((resolve, reject) => {
        const keys: Set<string> = new Set();

        stream.on('data', (data) => {
          data.forEach(keys.add, keys);
        });

        stream.on('error', (err) => {
          reject(err);
        });

        stream.on('end', async () => {
          if (keys.size === 0) {
            resolve([]);
          }
          const values: T[] = await Promise.all<T>(
            [...keys].map(async (key) => {
              const result = await RedisCacheRepository._client.get(key);
              if (result) {
                return JSON.parse(result);
              }
            }),
          );

          resolve(values);
        });
      });

      return result;
    } catch (err) {
      RedisCacheRepository.logErrorWhile(`scanning pattern ${pattern}`, err);
    }
    return [];
  }

  public async remove(key: string): Promise<void> {
    try {
      RedisCacheRepository.validateConnection();

      await RedisCacheRepository._client.del(key);
    } catch (err) {
      RedisCacheRepository.logErrorWhile(`removing key ${key}`, err);
    }
  }

  public async removeByPrefix(prefix: string): Promise<void> {
    try {
      RedisCacheRepository.validateConnection();

      const pipeline = RedisCacheRepository._client.pipeline();

      await RedisCacheRepository._client
        .keys(`${prefix}*`)
        .then((keys) => keys.forEach((key) => pipeline.del(key)));

      await pipeline.exec();
    } catch (err) {
      RedisCacheRepository.logErrorWhile(
        `removing key with prefix ${prefix}`,
        err,
      );
    }
  }

  public async recover(key: string): Promise<T | undefined> {
    try {
      RedisCacheRepository.validateConnection();
      const valueStr = await RedisCacheRepository._client.get(key);
      if (valueStr) return JSON.parse(valueStr);
    } catch (err) {
      RedisCacheRepository.logErrorWhile(`recovering key ${key}`, err);
    }
  }

  public async flushAll(): Promise<void> {
    try {
      RedisCacheRepository.validateConnection();
      await RedisCacheRepository._client.flushall();
    } catch (err) {
      RedisCacheRepository.logErrorWhile('flush all failed', err);
    }
  }

  private static validateConnection(): void {
    if (RedisCacheRepository._client.status !== 'ready') {
      throw new Error('RedisCacheRepository not connected');
    }
  }

  private static logErrorWhile(action: string, err: any): void {
    console.log(`Error while ${action} in RedisCacheRepository`);
    console.log(err);
  }
}
