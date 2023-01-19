import { createHash } from 'crypto';

export abstract class ICacheRepository<T = any> {
  public abstract recover(key: string): Promise<T | undefined>;

  public abstract save(key: string, value: T, ttl?: number): Promise<T>;

  public abstract remove(key: string): Promise<void>;

  public abstract removeByPrefix(prefix: string): Promise<void>;

  public abstract flushAll(): Promise<void>;

  public abstract getValuesByPattern(pattern: string): Promise<T[]>;

  public createHashedKey(hashable: any, prefix?: string): string {
    const hash = createHash('md5')
      .update(JSON.stringify(hashable))
      .digest('hex');

    return `${prefix ?? ''}${hash}`;
  }

  public async recoverOrSave(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cachedValue = await this.recover(key);
    if (cachedValue) return cachedValue;

    const value = await fn();
    return await this.save(key, value, ttl);
  }
}
