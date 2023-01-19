import { StorageLocation } from '../../entities';

export type FindManyStorageLocationQuery = {
  ids?: string[];
  name?: string;
  page?: number;
  per_page?: number;
}

export interface IStorageLocationRepository {
  create: (data: Partial<StorageLocation>) => Promise<StorageLocation>;
  findOne: (data: Partial<StorageLocation>) => Promise<StorageLocation | undefined>;
  findMany: (data: FindManyStorageLocationQuery) => Promise<{ list: StorageLocation[], count: number }>;
  update: (data: Partial<StorageLocation>) => Promise<void>;
  delete: (data: StorageLocation) => Promise<void>;
}
