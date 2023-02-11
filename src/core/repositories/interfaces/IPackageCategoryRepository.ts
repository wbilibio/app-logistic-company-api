import { PackageCategory } from '../../entities';

export type FindManyPackageCategoryQuery = {
  name?: string;
  page?: number;
  per_page?: number;
}

export interface IPackageCategoryRepository {
  create: (data: Partial<PackageCategory>) => Promise<PackageCategory>;
  findOne: (data: Partial<PackageCategory>) => Promise<PackageCategory | undefined>;
  findMany: (data: FindManyPackageCategoryQuery) => Promise<{ list: PackageCategory[], count: number }>;
  update: (data: Partial<PackageCategory>) => Promise<void>;
  delete: (data: PackageCategory) => Promise<void>;
}
