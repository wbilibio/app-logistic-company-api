import { Package } from '../../entities';

export type FindManyPackageQuery = {
  name?: string;
  storage_location_id?: string;
  page?: number;
  per_page?: number;
}

export type FindOnePackageQuery = {
  data?: Partial<Package>;
  storage_location_id?: string;
}

export interface IPackageRepository {
  create: (data: Partial<Package>) => Promise<Package>;
  findOne: (data: FindOnePackageQuery) => Promise<Package | undefined>;
  findMany: (data: FindManyPackageQuery) => Promise<{ list: Package[], count: number }>;
  update: (data: Partial<Package>) => Promise<void>;
  delete: (data: Package) => Promise<void>;
}
